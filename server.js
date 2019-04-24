const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
require("./db/db");

///controllers
const cookbookController = require("./controllers/cookbookCtrl");
const peopleController = require("./controllers/peopleCtrl");
const potluckController = require("./controllers/potluckCtrl");
const recipeController = require("./controllers/recipeCtrl");
const userController = require("./controllers/userCtrl");

///Settings
app.set("view engine", "ejs");

///////////middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "ofweupeujo;weju;823",
    resave: false,
    saveUninitialized: false
  })
);

app.listen(3030, () => {
  console.log("listening", 3030);
});

app.use("/users", userController);