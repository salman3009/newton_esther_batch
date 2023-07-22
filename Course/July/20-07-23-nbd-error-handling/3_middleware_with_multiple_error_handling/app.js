const express = require('express');
const app = express();

app.get('/',(req,res,next)=>{
    try{
      let error = new Error("get api is failing");
      error.status = 404;
      throw error;
    }catch(err){
         next(err);
    }
})

app.get('/basic',(req,res,next)=>{
    try{
      let error = new Error("basic api is failing");
      throw error;
    }catch(err){
         next(err);
    }
})

const errorLogger = (error,req,res,next)=>{
    error.logger = "verification for error logger is done";
    next(error);
}

const errorHandler=(error,req,res,next)=>{
    const status = error.status || 400;
    const message = error.message || "backend error";
    const logger = error.logger || 'some exception'
    res.status(status).send({message,logger});
}

app.use(errorLogger);
app.use(errorHandler);



app.listen(8080,()=>{
    console.log("server is running on 8080");
})