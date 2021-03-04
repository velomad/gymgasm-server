const models = require("../../models");
const sequelize = require("sequelize");
const Op = require("sequelize").Op;
const { capitalizeFirstLetter } = require("../../utils/string");

const isTaken = async (req, res) => {
  // field name
  const queryKey = Object.keys(req.query)[0];

  // field value
  const queryVal = Object.values(req.query)[0];

  // name of the model
  const type = capitalizeFirstLetter(req.params.type);

  try {
    const result = await models[type].findOne({
      where: {
        [queryKey]: queryVal,
      },
    });
    return res.status(200).json({ isTaken: result === null ? false : true });
  } catch (e) {
    res.status(400).json(e);
  }
};

const getMonthAttendance = async (req, res, next) => {
  const month = req.body.month;
  // user id of gym attendee
  const userId = req.body.userId;
  // gym id of the gym in which user is enrolled
  const gymId = req.payload.aud;
  try {
    const result = await models.Attendance.findAll({
      attributes: [["createdAt", "presentDate"]],
      where: {
        [Op.and]: [
          sequelize.where(
            sequelize.fn("MONTH", sequelize.col("createdAt")),
            month
          ),
        ],
        gymId,
        userId,
      },
    });
    res
      .status(200)
      .json({ status: "success", results: result.length, attendance: result });
  } catch (error) {
    next(error);
  }
};


module.exports = { isTaken, getMonthAttendance };











