const mongoose = require('mongoose');
const { Schema } = mongoose;

/*
Build an order model with a MongoDB database using Mongoose, which should have the following requirements:

Each order must belong to a user: Each order should have a reference to a user by their ObjectId. This can be achieved by adding a 'user' field of type 'mongoose.Schema.Types.ObjectId' and setting the 'ref' property to 'User'. This field should be marked as required.

Each order must contain products: An order can contain one or more products. To implement this, create a 'products' field of type 'array' in the schema, which should contain sub-documents with fields for 'product' and 'quantity'. 'product' should be a reference to the 'Product' model using the 'ref' property, and 'quantity' should be a number indicating the quantity of that product in the order.

Each order must have a total price: The total price of all the products in the order should be calculated and stored in a 'totalPrice' field of type 'Number'. This field should be marked as required and should have a default value of 0. It should also have a validation function to ensure that the value is always positive.

Each order must have a status: The status of the order should be represented by a 'status' field of type 'String'. This field should have a default value of 'pending', and should have an 'enum' property with the possible values of 'pending', 'paid', 'shipped', and 'delivered'.

Each order must have a shipping address: The shipping address for the order should be stored in a 'shippingAddress' field of type 'String'. This field should be marked as required.

Each order must have a payment method: The payment method for the order should be stored in a 'paymentMethod' field of type 'String'. This field should have an 'enum' property with the possible values of 'cash', 'credit card', 'debit card', 'upi' and should be marked as required.

Each order must have timestamps: The creation and last update timestamps for the order should be automatically recorded by Mongoose, using the 'timestamps' option in the schema.
*/

const orderSchema = new Schema({
  //Write your code here
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  products:[
    {
      product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
      },
      quantity:{
        type:Number,
        required:true,
        default:1,
        validate(value){
          if(value <1){
            throw new Error('Quantity must be a positive number');
          } 
        }
      }
    }
  ],
  totalPrice:{
    type:Number,
    required:true,
    default:0,
    validate(value){
      if(value<0){
        throw new Error('Total Price must be a positive number')
      }
    }
  },
  status:{
    type:String,
    enum:['pending','processing','shipped','delivered'],
    default:'pending'
  },
  shippingAddress:{
    type:String,
    required:true
  },
  paymentMethod:{
    type:String,
    enum:['cash','credit card','debit card','upi'],
    required:true
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;