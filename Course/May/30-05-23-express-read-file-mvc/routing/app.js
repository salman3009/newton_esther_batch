const express = require('express');
const app = express();
const path = require('path');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const env = require('dotenv');
env.config();

app.use(express.json());
app.use('',express.static(path.join(__dirname,'views')));
app.use('/api/user',userRoute);
app.use('/api/product',productRoute);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
});