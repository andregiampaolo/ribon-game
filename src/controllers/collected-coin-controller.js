require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const CollectedCoin = require('../models/collected-coin');

module.exports = {
    async collect(req, res){
        try{
            const userId = req.userId;
            const {value} = req.body;
            if(value == undefined || value <= 0 || value == null){
                return res.status(400).send({error: 'Value of coin not informed'});
            }
            const collectedCoin = await CollectedCoin.create({user: userId, value: value});
            return res.send(collectedCoin);
            
        }catch(err){
            return res.status(400).send({error: 'Collected failed'});
        }
    },
    async list(req, res){
        try {
            const collectedCoins = await CollectedCoin.find({});
            return res.send(collectedCoins);
        } catch (error) {
            return res.status(400).send({error: 'List failed'});
        }
    }
};