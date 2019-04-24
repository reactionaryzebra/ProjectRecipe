const express        = require('express')
const app            = express()
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
require('./db/db')


///controllers
const cookbookController = require('./controllers/cookbookCtrl')
const peopleController   = require('./controllers/peopleCtrl')
const potluckController  = require('./controllers/potluckCtrl')
const recipeController   = require('./controllers/recipeCtrl')
const userController     = require('./controllers/userCtrl')






///////////middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));






///connection to schema


app.listen(3030,()=>{
    console.log('listening',3030)
})
