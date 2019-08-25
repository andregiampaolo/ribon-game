const express = require('express');
const bodyParser = require('body-parser');

class AppController {
    constructor(){
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended : false}));
    }

    routes(){
        this.express.use('/user',require('./routes/user'));
        this.express.use('/collected-coin',require('./routes/collected-coin'));
        this.express.use('/death',require('./routes/death'));
    }
}

module.exports = new AppController().express;