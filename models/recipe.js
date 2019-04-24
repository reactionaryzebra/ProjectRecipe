const mongoose = require('mongoose');



const recipeSchema = new mongoose.Schema({
    title:String,
    image:String,
    url:String,
    ingredients:[],
    dietlabels:[],
    healthlabels:[],
    nutrientinfo:[],
    likes:Number,
    hates:Number
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
