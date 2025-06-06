const express = require('express')
const { registerUser, loginAdminUser } = require('../controller/userControl')
const upload = require('../middleware/upload')
const userRoutes = express.Router()

userRoutes.post('/register', upload.fields([
    { name: 'profile_image', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]),
    registerUser);

userRoutes.post('/login', loginAdminUser);


module.exports = userRoutes;

