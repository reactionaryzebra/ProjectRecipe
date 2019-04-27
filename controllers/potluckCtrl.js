const express = require("express");
const router = express.Router();
const Potluck = require("../models/potluck");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.session.username })
      .populate("potLuckOwned")
      .populate("potLuckPart");
    console.log(foundUser);
    res.render("potluck/index", {
      user: foundUser
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const foundPotluck = await Potluck.findById(req.params.id);
    res.render("/potluck/edit", {
      potluck: foundPotluck
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const potluck = await Potluck.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/potluck/${req.params.id}`);
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username });
    const foundPotluck = await Potluck.findById(req.params.id)
      .populate("organizer")
      .populate("guests")
      .populate("dishes");
    console.log(foundPotluck);
    res.render("potluck/show", {
      user,
      potluck: foundPotluck
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username });
    const createdPotluck = await Potluck.create({
      name: req.body.name,
      organizer: user,
      date: req.body.date
    });
    user.potLuckOwned.push(createdPotluck);
    user.save();
    res.redirect(`potlucks/${createdPotluck.id}`);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
