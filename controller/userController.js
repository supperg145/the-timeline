const User = require("../models/users.js")


const getUsers = (req, res, next) => {
  User.find().sort({createdAt : -1})
  .then((result) => {
    res.render("index", {
      sortedUsers: result
    })
  })
  .catch((error) => {
    console.error(`Error fetching user: ${error}`);
    res.status(500).send("Error fetching user")
  })

}

const postMessage = (req, res) => {
  console.log("Post request sent",req.body);
  const user = new User(req.body)
  user.save()
  .then((result) => {
    res.redirect("/")
  })
  .catch((error) => {
    console.log(error)
  })
}

module.exports = {
  getUsers,
  postMessage
}