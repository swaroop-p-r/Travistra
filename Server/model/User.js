const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{type:String, require: true},
    address:{type:String, require: true}, 
    email:{type:String, require: true, unique: true},
    password:{type:String, require: true},
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status:{
        type: Boolean,
        default: true
    }
},{timestamps:true})

const User = mongoose.model("user_tbl", userSchema)

module.exports = User
