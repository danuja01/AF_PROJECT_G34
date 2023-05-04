import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Layout from '../components/layout'
import { GlobeAltIcon } from '@heroicons/react/20/solid'
import { getTour } from '../services/tours'
import { getAllReviews } from '../services/reviews'
import { createReview } from '../services/reviews'
import Moment from 'moment'
import EditReview from './edit-review'

import axios from 'axios'

//mui
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Rating from '@mui/material/Rating'

const Tour = () => {
  const id = useParams().id
  const starIcons = [];
  const [tourRes, setTourRes] = useState(null)
  const [open, setOpen] = useState(false)
  const [reviews, setReviews] = useState([])
  const [selectedReviewId, setSelectedReviewId] = useState(null)

  // Filter the reviews array based on the tour id
  const filteredReviews = reviews.filter((review) => review.tour && review.tour._id === id)

  const totalRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0)
  const averageRating = totalRating / filteredReviews.length
  const numRatings = filteredReviews.length;

  for (let i = 1; i <= 5; i++) {
    if (i <= averageRating) {
      starIcons.push(<svg key={i} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-primary" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>);
    } else {
      starIcons.push(<svg key={i} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-primary" viewBox="0 0 24 24"><path stroke="none" d="M0 0h24v24H0z" /><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>);
    }
  }

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
    tour: id,
    user_id: 'admin',
    user: 'admin',
    text: '',
    rating: 1,
  })

  const handleSubmit = (event) => {
    event.preventDefault()

    // Send a POST request to the server to add the new review
    axios.post(`http://localhost:4000/api/reviews`, reviewData)
    refresh()
      .catch((error) => {
        console.log(error)
      })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const refresh = debounce(() => {
    getTour(id).then(({ data }) => setTourRes(data))
    getAllReviews().then(({ data }) => setReviews(data))
  }, 300)

  useEffect(() => {
    refresh()
  }, [])

  return (
    <Layout>
      {tourRes && (
        <div className="container max-w-7xl py-10 mx-20">
          <h2 className="text-sm title-font text-gray-500 tracking-widest">TOUR NAME</h2>
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
            {tourRes.tourName} | <span className="bg-primary opacity-80 text-white text-[1.8rem] px-2 py-1 rounded">{tourRes.duration} DAYS</span>
          </h1>
          <div className="w-full h-auto mt-10 flex flex-wrap">
            <img alt="ecommerce" className="lg:w-[45%] shadow-md rounded-lg  w-full object-cover object-center  border border-gray-200" src={tourRes.imagePath} />
            <div className="lg:w-1/2 w-full  pl-10 lg:pb-6 lg:pt-5  mt-6 lg:mt-0">
              <p className="leading-relaxed">{tourRes.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex mb-4">
                  <span className="flex items-center">
                    {starIcons}
                    <span className="text-gray-600 ml-3">{numRatings} Reviews</span>
                  </span>
                  <div className="flex items-center ml-3 pl-3 py-2 border-l-2 border-gray-200  ">
                    <GlobeAltIcon className="h-5 w-5 text-primary" />
                    <a href="https://www.google.com/search?q=sigiriya" className="ml-1 text-primary">
                      Explore More!
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex">
                <button onClick={handleClickOpen} className="flex  text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded">
                  Book Your Adventure Now!
                </button>
              </div>
            </div>
          </div>{' '}
          <br />
          {/* render reviews */}
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
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Get a Quotation </DialogTitle>
        <DialogContent>
          <DialogContentText>Submit to receive a custom quotation for your tour, including accommodations, transportation, and a full guide. Please note that prices may vary depending on current conditions in your selected destination.</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Name" type="name" fullWidth variant="standard" />
          <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" fullWidth variant="standard" />
          <TextField autoFocus margin="dense" id="budget" label="Prefferd Budget" type="number" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <button className="capitalize text-red-600 mb-2 mr-4" onClick={handleClose}>
            CANCEL
          </button>
          <button className="capitalize px-4 mr-4 rounded-md mb-2 py-2 text-white  bg-primary " onClick={handleClose}>
            SUBMIT
          </button>
        </DialogActions>
      </Dialog>
    </Layout>
  )
}

export default Tour
