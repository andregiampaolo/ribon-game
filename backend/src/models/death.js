const mongoose = require('mongoose');

const DeathSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});
const Death = mongoose.model('Death', DeathSchema);
module.exports = Death;