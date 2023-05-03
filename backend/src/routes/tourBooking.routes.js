import express from 'express'
import { createBooking, getAllBookings, getBookingById, updateBookingStatus, deleteBooking } from '../controllers/tourBooking'

const router = express.Router()

router.post('/', createBooking)
router.get('/', getAllBookings)
router.get('/:id', getBookingById)
router.put('/:id', updateBookingStatus)
router.delete('/:id', deleteBooking)

export default router
