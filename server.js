const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("express-flash");
require("./db/db");

///controllers
const peopleController = require("./controllers/peopleCtrl");
const potluckController = require("./controllers/potluckCtrl");
const recipeController = require("./controllers/recipeCtrl");
const userController = require("./controllers/userCtrl");

///Settings
app.set("view engine", "ejs");

///////////middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(
  session({
    secret: "ofweupeujo;weju;823",
    resave: false,
    saveUninitialized: false
  })
);
app.use(flash());

app.listen(3030, () => {
  console.log("listening", 3030);
});

app.get("/start", (req, res) => {
  res.render("start");
});

app.use("/users", userController);
app.use("/potlucks", potluckController);
// app.use(function(req, res) {
//   req.sessions.logged ? next() : res.redirect("/start");
// });
///Routes for all non-login pages
