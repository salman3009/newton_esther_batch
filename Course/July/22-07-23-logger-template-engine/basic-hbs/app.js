const express = require('express');
const app = express();
app.set('view engine','hbs');
app.set('views',__dirname+"/views")


app.get('',(req,res)=>{
     res.render('index');
})

app.listen(8080,()=>{
    console.log("server is running on 3000");
})