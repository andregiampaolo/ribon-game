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

const insertMonstersOnDatabase = async () => {
    return await Promise.all( monsters.map(monster => Monster.create(monster)) );
}

const dropMonsterCollection = async () =>{
    return await Promise.all([
        Monster.deleteMany({})
    ]);
}

module.exports = {
    seed: async () => {
        try {
            const db = await connectDb();
            if(db){
                await dropMonsterCollection();
                const result = await insertMonstersOnDatabase();
                if(result){
                    console.log('Monstros criados');
                    return true;
                } else {
                    throw 'Não foi possível criar os montros';
                }
            }
        } catch (error) {
            throw error;
        }
    }
};