const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");

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
      const newUser = await User.create(req.body);
      req.session.username = req.body.username;
      req.session.logged = true;
      res.send({
        created: true,
        id: newUser.id
      });
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

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const recipesToDelete = await Recipe.deleteMany().in("_id", user.cookbook);
    res.redirect("/start");
  } catch (err) {
    throw new Error(err);
  }
});

// router.get("/:id/landing", async (req, res) => {
//   // console.log('routehit1')
//   // try {

//     const user=  User.findById(req.params.id)
//     console.log(user.username)
//     console.log('routehit1')
//     res.render(`user/landing`, {
//       user
//     });
//   // } catch (err) {
//   //   throw new Error(err);
//   // }
// });

router.get("/:id/cookbook", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("cookbook");
<<<<<<< HEAD
    
=======

>>>>>>> master
    res.render("user/cookbook", {
      user,
      cookbook: user.cookbook
    });
  } catch (err) {
    throw new Error(err);
  }
});
router.delete("/recipes/:id", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username });
    console.log(user);
    user.cookbook.remove(req.params.id);
    user.save();
    res.redirect(`/users/${user.id}/cookbook`);
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
module.exports = router;
