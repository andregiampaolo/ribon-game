const CollectedCoin = require('../models/collected-coin');
const UserTrohpyService = require('../services/user-trophy-service');

module.exports = {
    async collect(req, res) {
        try {

            const userId = req.userId;
            const { value } = req.body;
            if (value == undefined || value <= 0 || value == null) {
                return res.status(400).send({ error: 'Value of coin not informed' });
            }

            const totalCollectedCoins = 'totalCollectedCoins';
            const valueIncrease = value;
            const collectedCoin = await CollectedCoin.create({ user: userId, value });
            const user = await UserTrohpyService.increaseUserTotalField(totalCollectedCoins, userId, valueIncrease);
            const trophy = await UserTrohpyService.getTrophyEarnedByValue('collected_coin', user.totalCollectedCoins);
            const userHasTrophy = await UserTrohpyService.userHasTrophy(user, trophy);

            if(!userHasTrophy)
                await UserTrohpyService.giveTrohpyToUser(userId, trophy);
            
            return res.send({collectedCoin});

        } catch (err) {
            return res.status(400).send({ error: 'Collected failed' });
        }
    },
    async list(req, res) {
        try {
            const collectedCoins = await CollectedCoin.find({});
            return res.send(collectedCoins);
        } catch (error) {
            return res.status(400).send({ error: 'List failed' });
        }
    }
};