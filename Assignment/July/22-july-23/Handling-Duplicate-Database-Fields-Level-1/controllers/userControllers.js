const User = require("../models/User");
const handleAsyncErrors = require("../utils/handleAsyncErrors");
const AppError = require("../utils/AppError");

/*
Design and implement a user registration functionality in a web application that allows users to create an account. The goal is to enhance the existing createUser controller by handling invalid data and preventing the creation of duplicate user accounts.

The current implementation of the createUser controller accepts user input for the username, email, and password fields. However, it lacks proper validation and error handling. The controller needs to be modified to address the following issues:

Invalid Data Handling:

The controller should check if the required fields (username, email, and password) are present in the request body. If any of these fields are missing, the controller should return an appropriate error response with a status code of 400 (Bad Request). The error message should indicate that username, email, and password are required fields.
Duplicate User Check:

Before creating a new user, the controller should check if the provided username or email already exists in the system. This prevents the creation of duplicate user accounts with the same username or email.
If a user with the same username or email is found, the controller should return an appropriate error response with a status code of 409 (Conflict). The error message should indicate that the username or email already exists.
Successful User Creation:

If the provided data is valid and no duplicate user account is found, the controller should proceed with creating a new user.
The controller should instantiate a new User object with the provided username, email, and password.
The user object should be saved to the database.
After successful user creation, the controller should return a response with a status code of 201 (Created) along with a success message indicating that the user was created successfully. The response should also include the user object containing the created user's data.
To solve this problem, modify the existing createUser controller to incorporate the necessary data validation, duplicate user checking, and proper error handling as described above. The controller should ensure that only valid and unique user accounts are created while providing appropriate feedback in case of any errors or invalid data.

Examples: 
When all required fields are provided correctly and the user creation is successful:
Input:
POST /api/users
Body: {
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
Output:
Status: 201 Created
{
  "message": "User created successfully",
  "user": {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "********" (hashed password or omitted for security reasons)
  }
}
When one or more required fields (username, email, or password) are missing:
Status: 400 Bad Request
{
  "error": "Username, email, and password are required fields"
}

When a user with the same username or email already exists:
Status: 409 Conflict
{
  "error": "Username or email already exists"
}

When an internal server error occurs during user creation:
Status: 500 Internal Server Error
{
  "error": "Internal server error"
}
*/

const createUser = handleAsyncErrors(async (req, res) => {
  const { username, email, password } = req.body;
  //Add Error Handling
  if(!username || !email || !password){
    return AppError(res,400,'Username, email, and password are required fields');
  }
  const existerUser = await User.findOne({$or:[{username},{email}]});
  if(existerUser){
    return AppError(res,409,'Username or email already exists');
  }
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).json({ message: 'User created successfully', user });
});


const getAllUsers = handleAsyncErrors(async (req, res) => {
  const users = await User.find();
  if (users.length === 0) {
    return AppError(res, 404, "User not found");
  }
  res.status(200).json(users);
});

const getUserByID = handleAsyncErrors(async (req, res) => {
  const { id } = req.params;
  if (!isValidID(id)) {
    return AppError(res, 400, "Invalid user ID");
  }
  const user = await User.findById(id);
  if (!user) {
    return AppError(res, 404, "User not found");
  }
  res.status(200).json(user);
});

function isValidID(id) {
  const regex = /^[0-9a-fA-F]{24}$/;
  return regex.test(id);
}

module.exports = {
  getAllUsers,
  getUserByID,
  createUser
};
