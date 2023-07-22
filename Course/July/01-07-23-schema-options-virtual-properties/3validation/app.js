const mongoose = require('mongoose');
const Employee = require('./models/employee');

const uri ="mongodb://localhost:27017/validation";



mongoose.connect(uri).then(()=>{
    console.log("connected");
    createOperation();
}).catch(()=>{
    console.log("failed");
})

const createOperation = async()=>{
    try{

    //   const employeePost = new Employee({
    //      firstName:'ramesh',
    //      age:20,
    //      hobbies:['cricket'],
    //      salary:25000
    //   })

    const employeePost = new Employee({
        age:20,
        hobbies:['cricket'],
        salary:25000
     })

      const result = await employeePost.save();
      console.log(result);

    }catch(err){
     let errorList =[];
      if(err){
        for (field in err.errors){
            errorList.push({
                key:field,
                value:err.errors[field].message
            })
        }
        console.log(errorList);
      }

    }
}