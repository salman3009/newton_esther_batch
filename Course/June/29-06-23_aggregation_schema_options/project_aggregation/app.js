const mongoose = require('mongoose');
const Employee = require('./models/employee');

const uri = "mongodb://localhost:27017/aggregation";

mongoose.connect(uri).then(()=>{
    console.log("database is connected");
   // createOperation();
   findOperationAggregation();
}).catch(()=>{
    console.log("database is failed");
})

const createOperation=async()=>{
    try{
        const employeePost = new Employee({
            firstName:'ganesh',
            age:22,
            status:true,
            hobbies:['swimming'],
            salary:18000
        })
        const result = await employeePost.save();
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

const findOperationAggregation=async()=>{
    try{
    
    //$project
    // let result = await Employee.aggregate([{$project:{firstName:1,age:1,salary:1,_id:0}}]);

    //$match
    // let result = await Employee.aggregate([
    //     {$match:{firstName:'sathish',age:{$gte:25}}},
    //     {$project:{firstName:1,age:1,salary:1,_id:0}}
    // ])

    // let result = await Employee.aggregate([
    //     {$match:{firstName:'sathish'}},
    //     {$match:{age:{$gte:25}}},
    //     {$project:{firstName:1,age:1,salary:1,_id:0}}
    // ])

    //$sort
    //ascending - 1 
    //descending - -1
    // let result = await Employee.aggregate([
    //     {$match:{age:{$gte:25}}},
    //     {$sort:{salary:1}},
    //     {$project:{firstName:1,age:1,salary:1,_id:0}}
    // ])

    //$unwind
    // let result = await Employee.aggregate([
    //     {$match:{salary:{$gte:45000}}},
    //     {$sort:{salary:1}},
    //     {$unwind:'$hobbies'},
    //     {$project:{firstName:1,hobbies:1,salary:1,_id:0}}
    // ])

     //$group - It will bring unqiue value from firstName field
     // let result = await Employee.aggregate([{$group:{_id:"$firstName"}}])

    // //$group - $sum - It will bring unqiue value + for that unqiue value total salary if we have duplicate firstName it will add it together.
    // let result = await Employee.aggregate([{$group:{_id:"$firstName",totalAmount:{$sum:'$salary'}}}]);

     //$group - $match - It will bring unqiue value + for that unqiue value total salary if we have duplicate firstName it will add it together and after that it will filter the data with totalAmount:40000
     //let result = await Employee.aggregate([{$group:{_id:"$firstName",totalAmount:{$sum:'$salary'}}},{$match:{totalAmount:{$gt:40000}}}]);
    
     //$group - $avg - it will find the average field
    // let result = await Employee.aggregate([{$group:{_id:null,averageDetails:{$avg:"$salary"}}}]);

    //$group - $push - It will create one new array and it will start pushing the value.
   // let result = await Employee.aggregate([{$group:{_id:'$firstName',listSalary:{$push:'$salary'}}}]);
     
   //$group 
   //$dateToString 
   let result = await Employee.aggregate([{$group:{_id:{$dateToString:{format:'%m-%d-%Y',date:'$date'}}}}]);


     console.log(result);
    }catch(err){
        console.log(err);
    }
}