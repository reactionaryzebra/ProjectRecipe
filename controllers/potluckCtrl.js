const express = require("express");
const router = express.Router();
const Potluck = require("../models/potluck");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.session.username })
      .populate("potLuckOwned")
      .populate("potLuckPart");
    res.render("potluck/index", {
      user: foundUser
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
    user.potLuckOwned.push(createdPotluck);
    user.save();
    res.redirect(`potlucks/${createdPotluck.id}`);
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/:id/inviteFriends", async (req, res) => {
  try {
    let user;
    const potluck = await Potluck.findById(req.params.id);
    if (typeof req.body.friends != "object") {
      potluck.guests.addToSet(req.body.friends);
      user = await User.findById(req.body.friends);
      user.potLuckPart.push(potluck);
      user.save();
    } else {
      for (let i = 0; i < req.body.friends.length; i++) {
        potluck.guests.addToSet(req.body.friends[i]);
        user = await User.findById(req.body.friends[i]);
        user.potLuckPart.push(potluck);
        user.save();
      }
      req.body.friends.forEach(friend => {
        potluck.guests.addToSet(friend);
      });
    }
    potluck.save();
    res.redirect(`/potlucks/${req.params.id}`);
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/:id/addDishes", async (req, res) => {
  try {
    const potluck = await Potluck.findById(req.params.id);
    if (typeof req.body.dishes != "object") {
      potluck.dishes.addToSet(req.body.dishes);
    } else {
      req.body.dishes.forEach(dish => {
        potluck.dishes.addToSet(dish);
      });
    }
    potluck.save();
    res.redirect(`/potlucks/${req.params.id}`);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
