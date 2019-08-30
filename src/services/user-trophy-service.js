const User = require('../models/user');
const Trophy = require('../models/trophy');
const UserTrophy = require('../models/user-trophy');

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
        return await Trophy.find({
            action: action, 
            value: { $lte: value }
        })
        .select('id')
        .sort({value: -1})
        .limit(1);
    },
    async userHasTrophy(user, trophy){
        return await UserTrophy.find({user:user.id, trophy:trophy[0].id});
    },
    async giveTrohpyToUser(userId, trophy){
        return await UserTrophy.create({user:userId, trophy: trophy[0].id});
    }
};

module.exports = UserTrophyService;