import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['restaurant', 'product'],
    required: true
  },
  location: {
    type: String,
    required: false
  },
  price: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: false
  },
  img: {
    type: String,
    required: true
  }
})

const Item = mongoose.model('Item', itemSchema)

export default Item
