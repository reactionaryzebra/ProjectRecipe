const mongoose = require("mongoose");

const potLuckSchema = new mongoose.Schema({
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  date: Date,
  diet: [String],
  organizer: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Potluck = mongoose.model("Potluck", potLuckSchema);

module.exports = Potluck;
