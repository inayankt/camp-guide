const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'CampGuide',
    allowedFormats: ['jpeg', 'png', 'jpg']
  }
});

const imageUpload = async (url, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(url, { folder })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};

module.exports = {
  cloudinary, storage, imageUpload
}