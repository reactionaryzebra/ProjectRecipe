const express = require("express");
const router = express.Router();
const recipe= require('../models/recipe')
const User = require("../models/user");

router.get('/recipe',(req,res)=>{
  
    res.render('index.ejs',(err,foundrecipe)=>{

    })
})


