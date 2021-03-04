const router = require("express").Router();
const controller = require("../controller/controller.attendance");
const { verifyGymAccessToken } = require("../../utils/jwt-helper");

module.exports = router;
