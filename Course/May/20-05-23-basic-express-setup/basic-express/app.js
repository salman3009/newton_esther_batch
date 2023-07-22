const express = require('express');
const app = express();
const PORT = 3000;


//http://localhost:3000
app.get('',(req,res)=>{
  res.send("<h1>Welcome to express</h1>");
})

//http://localhost:3000/list
app.get('/list',(req,res)=>{
    res.send({
        firstName:"amol",
        age:22,
        location:'Delhi'
    })
})

app.get('/product',(req,res)=>{
    res.status(200).json({
        name:"AC",
        price:2000,
        status:true
    })
})

app.get('/bootstrap',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})






app.listen(PORT,()=>{
    console.log("server is running on 3000");
})

