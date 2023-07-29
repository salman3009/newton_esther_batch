const express = require('express');
const app = express();
const logger = require('./logger');

app.get('/',(req,res,next)=>{
    logger.info('It is entering the api get method');
    res.status(200).send("Successfully fetched the data");
})

app.get('/info',(req,res,next)=>{
    try{
        logger.info('It is entering the api get method - info');
       throw new Error("user is not found");
    }catch(err){
        logger.info('It is entering the api get method -info',err);
     res.status(500).send({message:err.message})
    }
})

app.listen(8080,()=>{
    console.log("server is running on 8080");
})