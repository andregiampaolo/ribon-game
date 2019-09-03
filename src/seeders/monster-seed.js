const Monster = require('../models/monster');
const mongoose = require('mongoose');

const connectDb = async () => {
    return await mongoose.connect(
        'mongodb://localhost:27017/ribon-game-dev',
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        },
        () => {
            return true;
        }
    ).catch(err => {
        console.log(err);
        return false;
    });
}
const monsters = [{"name":"Loki"},{"name":"Coringa"},{"name":"Hannibal Lecter" }];

const insertData = async () => {
    return await Promise.all( monsters.map(monster => Monster.create(monster)) );
}


const seed = async () => {
    const db = await connectDb();
    if(db){
        const result = await insertData();
        if(result){
            console.log('Monstros criados');
            process.exit();
        }
        console.log('Erro ao criar os monstros');
    }
}

seed();