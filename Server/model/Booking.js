const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user_tbl', 
        required: true
    },
    package: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'package_tbl', 
        required: true 
    },
    vehicle:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'vehicle_tbl',
    },
    status: { 
        type: String, 
        enum: ['Processing', 'Confirmed', 'Cancelled'], 
        default: 'Processing' 
    },
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Paid'], 
        default: 'Pending' 
    },
    bookingDate: {
        type: Date,
        required: true
    },
    bookingTime: {
        type: String,
        required: true
    },
    bookedAt: { 
        type: Date, 
        default: Date.now
    }
});

const Booking = mongoose.model('booking_tbl', bookingSchema);

module.exports = Booking;