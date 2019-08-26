const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./database');

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
        this.express.use('/',require('./routes'));
        this.express.use('/user',require('./routes/user'));
        this.express.use('/collected-coin',require('./routes/collected-coin'));
        this.express.use('/death',require('./routes/death'));
        this.express.use('/killed-monster',require('./routes/killed-monster'));
    }

    database(){
        mongoose.connect()
    }
}

module.exports = new AppController().express;