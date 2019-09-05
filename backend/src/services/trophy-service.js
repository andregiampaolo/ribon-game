const Trophy = require('../models/trophy');


const TrophyException = function(message) {
    this.message = message;
    this.name = "TrophyException";
}

const TrophyService = {
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
}

module.exports = TrophyService;
