const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('hbs',exphbs({
     defaultLayout:'index',
     extname:'.hbs'
}))

app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('home',{msg:"welcome to onboard"})
})

app.get('/people',(req,res)=>{
        res.render('people',{list:[{name:'akash'},{name:'salman'}]})
})

app.listen(8080,()=>{
    console.log("server is running on 8080");
})