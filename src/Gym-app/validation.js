const joi = require("@hapi/joi");

const authSchema = joi.object({
  gymId: joi.string().required().min(2),
  name: joi.string().required().min(2),
  phoneNumber: joi
    .string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  password: joi.string().min(5).required(),
  lat: joi.number().required(),
  lon: joi.number().required(),
});

module.exports = { authSchema };
