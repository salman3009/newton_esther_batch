const fs = require("fs");
const User = require('./models/User');
const Product = require('./models/Product');

const users_list = JSON.parse(fs.readFileSync(`${__dirname}/./data/users.json`));
const products_list = JSON.parse(fs.readFileSync(`${__dirname}/./data/products.json`));

async function seedWithDummyData() {
    try {
        // CLEAR DB
        await User.deleteMany({});
        await Product.deleteMany({});

        const createdUsers = await User.insertMany(users_list); //15
        const createdProducts = await Product.insertMany(products_list); //20

        console.log(`${createdUsers.length} users and ${createdProducts.length} products created.`);
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
}

module.exports = seedWithDummyData