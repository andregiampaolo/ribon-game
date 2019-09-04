const mongoose = require('mongoose');

const TrophySchema = new mongoose.Schema({
    action:{
        type: String,
        required: true,
        enum: ['killed_monster', 'collected_coin', 'death']
    },
    value:{
        type: Number,
        required: true
    }
});
const Trophy = mongoose.model('Trophy', TrophySchema);
module.exports = Trophy;