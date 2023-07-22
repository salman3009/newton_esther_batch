const express = require('express');
const app = express();
const parser = require('body-parser');

app.use(parser.json());
// app.use((req,res,next)=>{
//     console.log("coming to first middleware");
//     next();
// })



//http://localhost:3000
app.get('',(req,res)=>{
  res.status(200).json({message:"fetched successfully"});
})

//http://localhost:3000
app.post('',(req,res)=>{
     console.log(req.body);
     res.status(201).json({message:"Data is created successfully"});
})


app.listen(3000,()=>{
    console.log("server is running on 3000");
})