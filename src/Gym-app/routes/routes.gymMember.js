const router = require("express").Router();
const controller = require("../controller/controller.gymMember");
const { verifyAccessToken } = require("../../utils/jwt-helper");

// GET
router.get("/all", verifyAccessToken, controller.allMembers);

// POST

module.exports = router;
