const express = require('express')
const { registerUser, loginAdminUser } = require('../controller/userControl')
const userRoutes = express.Router()

userRoutes.post('/register',registerUser)
userRoutes.post('/login',loginAdminUser)

module.exports = userRoutes;

