import { toSuccess } from '../utils'
import User from '../models/User'

// Create a new review
export const createUser = async (req, res) => {
  const { user_name, user_id } = req.body
  try {
    const user = await User.create({
      user_name,
      user_id
    })
    return toSuccess({ res, status: 201, data: user, message: 'User created successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})
module.exports = mongoose.model('User', userSchemea)