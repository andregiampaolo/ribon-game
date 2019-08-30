const User = require('../models/user');
const Trophy = require('../models/trophy');
const UserTrophy = require('../models/user-trophy');

const UserTrophyService = {

    async increaseUserTotalField(totalField, userId, valueIncrease){
        return await User.findByIdAndUpdate(userId,
            { $inc: { totalField: valueIncrease } },
            { new: true },
            opts
        );
    },
    async getTrophyEarnedByValue(action, value){
        return await Trophy.find({
            action: action, 
            value: { $lt: value }
        })
        .select('id')
        .sort({value: -1})
        .limit(1);
    },
    async userHasTrophy(user, trophy){
        return await UserTrophy.find({user:user.id, trophy:trophy[0].id});
    },
    async giveTrohpyToUser(userId, trophy){
        return await UserTrophy.create({user:userId, trophy: trophy[0].id}, opts);
    }
};

module.exports = UserTrophyService;