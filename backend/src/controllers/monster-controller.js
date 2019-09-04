const Monster = require('../models/monster');

module.exports = {
    async list(req, res){
        try{
            const monster = await Monster.find({});
            return res.send(monster);
        }catch(err){
            return res.status(400).send({name: err.name, message: err.message});
        }
    }
};