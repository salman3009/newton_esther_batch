const fs = require("fs");
const User = require('./models/user.js');
const user_list = JSON.parse(fs.readFileSync(`${__dirname}/./data/users.json`));

async function seedWithDummyData() {
    try {
        // CLEAR Dawait Subject.deleteMany({});
        await User.deleteMany({});

        const createduser = await User.insertMany(user_list);

        console.log(`${createduser.length} user created.`);
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
}

module.exports = seedWithDummyData