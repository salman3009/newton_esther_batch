const express = require('express');
const app = express();
const fs = require('fs');
const env = require('dotenv');
env.config();

app.use(express.json());

const list = JSON.parse(fs.readFileSync(`${__dirname}/data/tour.json`));
console.log(list);

app.get('',(req,res)=>{
    res.send(list);
});

app.post('',(req,res)=>{
   let product = req.body;
   product.id = list.length+1;
   list.push(product);
   fs.writeFile(`${__dirname}/data/tour.json`,JSON.stringify(list),()=>{
      res.status(201).send("<h1>Data added successfully");
   })

})

app.delete('/:id',(req,res)=>{

    let id = Number(req.params.id);

    let index = list.findIndex((obj)=>{
       return obj.id === id;
    });

    if(index === -1){
         return res.status(404).send("index not found");
    }

    list.splice(index,1);

    fs.writeFile(`${__dirname}/data/tour.json`,JSON.stringify(list),()=>{
        res.status(201).send("<h1>Data is deleted successfully");
    })
})

app.patch('/:id',(req,res)=>{

    let id = Number(req.params.id);

    let index = list.findIndex((obj)=>{
        return obj.id === id;
     });
 
     if(index === -1){
          return res.status(404).send("index not found");
     }

     let singleProduct = list.find((obj)=>{
        return obj.id === id;
     });

     let result ={...singleProduct,...req.body};
     
     list.splice(index,1);

     list.push(result);


     fs.writeFile(`${__dirname}/data/tour.json`,JSON.stringify(list),()=>{
        res.status(201).send("<h1>Data is updated successfully</h1>")
     })
})

app.listen(process.env.PORT,()=>{
    console.log("server is running xon",process.env.PORT);
})