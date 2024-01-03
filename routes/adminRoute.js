const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')

router.route('/').get(adminController.renderAdminPage)
router
.route('/login').post(authController.handleLogin)
router
.route('/logout').post(authController.handleLogout)




module.exports = router