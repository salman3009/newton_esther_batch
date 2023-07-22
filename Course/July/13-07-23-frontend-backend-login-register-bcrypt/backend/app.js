const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/esther").then(()=>{
    console.log('connected');
}).catch((err)=>{
     console.log(err);
})

app.use('/api/user',userRoute);



app.listen(8080,()=>{
    console.log("server is running on 8080");
})