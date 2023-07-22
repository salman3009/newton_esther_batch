

module.exports={

    registerController: async (req,res)=>{
        try{
            res.status(201).json({
                message:"Data is created successfully",
                status:"success"
            })
        }catch(err){
            res.status(500).json({
                message:"internal server error",
                status:"failed"
    
            })
        }
       
    },

    loginController: async (req,res)=>{
        try{
            res.status(200).json({
                message:"login is successful",
                status:"succes"
    
            })
        }catch(err){
            res.status(500).json({
                message:"internal server error",
                status:"failed"
    
            })
        }
       
    }
}