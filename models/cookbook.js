const mongoose = require("mongoose");

const cookBook = new mongoose.Schema({
  recipies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }]
});

const Cookbook = mongoose.model("Cookbook", CookbookSchema);

module.exports = Cookbook;
