const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const User = require("../models/user");
const axios = require("axios");

let searchQuery = "food";




router.post("/", (req, res) => {
  console.log(req.body);
  searchQuery = req.body.searchQuery;
  res.redirect("/recipes");
});

router.get("/", async (req, res) => {
  console.log(searchQuery);
  recipes = await axios.get(
    `https://api.edamam.com/search?q=${searchQuery}&app_id=a4dfacb5&app_key=84af915767a2c0a3e247254b6550ec6f&`
  );
  //console.log(recipes.data.hits[0].recipe.image)

  try {
    res.render("recipes/index", { recipes });
    // res.send("got recipes")
  } catch (err) {
    throw new Error(err);
  }
});
router.get("/:uri", async (req, res) => {
  try {
    const encode = await encodeURIComponent(req.params.uri);
    recipe = await axios.get(
      `https://api.edamam.com/search?r=${encode}&app_id=a4dfacb5&app_key=84af915767a2c0a3e247254b6550ec6f&`
    );
    res.render("recipes/show", {
      recipe
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.get('/:_id',(req, res) => {
  
  recipes.findById(req.params._id,(err,foundRecipe)=>{
  res.render("recipes/show")
})
})


module.exports = router;
