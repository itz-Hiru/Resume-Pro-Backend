const express = require("express");
const {
    createResume,
    getUserResume,
    getResumeById,
    updateResume,
    deleteResume,
} = require("../controllers/resume.controller");
const { protect } = require("../middlewares/auth.middleware");
const { uploadResumeImages } = require("../controllers/uploadImage.controller");

const router = express.Router();

router.post("/create", protect, createResume);                  // Create new resume
router.get("/get", protect, getUserResume);                     // Get resume
router.get("/get/:id", protect, getResumeById);                 // Get resume by ID
router.put("/update/:id", protect, updateResume);               // Update exsisting resume
router.put("/:id/upload/images", protect, uploadResumeImages)   // Update resume Image
router.delete("/delete/:id", protect, deleteResume);            // Delete existing resume

module.exports = router;
