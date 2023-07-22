const express = require('express');
const app = express();

app.get('/',(req,res,next)=>{
    res.status(200).send("Successfully fetched the data");
})

app.get('/info',(req,res,next)=>{
    try{
       throw new Error("user is not found");
    }catch(err){
     res.status(500).send({message:err.message})
    }
})

app.listen(8080,()=>{
    console.log("server is running on 8080");
})