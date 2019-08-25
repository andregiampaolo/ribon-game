const mongoose = require('mongoose');

const KilledMonsterSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    monster:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Monster',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('KilledMonster', KilledMonsterSchema);