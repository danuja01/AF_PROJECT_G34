import express from 'express'
import { createReview, getAllReviews, getReview, deleteReview, updateReview } from '../controllers/review'

const reviewsRouter = express.Router()

// review routes
reviewsRouter.post('/', createReview)
reviewsRouter.get('/', getAllReviews)
reviewsRouter.get('/:id', getReview)
reviewsRouter.delete('/:id', deleteReview)
reviewsRouter.patch('/:id', updateReview)

export default reviewsRouter
