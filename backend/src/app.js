require('dotenv').config()
import express from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import { consola } from 'consola'
import { limiter, responseInterceptor, errorHandler } from './middleware'

import toursRouter from './routes/tours.routes'
import tourBookings from './routes/tourBooking.routes'
import postRoutes from './routes/posts.js'
import connectDB from './database'
import path from 'path'


const port = process.env.PORT || 2000


// Set up express app
const app = express();

// Middleware
app.use(cors());
//app.use(bodyParser.json());

app.use(limiter)

app.use(helmet())

app.use(compression())

app.use(cors({ origin: true, credentials: true }))

app.use(express.json({ limit: '1mb' }))

app.use(express.urlencoded({ extended: true }))


connectDB()

//routes


app.use(responseInterceptor)

app.use(errorHandler)
// Set up API routes

app.get('/', (req, res) => res.status(200).json({ message: 'Server Up and Running' }))

app.use('/tour/image', express.static(path.join(__dirname, '..', 'upload', 'images')))

app.use('/api/tours', toursRouter)

app.use('/api/bookings', tourBookings)

app.use('/api/posts', postRoutes);



app.listen(port, () => console.log(`Listening on port ${port}...`));