const express = require("express");
const router = express.Router();
const Potluck = require("../models/potluck");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username });
    const potlucksOrganized = await Potluck.find({ organizer: user }).populate(
      "organizer"
    );
    const potlucksAttending = await Potluck.find({ guests: user }).populate(
      "guests"
    );
    res.render("potluck/index", {
      potlucksOrganized,
      potlucksAttending
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const potluck = await Potluck.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      date: req.body.date
    });
    res.redirect(`/potlucks/${req.params.id}`);
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.session.username
    })
      .populate("friends")
      .populate("cookbook");
    const foundPotluck = await Potluck.findById(req.params.id)
      .populate("organizer")
      .populate("guests")
      .populate("dishes");
    
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
    res.redirect(`potlucks/${createdPotluck.id}`);
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/:id/inviteFriends", async (req, res) => {
  try {
    const potluck = await Potluck.findByIdAndUpdate(
      req.params.id,
      {
        guests: req.body.friends
      },
      { new: true }
    );
    res.redirect(`/potlucks/${req.params.id}`);
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/:id/addDishes", async (req, res) => {
  try {
    const potluck = await Potluck.findByIdAndUpdate(
      req.params.id,
      {
        dishes: req.body.dishes
      },
      { new: true }
    );
    res.redirect(`/potlucks/${req.params.id}`);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
