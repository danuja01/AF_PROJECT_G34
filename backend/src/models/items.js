import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  item_id: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String, required: true },
  cuisine: { type: String, required: true }
})

export default mongoose.model('Item', itemSchema)
