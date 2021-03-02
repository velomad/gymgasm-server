const router = require("express").Router()
const controller = require("../controller/controller.auth")

router.post("/register", controller.register)

module.exports= router