const Trophy = require('../models/trophy');

try {
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
            "value": 1.000
        },
        {
            "action": "collected_coin",
            "value": 10.000
        },
        {
            "action": "collected_coin",
            "value": 100.000
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
            "value": 1.000
        },
        {
            "action": "killed_monster",
            "value": 10.000
        },
        {
            "action": "killed_monster",
            "value": 100.000
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
    trophies.map(trophy => Trophy.create(trophy));
    console.log('Trophies created');
    return true;
} catch (error) {
    console.log('Error: ', error);
    return false;
}