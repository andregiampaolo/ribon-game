const Death = require('../models/death');
const UserTrohpyService = require('../services/user-trophy-service');

module.exports = {
    async die(req, res){
        try{
            const die = await Death.create({user: req.userId});
            const fieldIncrease = 'totalDeaths';
            const valueIncrease = 1;
            const user = await UserTrohpyService.increaseUserTotalField(fieldIncrease, userId, valueIncrease);
            const trophy = await UserTrohpyService.getTrophyEarnedByValue('deaths', user.totalDeaths);
            const userHasTrophy = await UserTrohpyService.userHasTrophy(user, trophy);

            if(!userHasTrophy)
                await UserTrohpyService.giveTrohpyToUser(userId, trophy);

            return res.send(die);
        }catch(err){
            return res.status(400).send({error: 'Die failed'});
        }
    }
};