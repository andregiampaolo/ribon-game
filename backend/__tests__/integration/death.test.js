const request = require('supertest');
const app = require('../../src/app');
const Death = require('../../src/models/death');
const User = require('../../src/models/user');
const Trophy = require('../../src/models/trophy');
const UserTrophy = require('../../src/models/user-trophy');
const mongoose = require('mongoose');

describe('Death', () => {

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany({}),
            Trophy.create({'action' : 'death', 'value': 1})
        ]);
    });
    
    it('Test die', async (user) => {

        const user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const token = await User.generateToken({ id: user.id });
        const response = await request(app)
            .post('/death/die')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });

    it('Test increase total deaths', async () => {
        const userBefore = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const totalDeathsBefore = userBefore.totalDeaths;
        const token = await User.generateToken({ id: userBefore.id });
        await request(app)
            .post('/death/die')
            .set('Authorization', 'Bearer ' + token);
        const userAfter = await User.findById(userBefore._id);
        const totalDeathsAfter = userAfter.totalDeaths;
        expect(totalDeathsBefore).toBe((totalDeathsAfter-1));
    });

    it('Test death trophy is given to the user when they die', async () => {
        const userBefore = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const quantityUserTrophiesBefore = await UserTrophy.countDocuments({user: userBefore._id});
        const authorizationToken = await User.generateToken({ id: userBefore.id });
        await request(app)
            .post('/death/die')
            .set('Authorization', 'Bearer ' + authorizationToken);

        const quantityUserTrophiesAfter = await UserTrophy.countDocuments({user: userBefore._id});
        expect(quantityUserTrophiesBefore).toBe((quantityUserTrophiesAfter-1));
    });

    it('Test die on database', async () => {
        const user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const death = await Death.create({user: user.id});
        expect(typeof death).toBe("object");
    });

});
