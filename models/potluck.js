const mongoose = require('mongoose');


const potLuckSchema = new mongoose.Schema({
    guests:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    dishes:[{type: mongoose.Schema.Types.ObjectId, ref:'Recipe'}],
    date:Date,
    diet:[String],
    Organizer: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
})

const PotLuck = mongoose.model('PotLuck', potLuckSchema);

module.exports = PotLuck;
