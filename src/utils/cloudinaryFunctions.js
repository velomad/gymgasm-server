const cloudinary = require("cloudinary");
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: "df1njw2ap",
  api_key: "887782298746526",
  api_secret: "BkWKGwUy851tCM1QX1Q_vhWyAjg",
});

const uploadCloud = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.secure_url, id: result.public_id });
      },
      { resource_type: "auto" }
    );
  });
};

const deleteCloud = (file) => {
  cloudinary.v2.uploader.destroy(file, (error, result) => {
    console.log(result, error);
  });
};

module.exports = { uploadCloud, deleteCloud };
