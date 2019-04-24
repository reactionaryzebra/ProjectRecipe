const mongoose = require('mongoose');


const potLuckSchema = new mongoose.Schema({
    guests:[users],
    dishes:[recipies],
    date:Date,
    diet:[String],
    Organizer: {User}
})

const potLuck = mongoose.model('PotLuck', potLuckSchema);

module.exports = potLuck;