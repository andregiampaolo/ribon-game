const KilledMonster = require('../models/killed-monster');

module.exports = {
    async killed(req, res){
        try{
            const userId = req.userId;
            const {monsterId} = req.body;

            const killed = await KilledMonster.create({user: userId, monster: monsterId});
            return res.send(killed);
            
        }catch(err){
            console.log(err);
            return res.status(400).send({error: 'Killed failed'});
        }
    }
};