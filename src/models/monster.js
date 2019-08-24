const mongoose = require('../database');

const MonsterSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});
const Monster = mongoose.model('Monster', MonsterSchema);
module.exports = Monster;