import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    building: { type: String, required: true },
    zipcode: { type: String, required: true },
    coord: {
      lat: { type: Number, required: true },
      long: { type: Number, required: true }
    }
  },
  reviews: [
    {
      name: { type: String, required: true },
      date: { type: Date, required: true },
      rating: { type: Number, required: true },
      comments: { type: String, required: true }
    }
  ]
})

export default mongoose.model('Restaurant', restaurantSchema)
