const express = require("express")
const routes = require("./config/routes")

const app = express()
const PORT = 5000

app.use("/public", express.static("public"))
app.set("view engine", "ejs");
app.use(routes)
app.listen(PORT, () => console.log(`App is listening on ${PORT}`))

