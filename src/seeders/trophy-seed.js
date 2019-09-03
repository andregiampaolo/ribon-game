const Trophy = require('../models/trophy');
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

const trophies = [
    {
        "action": "collected_coin",
        "value": 1
    },
    {
        "action": "collected_coin",
        "value": 100
    },
    {
        "action": "collected_coin",
        "value": 1000
    },
    {
        "action": "collected_coin",
        "value": 10000
    },
    {
        "action": "collected_coin",
        "value": 100000
    },
    {
        "action": "killed_monster",
        "value": 1
    },
    {
        "action": "killed_monster",
        "value": 100
    },
    {
        "action": "killed_monster",
        "value": 1000
    },
    {
        "action": "killed_monster",
        "value": 10000
    },
    {
        "action": "killed_monster",
        "value": 100000
    },
    {
        "action": "death",
        "value": 1
    },
    {
        "action": "death",
        "value": 10
    },
    {
        "action": "death",
        "value": 25
    },
    {
        "action": "death",
        "value": 50
    },
    {
        "action": "death",
        "value": 100
    },
];


const insertData = async () => {
    return await Promise.all( trophies.map(async trophy => await Trophy.create(trophy) ) );
}



const seed = async () => {
    const db = await connectDb();
    if(db){
        const result = await insertData();
        if(result){
            console.log('Troféus criados');
            process.exit();
        }
        console.log('Erro ao criar os troféus');
    }
}

seed();