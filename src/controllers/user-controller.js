const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const UserException = function(message) {
    this.message = message;
    this.name = "UserException";
}

const userIsDuplicated = async function(email){
    if(await User.findOne( { email }))
        throw new UserException('User alredy exists');
};

module.exports = {

    async register(req, res){
        try{
            const { email } = req.body;

            await userIsDuplicated(email);
            
            const user = await User.create(req.body);
            user.password = undefined;
            
            return res.send({ 
                user,
                token: User.generateToken({ id: user.id })
            });
        }catch(err){
            return res.status(400).send({name: err.name, message: err.message});
        }
    },
    async list(req, res){
        try {
            const users = await User.find({});
            return res.send(users);
        } catch (error) {
            return res.status(400).send({name: err.name, message: err.message});
        }
    },
    async authenticate(req, res){
        const { email, password } = req.body;
        try {

            const user = await User.findOne({email}).select('+password');

            if(!user){
                res.status(400).send({error: 'User or password invalid'});
            }

            if(! await bcryptjs.compare(password, user.password)){
                res.status(400).send({error: 'User or password invalid'});
            }

            user.password = undefined;
            res.send({
                user,
                token: User.generateToken({ id: user.id })
            });

        } catch (error) {
            return res.status(400).send({name: err.name, message: err.message});
        }
    }
};