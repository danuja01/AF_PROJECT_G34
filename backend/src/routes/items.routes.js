import express from "express"
import ItemsCtrl from "../controllers/Items.controller.js"
import ReviewsCtrl from "../controllers/reviews.controller.js"

const router = express.Router()

router.route("/").get(ItemsCtrl.apiGetItems)
router.route("/id/:id").get(ItemsCtrl.apiGetItemById)
router.route("/cuisines").get(ItemsCtrl.apiGetItemCuisines)

router
  .route("/review")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

export default router