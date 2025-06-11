const express = require('express')
const { registerUser, loginAdminUser, userViewProfile, userProfilebyid, userEditProfile, userViewPackages, userSelectPackage, userBookPackage, userViewBookings, userViewAssignedVehicle, userConfirmPackage, userBookingForPayment, userPayment, userViewPayment, userCancelBooking } = require('../controller/userControl')
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
userRoutes.get('/userviewpackages',verifyToken,userViewPackages)
userRoutes.get('/userselectpackage',userSelectPackage);
userRoutes.post('/userbookpackage',verifyToken,userBookPackage)
userRoutes.get('/userbookings',verifyToken,userViewBookings)
// userRoutes.get('/userviewassignedvehicle',userViewAssignedVehicle)
userRoutes.patch('/userconfirmpackage',verifyToken,userConfirmPackage)
userRoutes.get('/userviewbookingforpayment',userBookingForPayment)
userRoutes.post('/userpayment',userPayment)
userRoutes.get('/userviewpayment',userViewPayment)
userRoutes.patch('/usercancelbooking',userCancelBooking)

module.exports = userRoutes;

