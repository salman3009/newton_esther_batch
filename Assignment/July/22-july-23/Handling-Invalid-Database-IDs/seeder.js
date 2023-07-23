const User = require('./models/User');
const users = require('./data/users');

async function seedWithDummyData() {
    try {
        // CLEAR DB
        await User.deleteMany({});

        for (let user of users) {
            await User.create(user);
        }

        console.log(`users seeded successfully`);
    } catch (error) {
        console.error(`Error seeding data: ${error}`);
        process.exit(1);
    }
}

module.exports = seedWithDummyData