const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const User = require("../models/user");
const axios = require("axios");
let recipes;
let recipe;
let searchQuery = "food";

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.session.username
    });
    const recipeData = recipe.data[0];
    const newRecipe = await Recipe.create({
      uri: recipeData.uri,
      label: recipeData.label,
      image: recipeData.image,
      url: recipeData.url,
      yield: recipeData.yield,
      caolories: recipeData.calories,
      ingredients: recipeData.ingredientLines,
      dietlabels: recipeData.dietLabels,
      healthlabels: recipeData.healthLabels,
      likes: 0,
      hates: 0
    });
    newRecipe.users.push(user.id);
    newRecipe.save();
    user.cookbook.push(newRecipe.id);
    user.save();
    res.redirect(`/users/${user.id}/cookbook`);
  } catch (err) {
    throw new Error(err);
  }
});

router.post("/search", (req, res) => {
  searchQuery = req.body.searchQuery;
  res.redirect("/recipes");
});

router.get("/", async (req, res) => {
  try {
    recipes = await axios.get(
      `https://api.edamam.com/search?q=${searchQuery}&app_id=${
        process.env.APP_ID
      }&app_key=${process.env.APP_KEY}&to=100`
    );
    const user = await User.findOne({ username: req.session.username });
    res.render("recipes/index", { user, recipes });
  } catch (err) {
    throw new Error(err);
  }
});

router.get("/:uri", async (req, res) => {
  try {
    let showButton = true;
    const encode = await encodeURIComponent(req.params.uri);
    recipe = await axios.get(
      `https://api.edamam.com/search?r=${encode}&app_id=${
        process.env.APP_ID
      }&app_key=${process.env.APP_KEY}&`
    );
    const recipeFound = await Recipe.findOne({
      uri: decodeURIComponent(encode)
    });
    const user = await User.findOne({ username: req.session.username });
    if (recipeFound) {
      const foundUser = await User.findOne().in("_id", recipeFound.users);
      if (foundUser) {
        showButton = false;
      }
    }
    res.render("recipes/show", {
      user,
      showButton,
      recipe
    });
  } catch (err) {
    throw new Error(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.session.username });
    const recipe = await Recipe.findById({ _id: req.params.id });
    recipe.users.remove(user.id);
    recipe.save();
    user.cookbook.remove(req.params.id);
    user.save();
    res.redirect(`/users/${user.id}/cookbook`);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = router;
