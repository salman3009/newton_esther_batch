const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Employee = require('./models/employee');
const errorController = require('./errorController');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/errorHandling').then(()=>{
    console.log("connected");
}).catch(()=>{
    console.log("error");
})

app.post('',async (req,res,next)=>{
      try{
        const employeeResult = new Employee({
            firstName:req.body.firstName,
            age:req.body.age,
            hobbies:req.body.hobbies
        });
         let result = await employeeResult.save();
             return res.status(201).send(result)
      }catch(err){
            next(err);
      }
})

app.use(errorController);
app.listen(8080);