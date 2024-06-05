const express = require("express")
const router = express.Router()
const getUsers = require("../controller/userController")

//Routes
router.get("/", getUsers)

module.exports = router