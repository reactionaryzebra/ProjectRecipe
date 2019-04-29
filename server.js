const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("express-flash");
require("./db/db");
require("dotenv").config();

///controllers
const authController = require("./controllers/authCtrl");
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

//Set up routes
app.listen(3000, () => {
  console.log("listening", 3000);
});

app.get("/start", (req, res) => {
  res.render("start");
});
app.use("/auth", authController);

//Check authentication
app.use(function(req, res, next) {
  req.session.logged ? next() : res.redirect("/start");
});

app.use("/users", userController);
app.use("/potlucks", potluckController);
app.use("/recipes", recipeController);
