import mongoose from 'mongoose'
import reviewSchema from '../models/review.js'

const Review = reviewSchema

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (Review.db) {
      return
    }

    try {
      await conn.connect()
    } catch (e) {
      console.error(`Unable to connect to database in restaurantsDAO: ${e}`)
    }
  }

  static async addReview(restaurantId, user, review, date, rating) {
    try {
      const reviewDoc = new Review({
        name: user.name,
        user_id: user._id,
        date: date,
        text: review,
        rating: rating,
        restaurant_id: new mongoose.Types.ObjectId(restaurantId)
      })

      return await reviewDoc.save()
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewId, userId, text, date, rating) {
    try {
      const updateResponse = await Review.updateOne({ user_id: userId, _id: new mongoose.Types.ObjectId(reviewId) }, { $set: { text: text, date: date, rating: rating } })

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await Review.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(reviewId),
        user_id: userId
      })

      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }
}
