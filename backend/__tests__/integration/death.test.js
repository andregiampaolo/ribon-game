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
            Death.deleteMany({}),
            UserTrophy.deleteMany({}),
            Trophy.deleteMany({}),
        ]);
        await Trophy.create({'action' : 'death', 'value': 1});
    });

    it('Test if user die', async () => {
        const user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const token = await User.generateAuthorizationToken({ id: user.id });
        const response = await request(app)
            .post('/death/die')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });

    it('Test if number of deaths increase on database, when user die', async () => {

        const amountDeathBefore = await Death.countDocuments();
        const user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const token = await User.generateAuthorizationToken({ id: user.id });
        await request(app)
            .post('/death/die')
            .set('Authorization', 'Bearer ' + token);

        const amountDeathAfter = await Death.countDocuments();

        expect(amountDeathBefore).toBe(amountDeathAfter-1);
    });

    it("Test if user can't die without authorization token", async () => {
        const response = await request(app)
            .post('/death/die');
        expect(response.status).toBe(401);
    });

    it('Test if total deaths of user increase', async () => {
        const userBefore = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const totalDeathsBefore = userBefore.totalDeaths;
        const token = await User.generateAuthorizationToken({ id: userBefore.id });
        await request(app)
            .post('/death/die')
            .set('Authorization', 'Bearer ' + token);
        const userAfter = await User.findById(userBefore._id);
        const totalDeathsAfter = userAfter.totalDeaths;
        expect(totalDeathsBefore).toBe((totalDeathsAfter-1));
    });

    it('Test if amounth of user death trophy increases', async () => {
        const userBefore = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const quantityUserTrophiesBefore = await UserTrophy.countDocuments({user: userBefore._id});
        const authorizationToken = await User.generateAuthorizationToken({ id: userBefore.id });
        await request(app)
            .post('/death/die')
            .set('Authorization', 'Bearer ' + authorizationToken);

        const quantityUserTrophiesAfter = await UserTrophy.countDocuments({user: userBefore._id});
        expect(quantityUserTrophiesBefore).toBe((quantityUserTrophiesAfter-1));
    });

    it("Test if user can't win a death trophy without trophies on database", async () => {
        await Trophy.deleteMany({});
        const user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const token = await User.generateAuthorizationToken({ id: user.id });
        const response = await request(app)
            .post('/death/die')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(400);
    });

});



