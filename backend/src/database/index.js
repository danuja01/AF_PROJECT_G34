import mongoose from 'mongoose'
import { consola } from 'consola'

// import ItemsDAO from '../dao/itemsDAO.js'
// import ReviewsDAO from '../dao/reviewsDAO.js'

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, { connectTimeoutMS: 3000 })
    .then(async (client) => {
      // await ItemsDAO.injectDB(client)
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
