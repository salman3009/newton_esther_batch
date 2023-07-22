const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Order = require('../models/Order');

/*
Implement a controller to place an order for a user. The function should receive a request object containing the following parameters: userId, products, shippingAddress, and paymentMethod. If any of the required fields are missing, the function should return a JSON response with a status code of 400 and the following format:

{
"message": "Missing required fields",
"status": "Error"
}

The function should then create a new Order instance using the provided parameters and calculate the total price of the order by multiplying each product's quantity with its respective price retrieved from the database using the Product.findById() method. The total price should then be added to the order instance and saved to the database using the order.save() method.

After the order has been successfully placed, the function should remove the products from the user's cart by retrieving the user's cart using the Cart.findOne() method and updating it using the $pull operator to remove the products that have been ordered.

The function should then return a JSON response with a status code of 200 and the following format:

{
"message": "Order placed successfully",
"status": "Success",
"order": <the order object>
}

If any errors occur during the process, the function should return a JSON response with a status code of 500 and the following format:

{
"message": "Internal server error",
"status": "Error",
"error": <the error object>
}
*/

const placeOrder = async (req, res) => {
    const { userId, products, shippingAddress, paymentMethod } = req.body;

    if (!userId || !products || !shippingAddress || !paymentMethod) {
        return res.status(400).json({
            message: "Missing required fields",
            status: "Error"
        });
    }

    try {
        //Write your code here
        const order = new Order({
            user:userId,
            products:products.map(item=>({
                product:item.productId,
                quantity:item.quantity
            })),
            shippingAddress,
            paymentMethod
        })

        let totalPrice = 0;
        for(const item of products){
            const prod = await Product.findById(item.product);
            totalPrice +=prod.price * item.quantity;
        }
        order.totalPrice = totalPrice;

        await order.save();
        
        const cart = await Cart.findOne({user:userId});
        if(cart){
            await cart.updateOne({
                $pull:{
                    products:{
                        product:{$in:products.map(item=>item.productId)}
                    }
                }
            })
        }

        return res.status(200).json({
            message:'Order placed successfully',
            status:'Success',
            order
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
            status: "Error",
            error: err
        });
    }
};

const showAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('products.product');
        return res.status(200).json({
            message: 'All orders fetched successfully',
            status: 'Success',
            orders,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
            status: 'Error',
            error: err,
        });
    }
};

module.exports = { placeOrder, showAllOrders }

/*
Input: 
{
  "userId": "614f3a3e86c7b0f9b8f0fde1",
  "products": [
    {
      "product": "614f3a3e86c7b0f9b8f0fde2",
      "quantity": 2
    },
    {
      "product": "614f3a3e86c7b0f9b8f0fde3",
      "quantity": 1
    }
  ],
  "shippingAddress": "123 Main St",
  "paymentMethod": "credit card"
}
*/

/*
Output: 
{
    "message": "Order placed successfully",
    "status": "Success",
    "order": {
        "totalPrice": 4497,
        "status": "pending",
        "_id": "640ed9f8685a0739ddc1c74a",
        "user": "640ed1cab8f0599317a7b79a",
        "products": [
            {
                "quantity": 2,
                "_id": "640ed9f8685a0739ddc1c74b"
            },
            {
                "quantity": 1,
                "_id": "640ed9f8685a0739ddc1c74c"
            }
        ],
        "shippingAddress": "123 Main St",
        "paymentMethod": "credit card",
        "createdAt": "2023-03-13T08:08:30.959Z",
        "updatedAt": "2023-03-13T08:08:30.959Z",
        "__v": 0
    }
}
*/