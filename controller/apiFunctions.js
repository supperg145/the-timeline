//Imports
const User = require("../models/users.js");

//API functions

//Get info of all users
const getAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      console.log(users);
      res.json({ message: "This is the GET route for all users", users });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while retrieving users", error });
    });
};

//Post new user

const postMessage = (req, res) => {
  console.log("API request for new message sent.");
  if (!req.body.message || req.body.message.length < 25 || !req.body.name) {
    return res.status(400).json({
      message:
        "The message should be at least 25 characters long and needs to have a title.",
    });
  }
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.json({ message: "Created new user" });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occured while creating user", error });
    });
};

//Update an user
const updateMessage = (req, res) => {
  console.log(`PUT request for user: ${req.params.id} sent.`);
  if (!req.body.message || req.body.message.length < 25 || !req.body.name) {
    return res.status(400).json({
      message:
        "The message should be at least 25 characters long and needs to have a title.",
    });
  }
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: "User successfully updated." });
    })
    .catch((error) => {
      console.error(`Error updating user: ${error}`);
      res.status(500).json({ message: "Error updating user" });
    });
};

//Delete user
const deleteMessage = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({
        message: `Message with id: ${req.params.id} succsefully deleted`,
      });
    })
    .catch((error) => {
      console.error(`Error updating user: ${error}`);
      res.status(500).json({ message: "Error updating user" });
    });
};

const deleteComment = (req, res) => {
    console.log(
      `Sent delete request for user ${req.params.userId} and for comment: ${req.params.commentId}`
    );
    const user = User.findById(req.params.userId)
      .then((user) => {
        const commentIndex = user.comments.findIndex(
          (comment) => comment._id.toString() === req.params.commentId
        );
        console.log("Comment index: ", commentIndex);
  
        if (commentIndex === -1) {
          return res.status(404).json({ error: "Comment not found" });
        }
  
        user.comments.splice(commentIndex, 1);
  
        return user.save();
      })
      .then(() => {
        res.json({message : "Comment succesfully deleted"});
      })
      .catch((err) => {
        console.log(`Error deleting user ${err}`);
        res.status(500).json({message  :"Error deleting user"});
      });
  };

  const postComment = (req, res) => {
    console.log("POST request for comment received", req.body);
  
    // Extract comment and usersId from request body
    const { comment, usersId } = req.body;
  
    User.findById(usersId)
      .then((user) => {
        if (!user) {
          return res.status(404).send("User not found");
        }
  
        user.comments.push({ text: comment });
        return user.save();
      })
      .then(() => {
        res.json({message : "Comment succsefully posted"});
      })
      .catch((error) => {
        console.error(`Error posting comment: ${error}`);
        res.status(500).json({message : "Error posting comment"});
      });
  };

//export
module.exports = {
  getAllUsers,
  postMessage,
  updateMessage,
  deleteMessage,
  deleteComment,
  postComment
};
