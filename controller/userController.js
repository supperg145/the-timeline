const User = require("../models/users.js");

const getUsers = (req, res) => {
  console.log("GET for all users received");
  User.find()
    .sort({ createdAt: -1})
    .then((result) => {
      console.log(result),
        res.render("index", {
          users: result,
          err: ""
        });
    })
    .catch((error) => {
      console.error(`Error fetching user: ${error}`);
      res.status(500).send("Error fetching user");
    });
};

const postMessage = (req, res) => {
  console.log("Post request sent", req.body);
  if (req.body.message.length < 25) {
    User.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        return res.render("index", {
          err: "Message must be at least 25 characters long",
          users: result
        });
      })
      .catch((error) => {
        console.error(`Error fetching users: ${error}`);
        res.status(500).send("Error fetching users");
      });
    return;
  }
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
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
      res.redirect("/");
    })
    .catch((error) => {
      console.error(`Error posting comment: ${error}`);
      res.status(500).send("Error posting comment");
    });
};

const deleteUser = (req, res) => {
  console.log("Send delete request for user id: ", req.params.id);
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(`Error deleting user ${err}`);
      res.status(500).send("Error deleting user");
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
      res.redirect("/");
    })
    .catch((err) => {
      console.log(`Error deleting user ${err}`);
      res.status(500).send("Error deleting user");
    });
};

const editMessagePage = (req, res) => {
  User.findById(req.params.id)
  .then((result) => {
    console.log(result),
      res.render("editForm", {
        users: result,
        err: ""
      });
  })
  .catch((error) => {
    console.error(`Error fetching user: ${error}`);
    res.status(500).send("Error fetching user");
  });
}

const editMessageForm = (req, res) => {
  if (req.body.message.length < 25) {
    User.findById(req.params.id)
      .then((result) => {
        return res.render("editForm", {
          err: "Message must be at least 25 characters long",
          users: result
        });
      })
      .catch((error) => {
        console.error(`Error fetching users: ${error}`);
        res.status(500).send("Error fetching users");
      });
    return;
  }
  User.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect("/")
  })
  .catch((error) => {
    console.error(`Error updating user: ${error}`);
    res.status(500).send("Error updating user");
  });
}

module.exports = {
  getUsers,
  postMessage,
  postComment,
  deleteUser,
  deleteComment,
  editMessagePage,
  editMessageForm
};
