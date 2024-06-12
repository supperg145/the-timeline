const User = require("../models/users.js");

const getUsers = (req, res) => {
  console.log("GET for all users received");
  User.find().sort().then((result) =>
    {
    console.log(result),
    res.render("index",{
      users: result,
    })
  }
  )
    .catch((error) => {
      console.error(`Error fetching user: ${error}`);
      res.status(500).send("Error fetching user");
    });
    
};

const postMessage = (req, res) => {
  console.log("Post request sent", req.body);
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



module.exports = {
  getUsers,
  postMessage,
  postComment,
};
