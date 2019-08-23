const User = require('../models/user');

module.exports = {
    async register(req, res){
        try{
            const { email } = req.body;
            
            if(await User.findOne( { email : email }))
                return res.status(400).send({error: 'User alredy exists'});
            
            const user = await User.create(req.body);
            user.password = undefined;
            return res.send({ user });
        }catch(err){
            return res.status(400).send({error: 'Registration failed'});
        }
    }
};