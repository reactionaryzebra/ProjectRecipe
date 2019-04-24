const mongoose = require('mongoose');

const cookBook = new mongoose.Schema({
    recipies:[{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}]
})

const CookBook = mongoose.model('CookBook', CookbookSchema);

module.exports = cookBook;
