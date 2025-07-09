const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  package_name: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  seats: {
    type: Number,
    required: true,
    min: 0
  },
  total_seats: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  itinerary: {
    type: [String],
    required: true
  },
  images: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const Package = mongoose.model('package_tbl', packageSchema);

module.exports = Package
