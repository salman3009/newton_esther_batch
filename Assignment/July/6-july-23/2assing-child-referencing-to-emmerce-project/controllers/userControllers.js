const User = require('../models/User');

/*
You should write a controller function that adds a product to a user's purchased products. 
The controller should take in a request object that contains the user ID and product ID in the request body. 
It should then fetch the user object from the database using the user ID, check if the user exists, and add the product ID to the user's list of purchased products. Finally, it should save the updated user object to the database and return a success message along with the updated user object. 
If the user doesn't exist, the controller should return an error message with a 404 status code.
If there is any other error, the controller should return an error message with a 400 status code.

Sample input to the controller should be:
{
    "userId": "1234567890",
    "productId": "0987654321"
}

Sample output from the controller should be:
{
    "status": "success",
    "message": "Product Purchased Successfully",
    "data": {
        "user": {
            "_id": "1234567890",
            "username": "johndoe",
            "email": "johndoe@example.com",
            "productsPurchased": [
                "0987654321"
            ],
            "createdAt": "2023-03-06T14:00:00.000Z",
            "updatedAt": "2023-03-06T14:10:00.000Z",
            "__v": 1
        }
    }
}

*/
const addProductToUser = async (req, res) => {
    try {
        //Write your code here.
        const {userId,productId} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                status:'Error',
                message:'User not Found'
            })
        }
        user.productsPurchased.push(productId);
        await user.save();
        res.status(200).json({
            status:'success',
            message:'Product Purchased Successfully',
            data:{
                user
            }
        })

    } catch (error) {
        res.status(400).json({
            message: "Couldn't Fetch the Data",
            status: "Error",
            error: err,
        });
    }
};

// Fetches all Users data [Paginated]
const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query;

        const users = await User.find()
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await User.countDocuments(User.find());
        res.status(200).json({
            status: "success",
            data: {
                count,
                users,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Users Not Found",
            status: "Error",
            error: err,
        });
    }
};

// Fetches the user details with the given ID.
const getUserByID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User Not Found"
            });
        }
        return res.status(200).json({
            status: "success",
            data: {
                user: user
            }
        })

    } catch (err) {
        res.status(400).json({
            message: "User Fetching Failed",
            status: "Error",
            error: err,
        });
    }
};

// Creates a new User
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username) {
            return res.status(400).json({
                message: "Username Missing",
                status: "Error",
            });
        }
        if (!email) {
            return res.status(400).json({
                message: "Email Missing",
                status: "Error",
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Password Missing",
                status: "Error",
            });
        }

        const newUser = await User.create({
            username,
            email,
            password,
        });

        res.status(201).json({
            status: "success",
            message: "User Created Successfully",
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        res.status(400).json({
            message: "User Creation failed",
            status: "Error",
            error: err,
        });
    }
};

// Updates user's details
const updateUser = async (req, res) => {
    try {
        const { updatedData } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updatedData }
        );

        if (!user) {
            return res.status(404).json({
                message: "User Not Found",
                status: "Error",
            });
        }

        const updatedUser = await User.findById(req.params.id);
        res.status(200).json({
            status: "success",
            message: "User Updated Successfully",
            data: {
                updatedUser,
            },
        });
    } catch (err) {
        res.status(400).json({
            message: "User Updation Failed",
            status: "Error",
            error: err,
        });
    }
};

// Deletes the user with the given ID.
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ status: "Error", message: "User not Found" });
        }
        res.status(201).json({
            status: "success",
            message: "User Deleted Successfully",
            data: {
                user: deletedUser,
            },
        });
    } catch (err) {
        res.status(400).json({
            message: "User Deletion Failed",
            status: "Error",
            error: err,
        });
    }
};


module.exports = { addProductToUser, getAllUsers, getUserByID, createUser, updateUser, deleteUser };

