const Death = require('../models/death');
const UserTrohpyService = require('../services/user-trophy-service');

module.exports = {
    async die(req, res){
        try{
            const userId = req.userId;
            const die = await Death.create({user: userId});
            await UserTrohpyService.giveDeathTrophyIfDeservers(userId);
            return res.send(die);
        }catch(err){
            return res.status(400).send({name: err.name, message: err.message});
        }
    }
};