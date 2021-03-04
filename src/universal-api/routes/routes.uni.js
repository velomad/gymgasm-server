const router = require("express").Router();
const controller = require("../controller/controller.uni");
const { verifyGymAccessToken } = require("../../utils/jwt-helper");

// GET
// type stands for model name

router.get("/istaken/:type", controller.isTaken);

// POST
router.post("/attendance/month", verifyGymAccessToken, controller.getMonthAttendance);

module.exports = router;
