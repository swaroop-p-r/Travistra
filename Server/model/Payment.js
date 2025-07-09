const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'booking_tbl',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_tbl',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    method: {
        type: String,
        enum: ['UPI', 'CARD', 'NETBANKING'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Completed', // You can update it based on actual gateway integration
    },
    paymentDetails: {
        upiId: { type: String },
        cardNumber: { type: String }, // Masked (e.g., **** **** **** 1234)
        expiry: { type: String },
        bankName: { type: String },
    },
    paidAt: {
        type: Date,
        default: Date.now,
    }
});

const Payment = mongoose.model('payment_tbl', paymentSchema);

module.exports= Payment;
