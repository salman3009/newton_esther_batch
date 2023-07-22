const mongoose = require('mongoose');
const Student = require('./models/student');
const Address = require('./models/address');

const uri = "mongodb://localhost:27017/databaseModelling";

mongoose.connect(uri).then(()=>{
    console.log("connected");
   // createOperationStudent();
   findOperation();
   // createOperationAddress();
}).catch(()=>{
    console.log("error");
})

const createOperationStudent=async()=>{
    
    try{

        const studentPost = new Student({
            studentName:"suresh",
            studentId:"23MSE0344",
            branch:"CSE"
        });

        const result = await studentPost.save();
        console.log(result);

    }catch(err){
        console.log(err);
    }
}

const createOperationAddress = async()=>{
      try{
        let addressPost = new Address({
            doorNumber: 345,
            city:'Mumbai',
            pinCode:444532
        }) 
        const addressResult = await addressPost.save();
        const result = await Student.updateOne({studentId:'23MSE0344'},{$push:{addressIds:addressResult._id}});
        console.log(result);
      }catch(err){
        console.log(err);
      }
}



const findOperation= async ()=>{
      try{
        let result = await Student.findOne({studentId:'23MSE0344'});
        console.log(result.addressIds);
        let addressResult = [];
        for(let obj of result.addressIds){
           let details = await Address.findOne({_id:obj});
           addressResult.push(details);
        }
        console.log(addressResult);
      }catch(err){
           console.log(err);
      }
}