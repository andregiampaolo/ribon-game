require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const mongoose = require('mongoose');

module.exports = {
    mongoose,
    connect: () => {
        mongoose.Promise = Promise;
        mongoose.connect(
            process.env.DB_CONNECTION,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }
        );
    },
    disconnect: (done) => {
        mongoose.disconnect(done);
    },
};