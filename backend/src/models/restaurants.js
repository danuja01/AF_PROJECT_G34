import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurant_id: { type: String, required: true },
  category: { type: String, required: true },
  ticket_price: { type: String, required: true },
  img: { type: String, required: true },
  cuisine: { type: String, required: true }
})

export default mongoose.model('Destination', restaurantSchema)
