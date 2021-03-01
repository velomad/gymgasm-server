const models = require("../../models");
const { capitalizeFirstLetter } = require("../../utils/string");

const isUsernameTaken = async (req, res) => {
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
module.exports = { isUsernameTaken };
