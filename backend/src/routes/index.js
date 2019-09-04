require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const routes = require('express').Router();;

routes.get('/', (req, res) => {
    return res.send('Seja bem vindo!'+process.env.NUMBERSERVER);
});

module.exports = routes;