const express = require("express");
const router = express.Router();
const Recipe= require('../models/recipe')
const User = require("../models/user");


 
 router.get("/", async (req, res) => {
    try {
        const foundrecipe = `https://api.edamam.com/search?${req.body}&app_id=a4dfacb5&app_key=84af915767a2c0a3e247254b6550ec6f&`

      const foundUser = await User.findOne({ username: req.session.username })
      res.render("recipes/index.ejs",{search:foundrecipe});
    } catch (err) {
      throw new Error(err);
    }
  });

  module.exports = router;