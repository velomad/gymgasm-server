const router = require("express").Router();
const controller = require("../controller/controller.gymMember");

// GET
router.get("/members", controller.allMembers);

// POST
router.post("/addmember", controller.addMember);

module.exports = router;
