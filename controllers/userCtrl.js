const express = require("express");
const router = express.Router();
const User = require("../models/user");
let message;

router.get("/auth", (req, res) => {
  console.log("route hit");
  res.render("/user/auth");
});

router.post("/register", async (req, res) => {
  try {
    const foundUser = await User.find({ username: req.body.username });
    if (foundUser) {
      message = "This username is taken, please try another";
    } else {
      const newUser = await User.create(req.body);
      req.session.username = req.body.username;
      req.session.logged = true;
      res.render("/user/landing", {
        user: newUser
      });
    }
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.find({ username: req.body.username });
    if (!foundUser) {
      message = "Incorrect username or this username does not exist";
    } else {
      if (foundUser.validate) {
        res.render("/user/landing", {
          user: foundUser
        });
      } else {
        message = "Incorrect password";
      }
    }
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
