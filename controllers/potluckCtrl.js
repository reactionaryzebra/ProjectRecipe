const express = require("express");
const router = express.Router();
const Potluck = require("../models/potluck");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.session.username })
      .populate("potLuckOwned")
      .populate("potLuckPart");
    res.render("potluck/index");
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
    const foundPotluck = await Potluck.findById(req.params.id);
    res.render("/potluck/show");
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.sessions.username });
    const createdPotluck = await Potluck.create({ organizer: user });
    res.render(`/potluck/edit`);
  } catch {
    throw new Error(err);
  }
});

module.exports = router;
