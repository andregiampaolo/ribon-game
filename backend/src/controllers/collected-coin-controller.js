const CollectedCoin = require('../models/collected-coin');
const UserTrohpyService = require('../services/user-trophy-service');

const CollectedCoinException = function(message) {
    this.message = message;
    this.name = "CollectedCoinException";
}

const validateValueOfCoin = async function(value){
    if (value == undefined || value == null) {
        throw new CollectedCoinException('Value of coin not informed');
    } else if (value <= 0) {
        throw new CollectedCoinException('Value of coin invalid');
    }
};

module.exports = {
    async collect(req, res) {
        try {

            const userId = req.userId;
            const { value } = req.body;
            
            await validateValueOfCoin(value);
            
            const collectedCoin = await CollectedCoin.create({ user: userId, value });
            await UserTrohpyService.giveCollectedCoinTrophyIfDeservers(userId, value);
            
            return res.send({collectedCoin});

        } catch (err) {
            return res.status(400).send({name: err.name, message: err.message});
        }
    },
    async list(req, res) {
        try {
            const collectedCoins = await CollectedCoin.find({});
            return res.send(collectedCoins);
        } catch (error) {
            return res.status(400).send({name: err.name, message: err.message});
        }
    }
};