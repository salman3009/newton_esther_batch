const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require("fs");
const products   =require("../models/product.js");
const products_data = JSON.parse(fs.readFileSync(`${__dirname}/../data/products.json`));

dotenv.config();

//connect to DB
const url = process.env.DATABASE_URL || "mongodb://localhost:27017/products";
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})

//insert Products data to Mongodb

for(var i=0;i<products_data.length;i++){

        var name, price, description, category;
        name = products_data[i]["name"];
        price = products_data[i]["price"];
        description = products_data[i]["description"];
        category = products_data[i]["category"];

        var newproduct = {
            "name":name,
            "description":description,
            "price": price,
            "category": category
        };

        products.create(newproduct);
}

app.listen(3000, () => console.log('Server running......'));
