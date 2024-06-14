const express = require("express");
const router = express.Router();
const userFunctions = require("../controller/userController.js");
const apiFunctions = require("../controller/apiFunctions.js");

// Routes
// GET all users
router.get("/", userFunctions.getUsers);

// POST new user message
router.post("/postmessage", userFunctions.postMessage);

router.post("/postcomment", userFunctions.postComment);

//deleting a message
router.get("/delete/users/:id", userFunctions.deleteUser);

//deleting a comment
router.get("/delete/:userId/:commentId", userFunctions.deleteComment);

//update a message
router.get("/users/:id", userFunctions.editMessagePage);
router.post("/user/:id", userFunctions.editMessageForm);

//API routes
//get info of all users
router.get("/api/allUsers", apiFunctions.getAllUsers);

//post new user to db
router.post("/api/postMessage", apiFunctions.postMessage);

//update user in db
router.put("/api/users/update/:id", apiFunctions.updateMessage);

//delete user from db
router.delete("/api/users/delete/:id", apiFunctions.deleteMessage);

//delete comment from db
router.delete("/comments/:userId/:commentId", apiFunctions.deleteComment);

//post comment to db
router.post("/comments", apiFunctions.postComment);

module.exports = router;
