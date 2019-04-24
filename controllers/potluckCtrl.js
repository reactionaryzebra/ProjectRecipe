const express = require("express");
const router = express.Router();
const Potluck = require("../models/potluck");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.session.username })
      .populate("potLuckOwned")
      .populate("potLuckPart");
    res.render("/potluck/index");
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
    res.redirect(`/potluck/${createdPotluck.id}`);
  } catch {
    throw new Error(err);
  }
});

module.exports = router;
