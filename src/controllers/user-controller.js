const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

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
    },
    async list(req, res){
        try {
            const users = await User.find({});
            return res.json(users);
        } catch (error) {
            return res.status(400).send({error: 'List failed'});
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

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
                expiresIn: 86400
            } );

            user.password = undefined;
            res.send({user, token});

        } catch (error) {
            res.status(400).send({error: 'Authenticate failed'});
        }
    }
};