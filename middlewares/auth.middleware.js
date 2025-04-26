const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1]; // Extract the token

            // Verify and decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({
                    message: "User not found. Authorization failed."
                });
            }

            next();
        } else {
            res.status(401).json({
                message: "Access denied. No token provided."
            });
        }
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token. Please login again.",
            error: error.message
        });
    }
};

module.exports = { protect };
