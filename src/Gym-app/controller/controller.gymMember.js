const models = require("../../models");
const addMember = async (req, res) => {
  const { gymId, username, phoneNumber, name, bio, profileImage } = req.body;
  try {
    const result = await models.User.create({
      gymId,
      username,
      phoneNumber,
      name,
    });
    res.status(201).json(result);
  } catch (e) {
    res.status(400).json(e);
    console.log(e);
  }
};

const allMembers = async (req, res) => {
  try {
    const result = await models.User.findAll({
      where: {
        // replace 1 with gym id
        gymId: 1,
      },
    });
    res.status(200).json({ results: result.length, members: result });
  } catch (e) {
    res.status(400).json(e);
  }
};



module.exports = { addMember, allMembers };
