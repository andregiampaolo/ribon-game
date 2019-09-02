const Monster = require('../models/monster');
const mongoose = require('../database');

mongoose.connect();

try {
    const monsters = [{"name":"Loki"},{"name":"Coringa"},{"name":"Hannibal Lecter" }];
    monsters.map(async monster => await Monster.create(monster));
    console.log('Monsters created');
} catch (error) {
    console.log('Error: ', error);
}

process.exit();