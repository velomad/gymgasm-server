const router = require("express").Router();
const controller = require("../controller/controller.gymMember");
const { verifyGymAccessToken } = require("../../utils/jwt-helper");

// GET
router.get("/all", verifyGymAccessToken , controller.allMembers);

router.get("/:id", verifyGymAccessToken , controller.member);

// POST

module.exports = router;
