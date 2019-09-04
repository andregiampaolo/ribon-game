const mongoose = require('mongoose');

const CollectedCoinSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});
const CollectedCoin = mongoose.model('CollectedCoin', CollectedCoinSchema);
module.exports = CollectedCoin;