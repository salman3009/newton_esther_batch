const mongoose = require('mongoose');
const Student = require('./models/student');


const uri = "mongodb://localhost:27017/databaseModelling";

mongoose.connect(uri).then(()=>{
    console.log("connected");
    // createOperation();
    findOperation();
}).catch(()=>{
    console.log("error");
})

const createOperation=async()=>{
    
    try{

        const studentPost = new Student({
            studentName:"suresh",
            studentId:"23MSE0344",
            branch:"CSE",
            permanentAddress:{
                doorNumber:'247',
                city:'Delhi',
                pinCode:342134
            }
        });

        const result = await studentPost.save();
        console.log(result);

    }catch(err){
        console.log(err);
    }
}

const findOperation= async ()=>{
      try{
        let result = await Student.aggregate([{$project:{studentName:1,'permanentAddress.city':1,_id:0}}]);
        console.log(result);
      }catch(err){

      }
}