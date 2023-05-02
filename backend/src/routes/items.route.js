import express from 'express'
import ItemsCtrl from '../controllers/Items.controller'
import ReviewsCtrl from '../controllers/reviews.controller'

const router = express.Router()

router.route('/').get(ItemsCtrl.apiGetItems)
router.route('/id/:id').get(ItemsCtrl.apiGetItemById)
router.route('/cuisines').get(ItemsCtrl.apiGetItemCuisines)
router.route('/categories').get(ItemsCtrl.apiGetItemCategories)

router.route('/review').post(ReviewsCtrl.apiPostReview).put(ReviewsCtrl.apiUpdateReview).delete(ReviewsCtrl.apiDeleteReview)

export default router
