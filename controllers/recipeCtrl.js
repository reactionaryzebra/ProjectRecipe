const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    res.render("recipes/index");
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
