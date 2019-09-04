const UserTrophy = require('../models/user-trophy');
module.exports = {
    async userTrophies(req, res){
        try {
            const trophies = await UserTrophy.find({user: req.userId}).populate('trophy');
            return res.send(trophies);
        } catch (error) {
            return res.status(400).send({name: err.name, message: err.message});
        }
    }
};