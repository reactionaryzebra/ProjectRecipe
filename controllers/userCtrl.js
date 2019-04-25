const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");

router.post("/register", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (foundUser) {
      req.flash("message", "This username is taken, please try another");
    } else {
      const newUser = await User.create(req.body);
      req.session.username = req.body.username;
      req.session.logged = true;
      res.redirect(`${newUser.id}`);
    }
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      req.flash(
        "message",
        "Incorrect username or this username does not exist"
      );
    } else {
      if (foundUser.validatePassword(req.body.password)) {
        res.redirect(`users/${foundUser.id}`);
      } else {
        req.flash("message", "Incorrect password");
      }
    }
  } catch (err) {
    throw new Error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const recipesToDelete = await Recipe.deleteMany().in("_id", user.cookbook);
    res.redirect("/start");
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("user/landing", {
      user
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/:id/cookbook", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("cookbook");
    res.render("/user/cookbook", {
      cookbook: user.cookbook
    });
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
