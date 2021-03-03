const Op = require("sequelize").Op;
const models = require("../../models");

const allMembers = async (req, res) => {
  const gymId = req.payload.aud;
  try {
    const result = await models.User.findAll({
      include: [
        {
          model: models.UserDetail,
          as: "details",
        },
      ],
      raw: false,
      attributes: ["username", "createdAt"],
      where: {
        gymId,
      },
    });
    res.status(200).json({ results: result.length, members: result });
  } catch (e) {
    res.status(400).json(e);
  }
};

const member = async (req, res, next) => {
  const gymId = req.payload.aud;
  const userId = req.params.id;
  try {
    const result = await models.User.findOne({
      include: [
        {
          model: models.UserDetail,
          as: "details",
        },
      ],
      raw: false,
      attributes: ["username", "createdAt"],
      where: {
        [Op.and]: {
          gymId: gymId,
          id: userId,
        },
      },
    });
    res.status(200).json({ member: result });
  } catch (error) {
    next(error);
  }
};

module.exports = { allMembers, member };
