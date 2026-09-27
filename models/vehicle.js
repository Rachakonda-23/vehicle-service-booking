const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true
    },

    vehicleModel: {
        type: String,
        required: true
    },

    vehicleType: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;