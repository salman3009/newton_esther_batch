const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { off } = require('../models/product.js');
const products   =require("../models/product.js");


// Import routes

//Router Middlewares
app.use(express.json());



/* Some Example of Type of Query

1. /?limit=5
2. /?offset=3
3. /?offset=4&limit=4

*/


//default value for limit is 5 and offset is 0
//This route should return an array of _id of all the element that need to be rturned.
//output id can be in any order.

app.get("/",async function(req,res){

    let limit = req.query.limit;
    let offset = req.query.offset;

    if(limit == null){
        limit = 5;
    }
    else {
        limit = parseInt(limit);
    }
    if(offset == null){
        offset = 0;
    }else{
        offset = parseInt(offset);
    }

    if(limit > 5){
        limit = 5;
    }

    let result = await products.find();

    var ids = [];

    const start = (limit * offset);

    for(let i = start; i<result.length && i<(start+limit);i++){
        ids.push(result[i]["_id"]);
    }

    
    //Write your Code here.

    res.send(ids);

});

module.exports = app;

