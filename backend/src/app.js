const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./database');
const cors = require('cors');

class AppController {
    constructor(){
        this.express = express();

        this.middlewares();
        this.routes();
        this.database();
    }

    middlewares(){
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended : false}));
    }

    routes(){
        this.express.use('/',require('./routes'));
        this.express.use('/user',require('./routes/user'));
        this.express.use('/collected-coin',require('./routes/collected-coin'));
        this.express.use('/death',require('./routes/death'));
        this.express.use('/killed-monster',require('./routes/killed-monster'));
        this.express.use('/monster',require('./routes/monster'));
        this.express.use('/user-trophy',require('./routes/user-trophy'));
        
    }

    database(){
        mongoose.connect()
    }
}

module.exports = new AppController().express;