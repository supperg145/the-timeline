const express = require("express")
const routes = require("./config/routes")
const mongoose = require("mongoose")
const User = require("./models/users")
//initializing express app with PORT
const app = express()
const PORT = 5000

//connecting to mongoose
const dbURI = "mongodb+srv://gabor1415:FR1CAdlqGgIlBDnh@thetimeline.uequwzk.mongodb.net/timelinedb?retryWrites=true&w=majority&appName=thetimeline"
mongoose.connect(dbURI)
.then((result) => app.listen(PORT, () => console.log(`App is listening on ${PORT}`)))
.catch((err) => console.log(err))


//connect styling to the file
app.use("/public", express.static("public"))
//parsing incoming data from form to an object
app.use(express.urlencoded({ extended: true }))
//set the view engine as ejs to be able to show ejs code
app.set("view engine", "ejs");
//tell the server where to find routes
app.use(routes)
//start the server


