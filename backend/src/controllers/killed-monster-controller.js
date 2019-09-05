const KilledMonster = require('../models/killed-monster');
const UserTrohpyService = require('../services/user-trophy-service');
const Monster = require('../models/monster');

const KilledMonsterException = function(message) {
    this.message = message;
    this.name = "KilledMonsterException";
}

const validateMonsterExists = async function(monsterId){
    if(monsterId == null || monsterId == undefined){
        throw new KilledMonsterException('Monster not informed');
    }
    const monster = Monster.findById(monsterId);
    if(!monster){
        throw new KilledMonsterException('Monster not found');
    }
};

module.exports = {
    async killed(req, res){
        try{
            const userId = req.userId;
            const {monsterId} = req.body;

            await validateMonsterExists(monsterId);

            const killed = await KilledMonster.create({user: userId, monster: monsterId});
            await UserTrohpyService.giveKilledMonsterTrophyIfDeservers(userId);

            return res.send(killed);
            
        }catch(err){
            return res.status(400).send({name: err.name, message: err.message});
        }
    }
};