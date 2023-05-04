import mongoose from 'mongoose'
import { consola } from 'consola'

// import RestaurantsDAO from '../dao/restaurantsDAO.js'
// import ReviewsDAO from '../dao/reviewsDAO.js'

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URL, { connectTimeoutMS: 3000 })
    .then(async (client) => {
      // await RestaurantsDAO.injectDB(client)
      // await ReviewsDAO.injectDB(client)
    })
    .catch((error) => {
      consola.error(`Error connecting to MongoDB: ${error}`)
    })
  mongoose.connection.on('connected', () => {
    consola.info('Connected to database successfully')
  })
  mongoose.connection.on('error', (error) => {
    consola.error(`Error connecting to database: ${error}`)
  })
}

export default connectDB
