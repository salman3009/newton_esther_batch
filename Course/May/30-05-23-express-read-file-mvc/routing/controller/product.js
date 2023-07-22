const productModel = require('../models/product-model');

module.exports ={
    getListController:async(req,res)=>{
        try{
            let result = productModel.getListModel();
            res.status(200).json({
                status:'success',
                message:'fetched successfully',
                data:result
            })

        }catch(err){
            res.status(500).json({
                status:'failed',
                message:'internal server error'
            })
        }
    },

  postListController:async(req,res)=>{
     try{
        console.log("post list controller");
        let product = req.body;
        console.log(product);
        product.id = req.id;
        req.list.push(product);
        let proc = await productModel.postListModel(req.list);
        console.log(proc);
        res.status(201).json({
            status:"success",
            message:"successfully created the data"
        })
     }catch(err){
        res.status(500).json({
             status:'failed',
             message:'internal server error'
        })
     }
  }
}