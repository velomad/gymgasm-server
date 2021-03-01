const router = require("express").Router();
const controller = require("../controller/controller.isTaken");

// type stands for model name
router.get("/istaken/:type", controller.isUsernameTaken);

module.exports = router;
