const router = require("express").Router()
const controller = require("../controller/controller.attendance")
const {verifyUserAccessToken} = require("../../utils/jwt-helper")

// GET

// POST
router.post("/make-attendance",verifyUserAccessToken, controller.makeAttendance)

module.exports = router 