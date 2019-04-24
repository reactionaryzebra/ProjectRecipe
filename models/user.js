const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    cookbook: [recipies],
    friends:[users],
    diets:[str],
    potLuckOwned:[],
    potLuckPart:[]
})

module.exports = User