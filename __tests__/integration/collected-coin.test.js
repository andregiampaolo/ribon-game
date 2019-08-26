const request = require('supertest');
const app = require('../../src/app');
const CollectedCoin = require('../../src/models/collected-coin');
const User = require('../../src/models/user');
const mongoose = require('mongoose');

describe('Collected Coin', () => {

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany({})
        ]);
    });

    it('Test collect a coin on api', async () => {
        const user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const token = await User.generateToken({ id: user.id });
        const coin = {value: 50};
        const response = await request(app)
            .post('/collected-coin/collect')
            .set('Authorization', 'Bearer ' + token)
            .send(coin);
        expect(response.status).toBe(200);
    });

    it('Test collect a coin on database', async () => {
        const user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const coin = {value: 50, user: user.id, };
        const collectedCoin = await CollectedCoin.create(coin);
        expect(typeof collectedCoin).toBe("object");
    });

});
