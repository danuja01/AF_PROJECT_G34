import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { getAllReviews } from '../services/reviews'
import { createReview } from '../services/reviews'
import Moment from 'moment'
import EditReview from './edit-review'
import { NIL } from 'uuid'

import axios from 'axios'

//mui
import TextField from '@mui/material/TextField'
import Rating from '@mui/material/Rating'

const Reviews = ({ id, onReviewsData, source  }) => {
  const [reviews, setReviews] = useState([])
  const [selectedReviewId, setSelectedReviewId] = useState(null)

  // Set the appropriate id based on the source prop
  const itemId = source === "item" ? id : null;
  const tourId = source === "tour" ? id : null;

  // Filter the reviews array based on the item id or tour id
  const filteredReviews = reviews.filter((review) => (review.item && review.item._id === id) || (review.tour && review.tour._id === id))

  const totalRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0)
  const averageRating = totalRating / filteredReviews.length
  const numRatings = filteredReviews.length

  const deleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/reviews/${id}`)
      refresh()
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditReview = (reviewId) => {
    setSelectedReviewId(reviewId)
  }

  const handleCloseEditReview = () => {
    setSelectedReviewId(null)
  }

  const [reviewData, setReviewData] = useState({
    item: itemId,
    tour: tourId,
    user_id: 'admin',
    user: 'admin',
    text: '',
    rating: NIL,
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    // Send a POST request to the server to add the new review
    axios.post(`http://localhost:4000/api/reviews`, reviewData)
    refresh().catch((error) => {
      console.log(error)
    })
  }

  const refresh = debounce(() => {
    getAllReviews().then(({ data }) => setReviews(data))
  }, 300)

  useEffect(() => {
    onReviewsData(numRatings, averageRating)
    refresh()
  }, [numRatings, averageRating])

  return (
    <div>
      <br />
      <div>
        <h4 className="text-2xl font-bold my-4">Reviews</h4>
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Add a Review</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block font-medium">Review Text:</label>
              <TextField multiline rows={4} variant="outlined" className="w-full mt-2" value={reviewData.text} onChange={(event) => setReviewData({ ...reviewData, text: event.target.value })} />
            </div>
            <div className="mb-4">
              <label className="block font-medium">Rating:</label>
              <TextField type="number" inputProps={{ min: '1', max: '5' }} variant="outlined" className="w-full mt-2" value={reviewData.rating} onChange={(event) => setReviewData({ ...reviewData, rating: event.target.value })} />
            </div>
            <button type="submit" className="flex  text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded">
              Submit Review
            </button>
          </form>
        </div>

        <br />
        {selectedReviewId !== null && <EditReview reviewId={selectedReviewId} onClose={handleCloseEditReview} refresh={refresh} />}
        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          filteredReviews
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((review) => (
              <div className="bg-white rounded-lg shadow-md mb-5" key={review._id}>
                <div className="p-4">
                  <p className="text-lg font-medium leading-tight mb-2 break-words">{review.text}</p>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    <span className="font-bold">User:</span> {review.user}
                    <br />
                    <span className="font-bold">Date:</span> {Moment(review.date).format('LLLL')}
                  </p>
                  <div className="flex items-center">
                    <Rating name="read-only" value={review.rating} size="small" readOnly />
                  </div>
                </div>
                {/* {props.user && props.user.id === review.user_id && ( */}
                <div className="bg-gray-100 px-4 py-2 flex justify-between">
                  <button onClick={() => handleEditReview(review._id)}>Edit</button>
                  <button className="text-red-500 font-medium hover:text-red-800" onClick={() => deleteReview(review._id)}>
                    Delete Review
                  </button>
                </div>
                {/* )} */}
              </div>
            ))
        )}
      </div>
    </div>
  )
}

export default Reviews
