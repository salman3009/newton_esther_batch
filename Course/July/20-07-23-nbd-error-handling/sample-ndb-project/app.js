const express = require('express');
const app = express();

app.get('/',(req,res)=>{
     let a = 8;
     let b = 14;
     let result = a + b; 
     res.send(`The value is ${result}`);
})

app.listen(8080,()=>{
    console.log("server is running on 3000");
})