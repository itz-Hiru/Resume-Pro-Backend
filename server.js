require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.config");
const authenticationRoutes = require("./routes/auth.routes");

const app = express();

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authenticationRoutes);  // Authentication Routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
