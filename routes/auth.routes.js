const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);                 // Signup user
router.post("/login", loginUser);                       // Login user
router.get("/user/profile", protect, getUserProfile);   // Get user

module.exports = router;
