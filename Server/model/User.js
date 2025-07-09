const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
    },
    dob: {
        type: Date,
        required: true
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true
    },
    profile_image: { type: String, default: null },
    image: { type: String, required: true },

}, { timestamps: true })

const User = mongoose.model("user_tbl", userSchema)

module.exports = User
