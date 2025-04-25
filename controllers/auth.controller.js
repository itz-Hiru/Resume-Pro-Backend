const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// http://localhost:3000/api/auth/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;
        const existingUser = await User.findOne({ email });

        // Check if user already exists
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists. Please try logging in." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        // Return response
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
            message: "Registration successful! Welcome aboard 🎉",
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while registering. Please try again later." });
    }
};

// http://localhost:3000/api/auth/login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user with entered email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "No account found with this email. Please check and try again." });
        }

        // Check if password is matched
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password. Please try again." });
        }

        // Return response
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
            message: "Login successful! Welcome back 👋",
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while logging in. Please try again later." });
    }
};

// http://localhost:3000/api/auth/user/profile
const getUserProfile = async (req, res) => {
    try {
        // Check brearer token
        const user = await User.findById(req.user.id).select("-password");

        //  Check for the user profile
        if (!user) {
            return res.status(400).json({ message: "User profile not found. Please try again." });
        }

        // Return response
        res.json({
            user,
            message: "Profile retrieved successfully."
        });
    } catch (error) {
        res.status(500).json({ message: "Unable to fetch user profile at the moment. Please try again later." });
    }
};

module.exports = { registerUser, loginUser, getUserProfile };
