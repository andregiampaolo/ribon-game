require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

class AppController {
    constructor(){
        this.express = express();

        this.middlewares();
        this.routes();
        this.database();
    }

    middlewares(){
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended : false}));
    }

    routes(){
        this.express.use('/user',require('./routes/user'));
        this.express.use('/collected-coin',require('./routes/collected-coin'));
        this.express.use('/death',require('./routes/death'));
        this.express.use('/killed-monster',require('./routes/killed-monster'));
    }

    database(){
        mongoose.connect(
            process.env.DB_CONNECTION,
            { useNewUrlParser: true, useCreateIndex: true }
        );
    }
}

module.exports = new AppController().express;