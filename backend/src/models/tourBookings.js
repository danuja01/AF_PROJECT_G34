import mongoose from 'mongoose'

const tourBookingSchema = new mongoose.Schema({
  tourId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Tour'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  }
})

const Booking = mongoose.model('Booking', tourBookingSchema)

export default Booking
