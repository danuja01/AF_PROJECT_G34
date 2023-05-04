import mongoose from 'mongoose'
import Tour from './tour.js'

const reviewSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Tour'
  },
  user: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: false
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
  }
})

const Review = mongoose.model('Review', reviewSchema)

export default Review
