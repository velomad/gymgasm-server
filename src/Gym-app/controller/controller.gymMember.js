const models = require("../../models");

const allMembers = async (req, res) => {
  const authId = req.payload.aud;
  try {
    const result = await models.User.findAll({
      where: {
        gymId: authId,
      },
    });
    res.status(200).json({ results: result.length, members: result });
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = { allMembers };
