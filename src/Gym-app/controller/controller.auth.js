const models = require("../../models");
const createError = require("http-errors");
const { authSchema } = require("../validation");
const { signAccessToken } = require("../../utils/jwt-helper");
const bcrypt = require("bcrypt");

const registerGym = async (req, res, next) => {
  try {
    // validated body
    const validate = await authSchema.validateAsync(req.body);

    // if gymID already exist
    const gymIdExist = await models.Gym.findOne({
      where: { gymId: validate.gymId },
    });

    // if phone number already exist
    const phoneNumberExist = await models.Gym.findOne({
      where: { phoneNumber: validate.phoneNumber },
    });

    // error responses
    if (phoneNumberExist && gymIdExist) {
      throw createError.Conflict(
        `${validate.phoneNumber} and ${validate.gymId} already exist.`
      );
    } else if (phoneNumberExist) {
      throw createError.Conflict(`${validate.phoneNumber} already exist.`);
    } else if (gymIdExist) {
      throw createError.Conflict(`${validate.gymId} already exist.`);
    }

    // create gym
    const result = await models.Gym.create(validate);

    // generate accesstoken
    const accessToken = await signAccessToken(JSON.stringify(result.id));

    res.status(200).json({ accessToken });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const login = async (req, res, next) => {
  const { gymId, password } = req.body;
  try {
    const gym = await models.Gym.findOne({ where: { gymId } });

    if (!gym) {
      throw createError.Unauthorized("invalid username/password");
    }

    // compare DB pass with userpass
    const comparedPass = await bcrypt.compare(password, gym.password);

    if (!comparedPass)
      throw createError.Unauthorized("invalid username/password");

    // generate accesstoken
    const accessToken = await signAccessToken(JSON.stringify(gym.id));

    res.status(200).json({ accessToken });
  } catch (error) {
    if (error.isJoi === true)
      return next(createError.BadRequest("invalid login credentials"));
    next(error);
  }
};

module.exports = { registerGym, login };
