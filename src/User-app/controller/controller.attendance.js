const models = require("../../models");

const makeAttendance = async (req, res, next) => {
  const userId = req.payload.aud;
  try {
    const getGymId = await models.User.findOne({
      where: { id: userId },
      attributes: ["gymId"],
    });
    const result = await models.Attendance.create({
      userId,
      gymId: getGymId.gymId,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { makeAttendance };
