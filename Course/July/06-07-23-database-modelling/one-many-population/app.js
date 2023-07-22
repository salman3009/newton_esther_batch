const mongoose = require('mongoose');
const Student = require('./models/student');
const Address = require('./models/address');

const uri = "mongodb://localhost:27017/databaseModelling";

mongoose.connect(uri).then(()=>{
    console.log("connected");
   //createOperationStudent();
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
            pinCode:444532,
            postedBy:'64a6f72f1ad036b9aceb2820'
        }) 
        const addressResult = await addressPost.save();
        console.log(addressResult);
      }catch(err){
        console.log(err);
      }
}



const findOperation= async ()=>{
      try{
        let result = await Address.find().populate('postedBy');
        console.log(result);
        
      }catch(err){
           console.log(err);
      }
}