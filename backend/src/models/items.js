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
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
})

const Item = mongoose.model('Item', itemSchema)

export default Item
