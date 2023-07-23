const User = require("../models/User");
const handleAsyncErrors = require("../utils/handleAsyncErrors");
const AppError = require("../utils/AppError");


const getAllUsers = handleAsyncErrors(async (req, res) => {
  const users = await User.find();
  if (users.length === 0) {
    return AppError(res, 404, "User not found");
  }
  res.status(200).json(users);
});

/*
Make the necessary changes to the controller to return error 400 using the AppError error handling function, when an invalid Id is requested.

Status Code: 400
{
  error: "Invalid user ID"
}
*/
const getUserByID = handleAsyncErrors(async (req, res) => {
  const { id } = req.params;
  // Add Error Handling Here, check if the id is valid
  if(!isValidID(id)){
    return AppError(res,400,'Invalid user ID')
  }
  const user = await User.findById(id);
  if (!user) {
    return AppError(res, 404, "User not found");
  }
  res.status(200).json(user);
});

function isValidID(id){
  //64b73be04772d795ad5efb62
  const regex = /^[0-9a-zA-Z]{24}$/;
  return regex.test(id);
}


module.exports = {
  getAllUsers,
  getUserByID,
};
