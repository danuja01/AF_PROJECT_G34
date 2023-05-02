import mongoose from 'mongoose'
import itemSchema from '../models/items.js'

const Item =  itemSchema

export default class ItemsDAO {
  static async injectDB(conn) {
    if (Item.db) {
      return
    }

    try {
      await conn.connect()
    } catch (e) {
      console.error(`Unable to connect to database in itemsDAO: ${e}`)
    }
  }

  // GET all items
  static async getItems({ filters = null, page = 0, itemsPerPage = 20 } = {}) {
    let query = {}
    if (filters) {
      if ('name' in filters) {
        query = { $text: { $search: filters['name'] } }
      } else if ('cuisine' in filters) {
        query = { cuisine: { $eq: filters['cuisine'] } }
      } else if ('category' in filters) {
        query = { category: { $eq: filters['category'] } }
      }
    }

    try {
      const itemsList = await Item.find(query)
        .limit(itemsPerPage)
        .skip(itemsPerPage * page)
        .lean()
        .exec()

      const totalNumItems = await Item.countDocuments(query)

      return { itemsList, totalNumItems }
    } catch (e) {
      console.error(`Unable to get items, ${e}`)
      return { itemsList: [], totalNumItems: 0 }
    }
  }

  // GET a item by id
  static async getItemByID(id) {
    try {
      const pipeline = [  // aggregate pipeline to get an item by id and its reviews
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
                    $eq: ['$item_id', '$$id']
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
      const result = await Item.aggregate(pipeline).exec()
      return result.length ? result[0] : null;  // return the first element of the array
    } catch (e) {
      console.error(`Something went wrong in getItemByID: ${e}`)
      throw e
    }
  }

  // GET a item's cuisines
  static async getCuisines() {
    let cuisines = []

    try {
      cuisines = await Item.distinct('cuisine')

      return cuisines
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`)
      return cuisines
    }
  }

  // GET a item's categories
  static async getCategories() {
    let categories = []

    try {
      categories = await Item.distinct('category')

      return categories
    } catch (e) {
      console.error(`Unable to get categories, ${e}`)
      return categories
    }
  }
}
