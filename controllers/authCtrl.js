const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (foundUser) {
      req.flash(
        "registration-info",
        "This username is taken, please try another"
      );
      res.send(req.flash("registration-info"));
    } else {
      if (req.body.password === req.body.passwordConfirm) {
        const newUser = await User.create(req.body);
        req.session.username = req.body.username;
        req.session.logged = true;
        req.app.locals.username = newUser.username;
        req.app.locals.userId = newUser.id.toString();
        res.send({
          created: true,
          id: newUser.id
        });
      } else {
        req.flash("registration-info", "Passwords do not match");
        res.send(req.flash("registration-info"));
      }
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
        "login-info",
        "Incorrect username or this username does not exist"
      );
      res.send(req.flash("login-info"));
    } else {
      if (foundUser.validatePassword(req.body.password)) {
        req.session.username = req.body.username;
        req.session.logged = true;
        req.app.locals.username = foundUser.username;
        req.app.locals.userId = foundUser.id.toString();
        res.send({
          created: true,
          id: foundUser.id
        });
      } else {
        req.flash("login-info", "Incorrect password");
        res.send(req.flash("login-info"));
      }
    }
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/logout", async (req, res) => {
  try {
    req.app.locals.username = "";
    req.app.locals.userId = "";
    req.session.destroy();
    res.redirect("/start");
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
