const express = require("express");
const path = require("path");
const users = require("./users");
const exhbs = require("express-handlebars");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");

mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

//handlebar middleware
app.engine("handlebars", exhbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body parser Middleware
app.use(express.json());
app.use(express.urlencoded((extended = false)));
// static folder
app.use(express.static(path.join(__dirname, "public")));
//api
app.use("/api/users/", require("./routes/api/users"));
//app.use("/",require('./urlrouter/urls'))
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("connect database"))
  .catch((err) => {
    console.log("err:", err.message);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server starting " + PORT));
