const User = require('../models/user');

const UserService = {
    async increaseUserTotalField(fieldNameDb, userId, valueIncrease){
        const increase = {};
        increase[fieldNameDb] = valueIncrease;
        return await User.findByIdAndUpdate(userId,
            { $inc: increase},
            { new: true }
        );
    }
}

module.exports = UserService;
