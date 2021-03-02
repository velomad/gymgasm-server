const joi = require("@hapi/joi");

const authSchema = joi.object({
  gymId: joi.number().required(),
  phoneNumber: joi.string().required().min(10).max(13),
  username: joi.string().required().min(2),
  password: joi.string().required().min(5),
});

const profileSchema = joi.object({
  name: joi.string().required(),
  profileImageUrl: joi.string(),
  bio: joi.string().max(70),
});

module.exports = { authSchema, profileSchema };
