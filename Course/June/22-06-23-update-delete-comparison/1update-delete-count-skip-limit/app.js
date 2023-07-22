const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/banking";
const Customer = require('./models/customer');

mongoose.connect(uri).then(()=>{
    console.log("database is connected");
    //createOperation();
    //findOperation();
    //updateOperation()
   // deleteOperation();
  // countOperation();
    pagination();
}).catch((err)=>{
    console.log("connection failed",err)
})


const createOperation=async()=>{
  try{
    let result = new Customer({
      fullName:"grey",
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

const updateOperation=async()=>{
      try{
         let filter={_id:'64946b6fcc9dd5dccce30feb'};
         let update ={age:40};

        //  let result = await Customer.findOneAndUpdate(filter,update);
        //  console.log(result);

        //It is returning the document new one
        let result = await Customer.findOneAndUpdate(filter,update,{new:true});
         console.log(result);

      }catch(err){
        console.log(err);
      }
}

const deleteOperation = async()=>{
   try{
    let filter = {_id:'649471891b9e1fbcc02177ef'};
    let result = await Customer.deleteOne(filter);
    console.log(result);
   }catch(err){
    console.log(err);
   }
}

const countOperation = async()=>{
  try{
     //total number of count 
     let result = await Customer.find().count();
     console.log(result);
  }catch(err){
    console.log(err);
  }
}

const pagination = async()=>{
   try{
    //Real time curren_page details will come from frontend
      let curren_page = 1;
      let total_per_page = 3;
      let skip_scenario = curren_page * total_per_page;
      let result = await Customer.find().skip(skip_scenario).limit(total_per_page);
      console.log(result);
   }catch(err){
    console.log(err);
   }
}