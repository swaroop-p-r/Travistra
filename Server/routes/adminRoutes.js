const express = require('express')
const { adminViewUser, adminDeleteUser, adminToggleUserStatus, adminAddPackage, adminViewPackage, adminTogglePackageStatus, adminDeletePackage, adminViewPackageById, adminUpdatePackage } = require('../controller/adminControl')
const adminRoutes = express.Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({storage})

adminRoutes.get("/viewusers",adminViewUser)
adminRoutes.delete("/deleteuser",adminDeleteUser)
adminRoutes.patch("/userstatus",adminToggleUserStatus)
adminRoutes.post("/adminpackage",upload.array('images'),adminAddPackage)
adminRoutes.get('/adminviewpackage',adminViewPackage)
adminRoutes.patch('/packagestatus',adminTogglePackageStatus)
adminRoutes.delete('/deletepackage',adminDeletePackage)
adminRoutes.get('/adminviewpackagebyid/:id',adminViewPackageById)
adminRoutes.patch('/updatepackage', upload.array('images'), adminUpdatePackage);


module.exports = adminRoutes