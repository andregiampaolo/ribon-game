require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    totalCollectedCoins:{
        type: Number,
        required: true,
        default:0
    },
    totalDeaths:{
        type: Number,
        required: true,
        default:0
    },
    totalKilledMonster:{
        type: Number,
        required: true,
        default:0
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

UserSchema.statics.generateToken = function(params = {}) {
    return jwt.sign(params, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;