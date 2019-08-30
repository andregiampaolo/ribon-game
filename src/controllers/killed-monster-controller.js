const KilledMonster = require('../models/killed-monster');
const UserTrohpyService = require('../services/user-trophy-service');

module.exports = {
    async killed(req, res){
        try{
            const userId = req.userId;
            const {monsterId} = req.body;


            const killed = await KilledMonster.create({user: userId, monster: monsterId});
            const fieldIncrease = 'totalKilledMonster';
            const valueIncrease = 1;
            const user = await UserTrohpyService.increaseUserTotalField(fieldIncrease, userId, valueIncrease);
            const trophy = await UserTrohpyService.getTrophyEarnedByValue('killed_monster', user.totalKilledMonster);
            const userHasTrophy = await UserTrohpyService.userHasTrophy(user, trophy);

            if(userHasTrophy.length == 0)
                await UserTrohpyService.giveTrohpyToUser(userId, trophy);

            return res.send(killed);
            
        }catch(err){
            console.log(err);
            return res.status(400).send({error: 'Killed failed'});
        }
    }
};