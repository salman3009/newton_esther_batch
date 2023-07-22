const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/banking";
const Customer = require('./models/customer');

mongoose.connect(uri).then(()=>{
    console.log("database is connected");
    createOperation();
    //findOperation();
}).catch((err)=>{
    console.log("connection failed",err)
})


const createOperation=async()=>{
  try{
    let result = new Customer({
      fullName:"raj sathis",
      age:33,
      hobbies:['football','cricket'],
      salary:44000
    })
    let finalResult = await result.save();
    console.log(finalResult);

  }catch(err){
    console.log(err);
  }
}

const findOperation= async ()=>{
       try{
        let result = await Customer.find();

        //filtering with _id 
        // let result = await Customer.find({_id:'64946b6fcc9dd5dccce30feb'});

        //query with other property
       // let result = await Customer.find({fullName:'suresh',age:65});

        console.log(result);
        //final data in array format
       }catch(err){
        console.log(err)
       }
}

