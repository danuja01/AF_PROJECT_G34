require('dotenv').config()
import express from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import { consola } from 'consola'
import { limiter, responseInterceptor, errorHandler } from './middleware'
import toursRouter from './routes/tours.routes'
import reviewsRouter from './routes/reviews.routes'
import usersRouter from './routes/users.routes'
import itemsRouter from './routes/items.routes'
import tourBookings from './routes/tourBooking.routes'

import connectDB from './database'
import path from 'path'

const app = express()

app.use(limiter)

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))

app.use(compression())

app.use(cors({ origin: true, credentials: true }))

app.use(express.json({ limit: '100mb' }))

app.use(express.urlencoded({ extended: true }))

connectDB()

global.__basedir = __dirname

//routes
app.get('/', (req, res) => res.status(200).json({ message: 'Server Up and Running' }))

app.use('/api/items', itemsRouter)

app.use('/api/users', usersRouter)

app.use('/api/reviews', reviewsRouter)

app.use('/tour/image', express.static(path.join(__dirname, '..', 'upload', 'images')))

app.use('/api/tours', toursRouter)

app.use('/api/bookings', tourBookings)

app.use(responseInterceptor)

app.use(errorHandler)

const port = process.env.PORT || 2000

app.listen(port, () => {
  consola.info(`server successfully started on port ${port}`)
})

export default app
