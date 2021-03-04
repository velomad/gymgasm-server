const models = require("../../models");
const createErrors = require("http-errors");
const { uploadCloud, deleteCloud } = require("../../utils/cloudinaryFunctions");
const { photoPostSchema } = require("../validation");

const postPhoto = async (req, res, next) => {
  const userId = req.payload.aud;
  const image = req.file.path;
  try {
    if (!req.file) {
      throw createErrors.UnprocessableEntity("No image provided");
    }
    // input validation
    const validate = await photoPostSchema.validateAsync(req.body);

    // image upload to cloudinary
    const response = await uploadCloud(image);
    // getting image url from cloudinary response
    const imageUrl = response.url;

    const result = await models.PhotoPost.create({
      userId,
      imageUrl,
      caption: validate.caption,
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { postPhoto };
