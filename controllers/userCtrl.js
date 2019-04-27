const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const currentUser = await User.findOne({ username: req.session.username });
    res.render("user/index", {
      friends: currentUser.friends,
      users: allUsers
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/:id/addfriend", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username });
    console.log(user, "<======pre");
    console.log(req.params.id);
    user.friends.push(req.params.id);
    user.save();
    console.log(user, "<=====post");
    res.redirect("/users");
  } catch (err) {
    throw new Error(err);
  }
});

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
    req.session.destroy();
    res.redirect("/start");
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
    res.render("user/cookbook", {
      user,
      cookbook: user.cookbook
    });
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
