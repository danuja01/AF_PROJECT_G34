import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

export default mongoose.model('Review', reviewSchema)
