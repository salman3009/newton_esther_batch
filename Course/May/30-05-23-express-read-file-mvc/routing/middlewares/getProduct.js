const productModel = require('../models/product-model');

module.exports=(req,res,next)=>{
    try{
        let result = productModel.getListModel();
        req.list = result;
        req.id = result.length+1;
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({
            status:"failed",
            message:"internal server error"
        })
    }
}