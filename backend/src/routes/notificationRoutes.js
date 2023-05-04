const express = require('express')
const router = express.Router()
const notificationsController = require('../controllers/notificationsController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(notificationsController.getAllNotifications)
    .post(notificationsController.createNewNotification)
    .patch(notificationsController.updateNotification)
    .delete(notificationsController.deleteNotificaiton)

module.exports = router