const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1]; // Generate extra token

            // Decode token
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select("-password");
            next();
        } else {
            res.status(401).json({ message: "Not authorized, No token" });
        }
    } catch (error) {
        res.status(401).json({ message: "Token failed", error: error.message });
    }
}

module.exports = { protect };
