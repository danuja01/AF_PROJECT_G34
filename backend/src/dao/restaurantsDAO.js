// import mongoose from 'mongoose'
// let restaurants

// const restaurantSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   address: {
//     street: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     zipcode: { type: String, required: true }
//   },
//   cuisine: { type: String, required: true },
//   reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
// });

// const Restaurant = mongoose.model('Destination', restaurantSchema);

// export default class RestaurantsDAO {
//   static async injectDB(conn) {
//     if (Restaurant.db) {
//       return;
//     }

//     try {
//       await conn.connect();
//     } catch (e) {
//       console.error(`Unable to connect to database in restaurantsDAO: ${e}`);
//     }
//   }

//   static async getRestaurants({ filters = null, page = 0, restaurantsPerPage = 20 } = {}) {
//     let query
//     if (filters) {
//       if ('name' in filters) {
//         query = { $text: { $search: filters['name'] } }
//       } else if ('cuisine' in filters) {
//         query = { cuisine: { $eq: filters['cuisine'] } }
//       } else if ('zipcode' in filters) {
//         query = { 'address.zipcode': { $eq: filters['zipcode'] } }
//       }
//     }

//     let cursor

//     try {
//       cursor = await restaurants.find(query)
//     } catch (e) {
//       console.error(`Unable to issue find command, ${e}`)
//       return { restaurantsList: [], totalNumRestaurants: 0 }
//     }

//     const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

//     try {
//       const restaurantsList = await displayCursor.toArray()
//       const totalNumRestaurants = await restaurants.countDocuments(query)

//       return { restaurantsList, totalNumRestaurants }
//     } catch (e) {
//       console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
//       return { restaurantsList: [], totalNumRestaurants: 0 }
//     }
//   }

//   static async getRestaurantByID(id) {
//     try {
//       const pipeline = [
//         {
//           $match: {
//             _id: new mongoose.Types.ObjectId(id)
//           }
//         },
//         {
//           $lookup: {
//             from: 'reviews',
//             let: {
//               id: '$_id'
//             },
//             pipeline: [
//               {
//                 $match: {
//                   $expr: {
//                     $eq: ['$restaurant_id', '$$id']
//                   }
//                 }
//               },
//               {
//                 $sort: {
//                   date: -1
//                 }
//               }
//             ],
//             as: 'reviews'
//           }
//         },
//         {
//           $addFields: {
//             reviews: '$reviews'
//           }
//         }
//       ]
//       return await restaurants.aggregate(pipeline).next()
//     } catch (e) {
//       console.error(`Something went wrong in getRestaurantByID: ${e}`)
//       throw e
//     }
//   }

//   static async getCuisines() {
//     let cuisines = []
//     try {
//       cuisines = await restaurants.distinct('cuisine')
//       return cuisines
//     } catch (e) {
//       console.error(`Unable to get cuisines, ${e}`)
//       return cuisines
//     }
//   }
// }

import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true }
  },
  cuisine: { type: String, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
})

const Restaurant = mongoose.model('Destination', restaurantSchema)

export default class RestaurantsDAO {
  static async injectDB(conn) {
    if (Restaurant.db) {
      return
    }

    try {
      await conn.connect()
    } catch (e) {
      console.error(`Unable to connect to database in restaurantsDAO: ${e}`)
    }
  }

  static async getRestaurants({ filters = null, page = 0, restaurantsPerPage = 20 } = {}) {
    let query = {}
    if (filters) {
      if ('name' in filters) {
        query = { $text: { $search: filters['name'] } }
      } else if ('cuisine' in filters) {
        query = { cuisine: { $eq: filters['cuisine'] } }
      } else if ('zipcode' in filters) {
        query = { 'address.zipcode': { $eq: filters['zipcode'] } }
      }
    }
  
    try {
      const restaurantsList = await Restaurant
        .find(query)
        .limit(restaurantsPerPage)
        .skip(restaurantsPerPage * page)
        .lean()
        .exec()
  
      const totalNumRestaurants = await Restaurant.countDocuments(query)
  
      return { restaurantsList, totalNumRestaurants }
    } catch (e) {
      console.error(`Unable to get restaurants, ${e}`)
      return { restaurantsList: [], totalNumRestaurants: 0 }
    }
  }
  

  static async getRestaurantByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id)
          }
        },
        {
          $lookup: {
            from: 'reviews',
            let: {
              id: '$_id'
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$restaurant_id', '$$id']
                  }
                }
              },
              {
                $sort: {
                  date: -1
                }
              }
            ],
            as: 'reviews'
          }
        },
        {
          $addFields: {
            reviews: '$reviews'
          }
        }
      ]

      return await Restaurant.aggregate(pipeline).exec()
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }

  static async getCuisines() {
    let cuisines = []

    try {
      cuisines = await Restaurant.distinct('cuisine')

      return cuisines
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`)
      return cuisines
    }
  }
}
