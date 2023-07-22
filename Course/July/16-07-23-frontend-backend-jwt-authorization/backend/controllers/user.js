const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { userName, email, password,access } = req.body;

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      userName,
      email,
      access,
      password: hashedPassword
    })

    const result = await user.save();
    res.status(201).json({
      user: { result }
    })

  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

const login = async (req,res) => {
  try {
    let emailResult = await User.findOne({email:req.body.email});
     if(!emailResult){
         return res.status(400).json({message:"Email is not found"});
     }
     if(!bcrypt.compareSync(req.body.password,emailResult.password)){
      return res.status(400).json({message:"password is not found"});
     }
      let result = jwt.sign({email:emailResult.email,access:emailResult.access},'secret-newton-school-token',{expiresIn:'1m'})
      return res.status(200).json({
         message:'login successful',
         email:emailResult.email,
         token:result,
         admin:emailResult.access === 'admin'?true:false
      })
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: err
    })
   }

}

module.exports.register = register;
module.exports.login = login;