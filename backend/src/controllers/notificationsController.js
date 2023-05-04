const User = require('../models/User')
const Notification = require('../models/Notification')
const asyncHandler = require('express-async-handler')

//  GET all notifications
//  GET /notifications
//  Private

const getAllNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find().lean()
    if(!notifications?.length) {
        return res.status(400).json({message: 'No Notifications Found'})
    }

    const notificationsWithUser = await Promise.all(notifications.map(async (notification) => {
        const user = await User.findById(notification.user).lean().exec()
        return { ...notification, username: user.username }
    }))
    res.json(notificationsWithUser)
})

//  Create new notification
//  POST /notifications
//  Private

const createNewNotification = asyncHandler(async (req, res) => {
    const { user, title, description } = req.body;

    // Confirm data
    if(!user || !title || !description ) {
        return res.status(400).json({message: 'Complete all fields'})
    }

    //Check for duplicate
    const duplicate = await Notification.findOne({title}).lean().exec()

    if(duplicate) {
        return res.status(409).json({message: "Notification Title already available"})
    }

    // 
    const notification = await Notification.create({
        user: user, 
        title: title,
        description: description
    })

    if(notification) {
        res.status(201).json({message: `New notification created`})
    } else {
        res.status(409).json({message: 'Invalid Data'})
    }
})

//  Update a notification
//  PATCH /notifications
//  Private

const updateNotification = asyncHandler(async (req, res) => {
    const { _id, user, title, description, isRead } = req.body;

    // Confirm Data
    if(!_id || !user || !title || !description || typeof isRead !== 'boolean') {
        return res.status(400).json({message: 'Complete all fields'})
    }
    const notification = await Notification.findById(_id).exec()

    if(!notification) {
        return res.status(400).json({message: 'Notification not found'})
    }

     //Check for duplicate
     const duplicate = await Notification.findOne({title}).lean().exec()
    //allow updates to the original notification
     if(duplicate && duplicate?._id.toString() !== _id) {
         return res.status(409).json({message: "Notification Title already available"})
     }

     notification.user = user
     notification.title = title
     notification.description = description
     notification.isRead = isRead

    const updatedNotification = await notification.save()

    res.json({ message: `${updatedNotification.title} updated` })

})


//  Delete a notitfication
//  DELETE /notifications
//  Private

const deleteNotificaiton = asyncHandler(async (req, res) => {
    const { _id } = req.body

    // Confirm data
    if (!_id) {
        return res.status(400).json({ message: 'Notification ID Required' })
    }

    // CONFIRM USER
    const notification = await Notification.findById(_id).exec()
    if (!notification) {
        return res.status(400).json({ message: 'Notification not found' })
    }

    const result = await notification.deleteOne()
    const reply = `Notitfication  ${result.title} with ID ${result._id} deleted`
    res.json(reply)
})

module.exports = {
    getAllNotifications,
    createNewNotification,
    updateNotification,
    deleteNotificaiton
}
