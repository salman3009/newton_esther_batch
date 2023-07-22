/* Product Controllers */

const Product = require('../models/Product');

const searchProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, category, sort, minPrice, maxPrice } = req.query;
        const query = {};
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }
        if (category) {
            query.category = category;
        }
        if (minPrice && maxPrice) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice) {
            query.price = { $gte: minPrice };
        } else if (maxPrice) {
            query.price = { $lte: maxPrice };
        }
        const sortOrder = sort === "asc" ? "price" : "-price";
        const products = await Product.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(sortOrder);
        const count = await Product.countDocuments(query);
        res.status(200).json({
            status: "success",
            data: {
                count,
                products,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Products Not Found",
            status: "Error",
            error: err,
        });
    }
};


// Fetches the product with the given ID
const getProductByID = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                status: "Error",
                message: "Product Not Found",
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                product,
            },
        });
    } catch (err) {
        res.status(400).json({
            message: "Product Fetching Failed",
            status: "Error",
            error: err,
        });
    }
};

// Creates a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name Missing",
                status: "Error",
            });
        }
        if (!description) {
            return res.status(400).json({
                message: "Description Missing",
                status: "Error",
            });
        }
        if (!price) {
            return res.status(400).json({
                message: "Price Missing",
                status: "Error",
            });
        }
        if (!category) {
            return res.status(400).json({
                message: "Category Missing",
                status: "Error",
            });
        }

        const new_product = new Product({ name, description, price, category });
        await new_product.save();

        res.status(201).json({
            status: "success",
            data: {
                product: new_product,
            },
        });
    } catch (err) {
        res.status(400).json({
            message: "Product Creation Failed",
            status: "Error",
            error: err,
        });
    }
};

// Updates product details with the given ID
const updateProduct = async (req, res) => {
    try {
        const { updatedData } = req.body;

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: updatedData }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found",
                status: "Error",
            });
        }
        // console.log(product);

        const updatedProduct = await Product.findById(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Product Updated Successfully",
            data: {
                updatedProduct,
            },
        });
    } catch (err) {
        // console.log(err);
        res.status(400).json({
            message: "Product Updation Failed",
            status: "Error",
            error: err,
        });
    }
};

// Deletes the product with the given ID.
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                status: "Error",
                message: "Product Not Found",
            });
        }
        res.status(200).json({
            status: "success",
            data: null,
            message: `Product {product._id} deleted successfully`,
        });
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: err.message,
        });
    }
};

module.exports = { searchProducts, getProductByID, createProduct, updateProduct, deleteProduct };
