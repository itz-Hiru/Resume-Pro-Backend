const multer = require("multer");

// configure storage
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // for unique file name use created time in file name
    },
});

// file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]; // allowed file types
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpeg, .jpg, .png formats are allowed"), false);
    }
}

const upload = multer({ storage, fileFilter });

module.exports = upload;
