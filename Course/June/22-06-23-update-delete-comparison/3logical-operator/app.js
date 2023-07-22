const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/banking";
const Customer = require('./models/customer');

mongoose.connect(uri).then(()=>{
    console.log("database is connected");
    findOperation();
}).catch((err)=>{
    console.log("connection failed",err)
})


const findOperation= async ()=>{
       try{

        // let result = await Customer.find();
        // console.log(result);

        //$and
        //  let result = await Customer.find({$and:[{fullName:'grey'},{age:{$gt:30}}]});
        //  console.log(result);

        //$nor
        let result = await Customer.find({$nor:[{fullName:'grey'},{age:{$gt:40}}]});
         console.log(result);
       
       //$or
        //let result = await Customer.find({$or:[{fullName:'greyd'},{age:{$gt:40}}]});
        //console.log(result);
      
      
       }catch(err){
        console.log(err)
       }
}






