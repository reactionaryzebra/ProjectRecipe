const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Recipe = require("../models/recipe");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    const currentUser = await User.findOne({ username: req.session.username });
    res.render("user/index", {
      currentUser: currentUser.id.toString(),
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
    user.friends.push(req.params.id);
    user.save();
    res.redirect("/users");
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

router.get("/:id/cookbook", async (req, res) => {
  try {
    const cookbookOwner = await User.findById(req.params.id).populate(
      "cookbook"
    );
    const user = await User.findOne({ username: req.session.username });
    res.render("user/cookbook", {
      cookbookOwner,
      user,
      cookbook: cookbookOwner.cookbook
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/:id/friends", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.session.username
    }).populate("friends");
    res.render("user/friends", {
      user
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
