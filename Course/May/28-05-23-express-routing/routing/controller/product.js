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
    }
}