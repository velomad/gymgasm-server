const sequelize = require("sequelize");
const Op = require("sequelize").Op;
const models = require("../../models");

const getMonthAttendance = async (req, res, next) => {
  const month = req.body.month;
  const userId = req.body.id;
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

module.exports = { getMonthAttendance };
