const User = require('../models/User');

/*
You need to write a controller function that fetches all the products purchased by a user from the database. 
The function should take a user ID in the request body and use it to find the corresponding user object from the database using findById method. 
Once the user object is obtained, the function should populate the productsPurchased field of the user object using the populate method. 
Finally, the function should return the products purchased by the user in the response along with a success message. 
If the user ID provided in the request is invalid, the function should return an error message with a 404 status code. 
If there is any other error while fetching the data from the database, the function should return an error message with a 400 status code.

The sample input and output for the controller function are as follows:
Sample Input:
{
    "userId": "640703441e67ce712d52d3b5"
}
Sample Output:
{
    "status": "success",
    "message": "Products Purchased by User",
    "data": {
        "products": [
            {
                "_id": "640703441e67ce712d5adbe4",
                "name": "Product 1",
                "description": "This is product 1",
                "price": 100,
                "category": "Category 1",
                "createdAt": "2023-03-06T14:00:00.000Z",
                "__v": 0
            },
            {
                "_id": "640703441e67ce712d52d3cb",
                "name": "Product 2",
                "description": "This is product 2",
                "price": 200,
                "category": "Category 2",
                "createdAt": "2023-03-06T14:10:00.000Z",
                "__v": 0
            }
        ]
    }
}
*/

const getProductsPurchasedByUser = async (req, res) => {
    try {
        //Write the code to fetch all the products purchased by a user from the database
        const {userId} = req.body;
        const user = await User.findById(userId).populate('productsPurchased');

        if(!user){
            return res.status(404).json({
                message:'User not found',
                status:'Error'
            })
        }

        res.status(200).json({
            message:'Products Purchased by User',
            status: "success",
            data:{
                products:user.productsPurchased
            }

        })

    } catch (err) {
        res.status(400).json({
            message: "Couldn't Fetch the Data",
            status: "Error",
            error: err,
        });
    }
}

// Adds a product to a user's purchased products array
const addProductToUser = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "Error", message: "User not Found" });
        }
        user.productsPurchased.push(productId);
        await user.save();
        res.status(200).json({
            status: "success",
            message: "Product Purchased Successfully",
            data: {
                user,
            },
        });
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


module.exports = { addProductToUser, getAllUsers, getUserByID, createUser, updateUser, deleteUser, getProductsPurchasedByUser };

