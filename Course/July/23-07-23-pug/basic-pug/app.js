const express = require('express');
const app = express();

app.set('views','./views');
app.set('view engine','pug');

app.get('/',(req,res)=>{
     res.render('index');
})

app.get('/home',(req,res)=>{
    res.render('home',{location:'Bangalore',age:40});
})

app.listen(8080,()=>{
     console.log("server is running on 8080");
})