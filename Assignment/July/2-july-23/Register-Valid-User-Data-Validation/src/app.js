const express = require('express');
const fs = require("fs");
const app = express();
var users   =require("../models/user.js");



//Router Middlewares
app.use(express.json());

app.get("/",async function(req,res){

    var name = req.query.name;
    var email  = req.query.email;
    var pswd = req.query.pswd;

    var newuser = {
        "name":name,
        "email":email,
        "password": pswd
    };

    users.create(newuser).then((user) => {
        // console.log(user);
        res.send(user._id);
    })
    .catch((error) => {
        console.log(error.message);
        res.status(404).send(error.message);
    });

});


module.exports = app;
