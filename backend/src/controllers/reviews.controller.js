import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController {

  // POST a review
  static async apiPostReview(req, res, next) {
    try {
      const itemId = req.body.item_id
      const review = req.body.text
      const rating = req.body.rating
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id
      }
      const date = new Date()

      const ReviewResponse = await ReviewsDAO.addReview(itemId, userInfo, review, date, rating)
      res.json({ status: 'success' })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  // PUT a review
  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id
      const text = req.body.text
      const date = new Date()
      const rating = req.body.rating

      const reviewResponse = await ReviewsDAO.updateReview(reviewId, req.body.user_id, text, date, rating)

      var { error } = reviewResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error('unable to update review - user may not be original poster')
      }

      res.json({ status: 'success' })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  // DELETE a review
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id
      const userId = req.body.user_id
      console.log(reviewId)
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId)
      res.json({ status: 'success' })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}
