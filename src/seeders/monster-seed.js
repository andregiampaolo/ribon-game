const Monster = require('../models/monster');

try {
    const monsters = [{"name":"Loki"},{"name":"Coringa"},{"name":"Hannibal Lecter" }];
    monsters.map(monster => Monster.create(monster));
} catch (error) {
    console.log('Monsters created');    
}

