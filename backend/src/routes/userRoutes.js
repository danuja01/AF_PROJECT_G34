const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/').get(usersController.getAllUsers).post(usersController.createNewUser).patch(usersController.updateUser).delete(usersController.deleteUser)

router.route('/:id').get(usersController.getSingleUser)

router.route('/search/username/:keyword').get(usersController.getSingleUserByUserName)

router.route('/search/firstname/:keyword').get(usersController.getSingleUserByFirstName)

module.exports = router
