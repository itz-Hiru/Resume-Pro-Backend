const fs = require("node:fs");
const path = require("node:path");
const Resume = require("../models/resume.model");

// http://localhost:3000/api/resume/create
const createResume = async (req, res) => {
    try {
        const { title } = req.body;

        // Default resume template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: "",
                fullName: "",
                designation: "",
                summary: "",
            },
            template: {
                theme: "",
                colorPalette: [""],
            },
            contactInfo: {
                email: "",
                phone: "",
                location: "",
                linkedin: "",
                github: "",
                website: "",
            },
            workExperience: [
                {
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ],
            education: [
                {
                    degree: "",
                    institution: "",
                    startDate: "",
                    endDate: "",
                },
            ],
            skills: [
                {
                    name: "",
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: "",
                    description: "",
                    github: "",
                    liveDemo: "",
                },
            ],
            certifications: [
                {
                    title: "",
                    issuer: "",
                    year: "",
                },
            ],
            languages: [
                {
                    name: "",
                    progress: 0,
                },
            ],
            interests: [""],
        };

        const newResume = await Resume.create({
            userId: req.user._id,   // User ID
            title,                  // Resume title
            ...defaultResumeData,   // Resume data
        });

        res.status(200).json({
            message: "Your resume has been created successfully! 🎉",
            resume: newResume
        });
    } catch (error) {
        res.status(500).json({
            message: "Oops! Something went wrong while creating your resume. Please try again later.",
            error: error.message
        });
    }
}

// http://localhost:3000/api/resume/get
const getUserResume = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 }); // Sort by latest
        res.status(200).json({
            message: "Here are all your resumes, sorted by the most recent updates.",
            resumes
        })
    } catch (error) {
        res.status(500).json({
            message: "Oops! Something went wrong while fetching your resumes. Please try again later.",
            error: error.message
        });
    }
}

// http://localhost:3000/api/resume/get/:id
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ 
            _id: req.params.id,     // Resume ID
            userId: req.user._id    // User ID
        });

        if (!resume) {
            return res.status(400).json({
                message: "Sorry, we couldn’t find a resume with that ID. Please check and try again."
            });
        }

        res.status(200).json({
            message: "Here’s the resume you requested.",
            resume
        })
    } catch (error) {
        res.status(500).json({
            message: "Oops! Something went wrong while retrieving the resume. Please try again later.",
            error: error.message
        });
    }
}

// http://localhost:3000/api/resume/update/:id
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,     // Resume ID
            userId: req.user._id    // User ID
        });

        if (!resume) {
            res.status(400).json({
                message: "Resume not found. Please double-check the ID and try again."
            });
        }

        // Merge updates from req.body into existing resume
        Object.assign(resume, req.body);

        // Save updated resume
        const saveResume = await resume.save();

        res.status(200).json({
            message: "Your resume has been updated successfully! ✅",
            saveResume
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while updating the resume. Please try again later.",
            error: error.message
        });
    }
}

// http://localhost:3000/api/resume/delete/:id
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,     // Resume ID
            userId: req.user._id    // User ID
        });

        if (!resume) {
            return res.status(400).json({
                messsage: "We couldn't find a resume with that ID. It may have already been deleted."
            });
        }

        // Delete thumbnail image and profile preview Url images from uploads folder
        const uploadsFolder = path.join(__dirname, "..", "uploads");

        if (resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));

            // Delete thumbnail image if exists
            if (fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail);
            }
        }

        if (resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));

            // Delete profile preview image if exists
            if (fs.existsSync(oldProfile)) {
                fs.unlinkSync(oldProfile);
            }
        }

        // Delete resume
        const deleted = await Resume.findByIdAndDelete({
            _id: req.params.id,     // Resume ID
            userId: req.user._id    // User ID
        });

        res.status(200).json({
            message: "Resume deleted successfully. ✅"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while deleting the resume. Please try again later.",
            error: error.message
        });
    }
}

module.exports = {
    createResume,
    getUserResume,
    getResumeById,
    updateResume,
    deleteResume
};
