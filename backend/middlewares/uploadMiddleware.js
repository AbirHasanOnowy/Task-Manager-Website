const multer = require("multer");

// // Set up storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// Set up file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, JPG and PNG are allowed."),
      false
    );
  }
};

// const upload = multer({ storage, fileFilter });

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 50, // 50 MB
  },
  fileFilter,
});

module.exports = upload;
