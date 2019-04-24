const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  uri: String,
  label: String,
  image: String,
  source: String,
  url: String,
  yield: Number,
  calories: Number,
  ingredients: [
    {
      foodId: String,
      quantity: Number,
      measure: {
        uri: String,
        label: String
      },
      weight: Number,
      food: {
        foodId: String,
        label: String
      }
    }
  ],
  dietlabels: [String],
  healthlabels: [String],
  nutrientinfo: [
    {
      uri: String,
      label: String,
      quantity: Number,
      unit: String
    }
  ],
  likes: Number,
  hates: Number
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
