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
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likes: Number,
  hates: Number
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
