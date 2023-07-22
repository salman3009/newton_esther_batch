const mongoose = require('mongoose');
const Employee = require('./models/employee');

const uri = "mongodb://localhost:27017/virtual";


mongoose.connect(uri).then(()=>{
    console.log("database is connected");
   // createOperation();
   findOpeation();
}).catch(()=>{
     console.log("failed");
})

const createOperation=async()=>{
    try{ 
       const employeePost = new Employee({
        firstName:'kumar',
        lastName:'raj'
       })
       const result = await employeePost.save();
       console.log(result);
    }catch(err){
        console.log(err);
    }
}

const findOpeation=async()=>{
    try{
    const result = await Employee.find();
    for(let obj of result){
        console.log(obj.fullName);
    }
    }catch(err){
        console.log(err);
    }
}