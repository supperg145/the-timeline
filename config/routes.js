const express = require("express");
const router = express.Router();
const userFunctions = require("../controller/userController.js");

// Routes
// GET all users
router.get("/", userFunctions.getUsers);

// POST new user message
router.post("/", userFunctions.postMessage);

module.exports = router;
