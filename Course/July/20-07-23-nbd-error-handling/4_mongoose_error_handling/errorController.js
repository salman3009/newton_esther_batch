
const handleValidationError=(err,res)=>{
    let errors = Object.values(err.errors).map((result)=>result.message);
    let fields = Object.values(err.errors).map((result)=>result.path);
    console.log(errors,fields);
    return res.status(400).send({message:errors,field:fields});
}

const handleDuplicateError=(err,res)=>{
      const field = Object.keys(err.keyValue);
      return res.status(409).send({message:'An account already exists with this name',field})
}


module.exports=(err,req,res,next)=>{
    try{
        console.log(err.code);
        if(err.name && err.name == "ValidationError"){
           return handleValidationError(err,res);
        }
        if(err.code && err.code == 11000 ) {
           return handleDuplicateError(err,res);
        }
        throw new Error('some unknow error');
    }catch(err){
        res.status(500).send('unknow error');
    }
}