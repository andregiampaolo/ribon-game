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
    }
}

module.exports = new AppController().express;