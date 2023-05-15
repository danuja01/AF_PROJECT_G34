import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  item: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'Item'
  },
  user_details: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'User'
  },
  tour: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'Tour'
  },
  user: {
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: false
  },
  text: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: false,
    min: 1,
    max: 5
  }
})

const Review = mongoose.model('Review', reviewSchema)

export default Review
