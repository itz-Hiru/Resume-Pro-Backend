const fs = require("fs");
const path = require("path");
const Resume = require("../models/resume.model");
const upload = require("../middlewares/upload.middleware");

const uploadResumeImages = async (req, res) => {
    try {
        upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(req, res, async (error) => {
            if (error) {
                return res.status(400).json({
                    message: "Failed to upload images. Please try again.",
                    error: error.message
                });
            }

            const resumeId = req.params.id;
            const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

            if (!resume) {
                return res.status(400).json({
                    message: "Resume not found. Please check the ID and try again."
                });
            }

            const uploadsFolder = path.join(__dirname, "..", "uploads");
            const baseUrl = `${req.protocol}://${req.get("host")}`;

            const newThumbnail = req.files.thumbnail?.[0];
            const newProfileImage = req.files.profileImage?.[0];

            // If new thumbnail uploaded, delete old thumbnail
            if (newThumbnail) {
                if (resume.thumbnailLink) {
                    const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));

                    if (fs.existsSync(oldThumbnail)) {
                        fs.unlinkSync(oldThumbnail);
                    }
                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
            }

            // If new profile image uploaded, delete old profile image
            if (newProfileImage) {
                if (resume.profileInfo?.profilePreviewUrl) {
                    const oldProfileImage = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));

                    if (fs.existsSync(oldProfileImage)) {
                        fs.unlinkSync(oldProfileImage);
                    }
                }
                resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
            }

            await resume.save();

            res.status(200).json({
                message: "Images uploaded and updated successfully! 🎉",
                thumbnailLink: resume.thumbnailLink,
                profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
            });
        });
    } catch (error) {
        console.error("Image upload error: ", error);
        res.status(500).json({
            message: "An error occurred while uploading images. Please try again later.",
            error: error.message
        });
    }
};

module.exports = { uploadResumeImages };
