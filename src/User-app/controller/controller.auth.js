const models = require("../../models");
const { authSchema } = require("../validation");
const createError = require("http-errors");
const { signAccessToken } = require("../../utils/jwt-helper");
const bcrypt = require("bcrypt");
const Op = require("sequelize").Op;

const register = async (req, res, next) => {
  try {
    //   validate inputs
    const validate = await authSchema.validateAsync(req.body);

    // findone if username exist
    const doesExist = await models.User.findOne({
      where: { username: validate.username },
    });
    console.log(doesExist);
    if (doesExist)
      throw createError.Conflict(
        `Username ${validate.username} is already taken.`
      );

    // store user in DB
    const result = await models.User.create(validate);

    // sign access token
    const token = await signAccessToken(
      JSON.stringify(result.id),
      process.env.USER_ACCESS_TOKEN_SECRET
    );
    // response with accessToken

    res.status(200).json({ token });
  } catch (error) {
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // validate the inputs
    const { username, password } = req.body;
    // findone username if exist
    const result = await models.User.findOne({
      where: { username },
    });

    if (!result) throw createError.Unauthorized("invalid username/password");

    // compare db pass with input
    const comparedPass = await bcrypt.compare(password, result.password);

    if (!comparedPass)
      throw createError.Unauthorized("invalid username/password");

    // generate access token
    const accessToken = await signAccessToken(
      JSON.stringify(result.id),
      process.env.USER_ACCESS_TOKEN_SECRET
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

const gymSuggestions = async (req, res, next) => {
  const term = req.query.term;
  try {
    const result = await models.Gym.findAll({
      attributes: ["gymId"],
      where: {
        [Op.or]: [
          { gymId: { [Op.like]: term + "%" } },
          { gymId: { [Op.like]: "% " + term + "%" } },
        ],
      },
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, gymSuggestions };
