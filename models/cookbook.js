const mongoose = require('mongoose');

const cookBook = new mongoose.Schema({
    recipies:String
})

const cookBook = mongoose.model('CookBook', CookbookSchema);

module.exports = cookBook;