const router = require("express").Router();
const controller = require("../controller/controller.auth");

router.post("/register", controller.registerGym);

router.post("/login", controller.login);

module.exports = router;
