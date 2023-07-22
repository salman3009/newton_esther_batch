const Transaction = require('../models/Transaction');

const createTransaction = async(req,res)=>{
       try{
        let {name,amount,location} = req.body;
        let email = req.user.email;
        const post = new Transaction({
            name,amount,location,email
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
      let query={}
        if(req.user.access != 'admin'){
           query.email = req.user.email;
        }
        let result = await Transaction.find(query);
        res.status(200).json({
            list:result
        })
     }catch(err){
        return res.status(400).json({
            message: err
          })
     }
}

const deleteTransaction = async(req,res)=>{
      try{
        console.log("id",req.params.id);
        let result = await Transaction.deleteOne({_id:req.params.id});
        console.log(result);
        res.status(200).json({
            message:"successfully deleted"
        })
      }catch(err){
        console.log("error response",err);
        return res.status(400).json({
            message: err
          })
      }
}

module.exports.createTransaction= createTransaction;
module.exports.listTransaction = listTransaction;
module.exports.deleteTransaction = deleteTransaction;