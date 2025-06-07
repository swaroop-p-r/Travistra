const express = require('express')
const { registerUser, loginAdminUser, userViewProfile, userProfilebyid, userEditProfile } = require('../controller/userControl')
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/verifyToken');
const userRoutes = express.Router()

userRoutes.post('/register', upload.fields([
    { name: 'profile_image', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]),
    registerUser);

userRoutes.post('/login', loginAdminUser);
userRoutes.get('/userprofile',verifyToken,userViewProfile)
userRoutes.get('/userprofilebyid',userProfilebyid)
userRoutes.put('/usereditprofile',upload.fields([
    {name:'profile_image',maxCount:1},
    { name: 'image', maxCount: 1 }
]),userEditProfile)

module.exports = userRoutes;

