const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  uri: String,
  label: String,
  image: String,
  url: String,
  yield: Number,
  calories: Number,
  ingredients: [String],
  dietlabels: [String],
  healthlabels: [String],
  likes: Number,
  hates: Number
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
