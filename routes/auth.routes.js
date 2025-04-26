const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

// Authentication Routes
router.post("/register", registerUser);                 // Signup user
router.post("/login", loginUser);                       // Login user
router.get("/user/profile", protect, getUserProfile);   // Get user

// Upload profile image
router.post("/upload/profile/image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Oops! No image was uploaded. Please try again." });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({
        imageUrl,
        message: "Image uploaded successfully! 🎉"
    });
});

module.exports = router;
