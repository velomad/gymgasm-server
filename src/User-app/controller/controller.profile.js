const models = require("../../models");
const { profileSchema } = require("../validation");

const createProfile = async (req, res, next) => {
  const userId = req.payload.aud;
  try {
    const validate = await profileSchema.validateAsync(req.body);
    const result = await models.UserDetail.create({
      userId,
      name: validate.name,
      profileImageUrl: validate.profileImageUrl,
      bio: validate.bio,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  const userId = req.payload.aud;
  const { name, bio, profileImageUrl } = req.body;
  try {
    const selector = {
      where: { userId: userId },
    };
    const values = {
      name,
      profileImageUrl,
      bio,
    };
    await models.UserDetail.update(values, selector);
    const result = await models.UserDetail.findOne({ where: { userId } });
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { createProfile, updateProfile };
