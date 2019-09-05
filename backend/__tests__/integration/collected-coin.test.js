const request = require('supertest');
const app = require('../../src/app');
const CollectedCoin = require('../../src/models/collected-coin');
const User = require('../../src/models/user');
const Trophy = require('../../src/models/trophy');
const UserTrophy = require('../../src/models/user-trophy');

const mongoose = require('mongoose');


const coin = {value: 50};
let user = null;
let authorizationToken = null;

const createUser = async () => {
    user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
};

const generateAuthorizationToken = async () => {
    authorizationToken = await User.generateAuthorizationToken({ id: user.id });
}

describe('Collected Coin', () => {

    beforeAll(async () => {
        await Promise.all([
            User.deleteMany({}),
            CollectedCoin.deleteMany({}),
            Trophy.deleteMany({}),
            UserTrophy.deleteMany({}),
        ]);
        await Trophy.create({'action' : 'collected_coin', 'value': 1});
        await createUser();
        await generateAuthorizationToken();
    });

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    it('Test collect a coin', async () => {
        const response = await request(app)
            .post('/collected-coin/collect')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send(coin);
        expect(response.status).toBe(200);
    });


    it('Test if amount number of collected coins on database, increase when user collec a coin', async () => {
        const amountCollectCoinBefore = await CollectedCoin.countDocuments();
        await request(app)
            .post('/collected-coin/collect')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send(coin);
        const amountCollectCoinAfter = await CollectedCoin.countDocuments();

        expect(amountCollectCoinBefore).toBe(amountCollectCoinAfter-1);
    });

    it("Test if user can't collect a coin without send an authorization token", async () => {
        const response = await request(app)
            .post('/collected-coin/collect')
            .send(coin);
        expect(response.status).toBe(401);
    });

    it("Test if user can't collect a coin without send a coin", async () => {
        const response = await request(app)
            .post('/collected-coin/collect')
            .set('Authorization', 'Bearer ' + authorizationToken);
        expect(response.status).toBe(400);
    });

    it('Test if amounth of total collected coins increase when user collect a coin', async () => {
        const userBefore = await User.findByIdAndUpdate(user._id,{'totalCollectedCoins':0}, { new: true });
        const totalCollectedCoinsBefore = userBefore.totalCollectedCoins;
        await request(app)
            .post('/collected-coin/collect')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send(coin);
        const userAfterCollectCoin = await User.findById(userBefore._id);
        const totalCollectedCoinsAfter = userAfterCollectCoin.totalCollectedCoins;
        expect(totalCollectedCoinsBefore).toBe((totalCollectedCoinsAfter-coin.value));
    });


    it("Test if user can't collect a coin with negative coin", async () => {
        const response = await request(app)
            .post('/collected-coin/collect')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send({value: -2});
        expect(response.status).toBe(400);
    });

    it("Test if user can't collect a coin without value", async () => {
        const response = await request(app)
            .post('/collected-coin/collect')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send({value: null});
        expect(response.status).toBe(400);
    });

    it("Test if user can't collect a coin with value equal zero", async () => {
        const response = await request(app)
            .post('/collected-coin/collect')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send({value: 0});
        expect(response.status).toBe(400);
    });

    it('Test if collected coins trophy is given to user when they collec a coin', async () => {
        await UserTrophy.deleteMany({});
        const quantityCollectedCoinsTrophiesBefore = await UserTrophy.countDocuments({user: user._id});
        await request(app)
            .post('/collected-coin/collect')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send(coin);
        const quantityCollectedCoinsTrophiesAfter = await UserTrophy.countDocuments({user: user._id});
        expect(quantityCollectedCoinsTrophiesBefore).toBe((quantityCollectedCoinsTrophiesAfter-1));
    });

    it("Test if user can't win collect coin trophy without trophies on database", async () => {
        await Trophy.deleteMany({});
        const response = await request(app)
            .post('/collected-coin/collect')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send(coin);
        expect(response.status).toBe(400);
    });

    it("Test list collect coins", async () => {
        const response = await request(app)
            .get('/collected-coin/list')
            .set('Authorization', 'Bearer ' + authorizationToken);
        expect(response.status).toBe(200);
    });

    it('Test collect a coin on database', async () => {
        coin['user'] = user.id;
        const collectedCoin = await CollectedCoin.create(coin);
        expect(typeof collectedCoin).toBe("object");
    });

});
