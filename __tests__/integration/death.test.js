const request = require('supertest');
const app = require('../../src/app');
const Death = require('../../src/models/death');
const User = require('../../src/models/user');
const Trophy = require('../../src/models/trophy');
const mongoose = require('mongoose');

describe('Death', () => {

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany({})
        ]);
        await Trophy.create({'action' : 'death', 'value': 1});
    });

    it('Test die on api', async () => {
        const user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const token = await User.generateToken({ id: user.id });
        const response = await request(app)
            .post('/death/die')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });

    it('Test die on database', async () => {
        const user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const death = await Death.create({user: user.id});
        expect(typeof death).toBe("object");
    });

});
