const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    vehicleNumber: {
        type: String,
        required: true
    },

    service: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;