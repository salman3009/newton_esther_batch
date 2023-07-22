const mongoose = require('mongoose');
const Employee = require('./models/employee');

const uri = "mongodb://localhost:27017/hooks";


mongoose.connect(uri).then(()=>{
     console.log("connected");
     createOperation();
}).catch(()=>{
     console.log("failed");
})

const createOperation=async()=>{
    try{
       const employeePost = new Employee({
           firstName:'amoln',
           lastName:'sasi'
       })
       const result = await employeePost.save();
       console.log("while saving to database",result);
    }catch(err){
        console.log(err);
    }
}