const User = require('../models/user');
const Trophy = require('../models/trophy');
const UserTrophy = require('../models/user-trophy');

const TrophyException = function(message) {
    this.message = message;
    this.name = "TrophyException";
}

const UserTrophyService = {

    async increaseUserTotalField(totalField, userId, valueIncrease){
        const increase = {};
        increase[totalField] = valueIncrease;
        return await User.findByIdAndUpdate(userId,
            { $inc: increase},
            { new: true }
        );
    },
    async getTrophyEarnedByValue(action, value){
        const trophy = await Trophy.find({
            action: action, 
            value: { $lte: value }
        })
        .select('id')
        .sort({value: -1})
        .limit(1);
        if(trophy.length == 0)
            throw new TrophyException("Trophy doesn't exists in database");
        return trophy;
    },
    async userHasTrophy(user, trophy){
        return await UserTrophy.find({user:user.id, trophy:trophy[0].id});
    },
    async giveTrohpyToUser(userId, trophy){
        return await UserTrophy.create({user:userId, trophy: trophy[0].id});
    }
};

module.exports = UserTrophyService;