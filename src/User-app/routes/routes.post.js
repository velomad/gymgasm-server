const router = require("express").Router();
const controller = require("../controller/controller.post");
const { verifyUserAccessToken } = require("../../utils/jwt-helper");

router.post("/create-photo-post", verifyUserAccessToken, controller.postPhoto);

module.exports = router;
