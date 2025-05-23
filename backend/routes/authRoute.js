const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const { uploader, destroyer } = require("../config/cloudinary");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // check file size
  if (req.file.size > 1024 * 1024 * 50) {
    return res
      .status(400)
      .json({ message: "Image size should be bellow 50MB" });
  }

  // Upload to Cloudinary
  const uploadResult = await uploader(req.file.path);
  if (!uploadResult) {
    return res.status(500).json({ message: "Failed to upload image" });
  }
  const url = uploadResult.secure_url;
  const publicId = uploadResult.public_id;

  res.status(200).json({ publicId, url });
});

router.delete("/delete-image/:id", async (req, res) => {
  const { id: publicId } = req.params;

  // Find the image in the database
  // const profileImage = await ProfileImage.findById(id);
  // if (!profileImage) {
  //   return res.status(404).json({ message: "Image not found" });
  // }

  // Delete from Cloudinary
  const deleteResult = await destroyer(publicId);
  if (!deleteResult) {
    return res
      .status(500)
      .json({ message: "Failed to delete image from storage" });
  }

  // // Delete from database
  // const deletedImage = await ProfileImage.findByIdAndDelete(id);
  // if (!deletedImage) {
  //   return res.status(500).json({ message: "Failed to delete image from DB" });
  // }

  res
    .status(200)
    .json({ success: true, message: "Image deleted successfully" });
});

module.exports = router;
