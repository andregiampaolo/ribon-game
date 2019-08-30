const Monster = require('../models/monster');
const mongoose = require('../database');

mongoose.connect();

try {
    const monsters = [{"name":"Loki"},{"name":"Coringa"},{"name":"Hannibal Lecter" }];
    monsters.map(monster => Monster.create(monster));
    console.log('Monsters created');
    return true;
} catch (error) {
    console.log('Error: ', error);
    return false;
}