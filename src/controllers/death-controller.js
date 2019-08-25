const Death = require('../models/death');

module.exports = {
    async die(req, res){
        try{
            const die = await Death.create({user: req.userId});
            return res.send(die);
        }catch(err){
            return res.status(400).send({error: 'Die failed'});
        }
    }
};