const Transaction = require('../models/Transaction');

const createTransaction = async(req,res)=>{
       try{
        let {name,amount,location} = req.body;
        const post = new Transaction({
            name,amount,location
        });
        const result = await post.save();
        res.status(201).json({list:result});
       }catch(err){
        return res.status(400).json({
            message: err
          })
       }
}

const listTransaction = async (req,res)=>{
     try{
        let result = await Transaction.find();
        res.status(200).json({
            list:result
        })
     }catch(err){
        return res.status(400).json({
            message: err
          })
     }
}

module.exports.createTransaction= createTransaction;
module.exports.listTransaction = listTransaction;