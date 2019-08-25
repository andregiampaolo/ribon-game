const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ error: 'No token provider' });
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2){
        return res.status(401).send({ error: 'Token error'});
    }

    const [scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(401).send({error: 'Token invalid'});
        }
        req.userId = decoded.id
        return next();
    });
};