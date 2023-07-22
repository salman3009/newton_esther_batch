const express = require('express');
const app = express();

app.get('/',(req,res)=>{
     try{
       let error = new Error('some unwanted values are given');
        error.status = 400;
        throw error;
     }catch(err){
        return res.status(err.status).json({
            message:err.message
        })
     }
})

app.listen(8080,()=>{
    console.log("server is running on 8080");
})