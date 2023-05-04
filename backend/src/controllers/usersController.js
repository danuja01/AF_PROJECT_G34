const User = require('../models/User')
const Notification = require('../models/Notification')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//  GET all users
//  GET /users
//  Private

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users?.length) {
        return res.status(400).json({message: 'No Users Found'})
    }
    res.json(users)
})

//  Create new user
//  POST /users
//  Private

const createNewUser = asyncHandler(async (req, res) => {
    const { username, first_name, last_name, mobile, password, dob, gender, roles } = req.body;

    // Confirm data
    if(!username || !first_name || !last_name || !mobile || !dob || !gender || !password || !roles) {
        return res.status(400).json({message: 'Complete all fields'})
    }

    //Check for duplicate
    const duplicate = await User.findOne({username}).lean().exec()

    if(duplicate) {
        return res.status(409).json({message: "User ID already available"})
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10) //salt rounds -> to hide the paswsword

    const userObject = {username, first_name, last_name, mobile, dob, gender, "password": hashedPassword, roles}

    // 
    const user = await User.create(userObject)

    if(user) {
        res.status(201).json({message: `New User ${username} created`})
    } else {
        res.status(409).json({message: 'Invalid Data'})
    }
})

//  Update a user
//  PATCH /users
//  Private

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, first_name, last_name, mobile, password, dob, gender, roles, active } = req.body;
    //change to _id for backend
    // Confirm Data
    if(!id || !username || !first_name || !last_name || !mobile || !dob || !gender || !roles || typeof active !== 'boolean') {
        return res.status(400).json({message: 'Complete all fields'})
    }
    const user = await User.find({_id: id}).exec()

    if(!user) {
        return res.status(400).json({message: 'User not found'})
    }

     //Check for duplicate
     const duplicate = await User.findOne({username}).lean().exec()
    //allow updates to the original user
     if(duplicate && duplicate?.id.toString() !== id) {
         return res.status(409).json({message: "User ID already available"})
     }

     user.username = username
     user.first_name = first_name
     user.last_name = last_name
     user.mobile = mobile
     user.dob = dob
     user.gender = gender
     user.roles = roles
     user.active = active

     if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })

})


//  Delete a user
//  DELETE /users
//  Private

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body //change to _id for backend

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // CONFIRM USER
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()
    const reply = `User ID ${result.username} with ID ${result.id} deleted`
    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}
