const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')

require('dotenv').config()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/uploads',express.static('uploads'))


const dbConnect = async()=>{
    try {
        // await mongoose.connect(process.env.dbConnect)
        await mongoose.connect(process.env.dbConnect)
        console.log("DB connected Successfully")
    } catch (err) {
        console.log("Occured Error :",err)
    }
}
dbConnect()

app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)

app.listen(4000,()=>{
    console.log("Server:4000 Started Successfully")
})