const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    cookbook: [{type: mongoose.Schema.Types.ObjectId, ref:'Recipe'}],
    friends:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    diets:[String],
    potLuckOwned:[{type: mongoose.Schema.Types.ObjectId, ref: 'PotLuck'}],
    potLuckPart:[{type: mongoose.Schema.Types.ObjectId, ref: 'PotLuck'}]
})

const User = mongoose.model('User', userSchema)

module.exports = User
