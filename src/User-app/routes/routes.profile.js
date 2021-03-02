const router = require("express").Router();
const controller = require("../controller/controller.profile");
const { verifyUserAccessToken } = require("../../utils/jwt-helper");

// POST
router.post("/create-profile", verifyUserAccessToken, controller.createProfile);

// UPDATE
router.patch(
  "/update-profile",
  verifyUserAccessToken,
  controller.updateProfile
);

module.exports = router;
