const UserService = require('./user-service');
const TrophyService = require('./trophy-service');
const UserTrophy = require('../models/user-trophy');

const UserTrophyService = {

    async giveKilledMonsterTrophyIfDeservers(userId){
        try {
            const fieldNameDb = 'totalKilledMonster';
            const valueIncrease = 1;
            const action = 'killed_monster';
            await UserTrophyService.giveTrophyIfDeservers(userId, fieldNameDb, action, valueIncrease);
            return true;
        } catch (error) {
            throw error;
        }
    },
    async giveCollectedCoinTrophyIfDeservers(userId, valueIncrease){
        try {
            const fieldNameDb = 'totalCollectedCoins';
            const action = 'collected_coin';
            await UserTrophyService.giveTrophyIfDeservers(userId, fieldNameDb, action, valueIncrease);
            return true;
        } catch (error) {
            throw error;
        }
    },

    async giveDeathTrophyIfDeservers(userId){
        try {
            const fieldNameDb = 'totalDeaths';
            const valueIncrease = 1;
            const action = 'death';
            await UserTrophyService.giveTrophyIfDeservers(userId, fieldNameDb, action, valueIncrease);
            return true;
        } catch (error) {
            throw error;
        }
    },

    async giveTrophyIfDeservers(userId, fieldNameDb, action, valueIncrease){
        try {
            const user = await UserService.increaseUserTotalField(fieldNameDb, userId, valueIncrease);
            const trophy = await TrophyService.getTrophyEarnedByValue(action, user[fieldNameDb]);
            const userHasTrophy = await UserTrophyService.userHasTrophy(userId, trophy);

            if(userHasTrophy.length == 0)
                await UserTrophyService.giveTrohpyToUser(userId, trophy);
            return true;

        } catch (error) {
            throw error;
        }

    },

    async userHasTrophy(userId, trophy){
        return await UserTrophy.find({user:userId, trophy:trophy[0].id});
    },
    async giveTrohpyToUser(userId, trophy){
        return await UserTrophy.create({user:userId, trophy: trophy[0].id});
    }
};

module.exports = UserTrophyService;