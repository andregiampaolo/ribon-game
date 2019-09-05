const monsterSeed = require('./monster-seed');
const trophySeed = require('./trophy-seed');

const seed = async () => {
    try {
        await Promise.all([
            await trophySeed.seed(),
            await monsterSeed.seed(),
        ]);

        process.exit();
    } catch (error) {
        console.log(error);
    }
};

seed();