require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploader = async (filePath) => {
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(filePath)
    .catch((error) => {
      console.log("Cloudinary upload error: ", error);
    });

  // console.log("Cloudinary upload result: ", uploadResult);
  return uploadResult;
};

const destroyer = async (publicId) => {
  // Delete an image
  const destroyResult = await cloudinary.uploader
    .destroy(publicId)
    .catch((error) => {
      console.log(error);
    });

  console.log(destroyResult);
  return destroyResult;
};

module.exports = { uploader, destroyer };
