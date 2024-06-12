const express = require("express");
const router = express.Router();
const userFunctions = require("../controller/userController.js");

// Routes
// GET all users
router.get("/", userFunctions.getUsers);

// POST new user message
router.post("/postmessage", userFunctions.postMessage);

router.post("/postcomment", userFunctions.postComment)

//deleting a message
router.get("/delete/users/:id", userFunctions.deleteUser)

//deleting a comment
router.get("/delete/:userId/:commentId", userFunctions.deleteComment)

//update a message
router.get("/users/:id", userFunctions.editMessagePage)
router.post("/user/:id", userFunctions.editMessageForm)


module.exports = router;
