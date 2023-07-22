const mongoClient = require('mongodb').MongoClient;
//url to connect local database
const uri = "mongodb://localhost:27017/";
//creating connection
const connect = new mongoClient(uri);
//banking database
const db = connect.db('banking');

const clusterId = require('mongodb').ObjectId;

//keyword: MongoClient,db,collection,insertOne

async function insert(){
   try{
       //collection() - give collection name 
       //insertOne() - method to insert the data 
       //all db operation will return promise
       let result = await db.collection('customer').insertOne({
        fullName:'durgesh',
        hobbies:['cricket','music'],
        address:{
            primary:'Noida',
            second:'Delhi'
        }
    });
    console.log(result); 
   }catch(err){
    console.log(err);
   }
}
//insert();

async function find(){
    try{
        let result = await db.collection('customer').find().toArray();
        console.log("find",result);

    }catch(err){
        console.log(err);
    }

}

//find();

async function findQuery(){
    try{
        let result = await db.collection('customer').find({fullName:'prashant raj'}).toArray();
        console.log("find",result);

    }catch(err){
        console.log(err);
    }

}

//findQuery();

async function findById(){
    try{
        let query = {_id: new clusterId('6488a36671e91b8fea00777d')};
        let result = await db.collection('customer').find(query).toArray();
        console.log("find",result);

    }catch(err){
        console.log(err);
    }

}

findById();

async function deleteById(){
    try{
      let query = {_id: new clusterId('6488a68f123e389302043d25')};
      let result = await db.collection('customer').deleteOne(query);
      console.log(result);
    }catch(err){
        console.log(err);
    }
}
// deleteById();

async function update(){
    try{
      let update ={$set:{status:true}};
      let filter ={_id: new clusterId('6488a36671e91b8fea00777d')};
      let result = await db.collection('customer').updateOne(filter,update);
      console.log(result);

    }catch(err){
        console.log(err);
    }

}
//update();