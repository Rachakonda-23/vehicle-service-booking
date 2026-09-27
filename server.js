const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Vehicle = require("./models/Vehicle");
const Booking = require("./models/Booking");

const app = express();

const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect("mongodb://host.docker.internal:27017/vehicleServiceDB")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

    // Register a new user
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();

        res.json({
            message: "Registration successful"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Registration failed"
        });
    }
});

// Login user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email,
            password: password
        });

        if (user) {
            res.json({
                message: "Login successful"
            });
        } else {
            res.status(401).json({
                message: "Invalid email or password"
            });
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Login failed"
        });
    }
});

// Add a vehicle
app.post("/vehicles", async (req, res) => {
    try {
        const { vehicleNumber, vehicleModel, vehicleType, email } = req.body;

        const newVehicle = new Vehicle({
            vehicleNumber,
            vehicleModel,
            vehicleType,
            email
        });

        await newVehicle.save();

        res.json({
            message: "Vehicle added successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to add vehicle"
        });
    }
});

// Create a service booking
app.post("/bookings", async (req, res) => {
    try {
        const { customerName, email, vehicleNumber, service, date, time } = req.body;
        const newBooking = new Booking({
    customerName,
    email,
    vehicleNumber,
    service,
    date,
    time
});

        await newBooking.save();

        res.json({
            message: "Service booked successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to book service"
        });
    }
});

// Get all bookings for admin
app.get("/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find();

        res.json(bookings);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch bookings"
        });
    }
});

// Update booking status
app.put("/bookings/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.json({
            message: "Booking status updated successfully",
            booking: booking
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to update booking status"
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});