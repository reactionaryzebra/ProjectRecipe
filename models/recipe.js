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
    hate:Number
})

module.exports = Recipe