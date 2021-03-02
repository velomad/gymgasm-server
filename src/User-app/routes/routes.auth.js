const router = require("express").Router();
const controller = require("../controller/controller.auth");

// POST
router.post("/register", controller.register);

router.post("/login", controller.login);

// GET
router.get("/gym-suggestions", controller.gymSuggestions);


module.exports = router;
