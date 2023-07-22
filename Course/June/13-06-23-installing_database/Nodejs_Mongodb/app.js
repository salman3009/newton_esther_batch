const mongoClient = require('mongodb').MongoClient;
//url to connect local database
const uri = "mongodb://localhost:27017/";
//creating connection
const connect = new mongoClient(uri);
//banking database
const db = connect.db('banking');

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
 insert();

