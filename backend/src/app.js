require('dotenv').config()
import express from 'express'
import compression from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import { consola } from 'consola'
import { limiter, responseInterceptor, errorHandler } from './middleware'
import restaurants from './routes/restaurants.route'
import connectDB from './database'

const app = express()

app.use(limiter)

app.use(helmet())

app.use(compression())

app.use(cors({ origin: true, credentials: true }))

app.use(express.json({ limit: '1mb' }))

app.use(express.urlencoded({ extended: true }))

connectDB()

//routes
app.get('/', (req, res) => res.status(200).json({ message: 'Server Up and Running' }))
app.use('/api/v1/destinations', restaurants)

app.use(responseInterceptor)

app.use(errorHandler)

const port = process.env.PORT || 3000

app.listen(port, () => {
  consola.info(`server successfully started on port ${port}`)
})
