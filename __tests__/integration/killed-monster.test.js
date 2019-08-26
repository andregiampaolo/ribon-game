const request = require('supertest');
const app = require('../../src/app');
const KilledMonster = require('../../src/models/killed-monster');
const User = require('../../src/models/user');
const Monster = require('../../src/models/monster');
const mongoose = require('mongoose');

describe('Killed Monster', () => {

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany({}),
            Monster.deleteMany({}),
        ]);
    });

    it('Test killed a monster on api', async () => {
        const user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const token = await User.generateToken({ id: user.id });
        const monster = await Monster.create({"name": "Loki"});

        const response = await request(app)
            .post('/killed-monster/killed')
            .set('Authorization', 'Bearer ' + token)
            .send({monsterId: monster.id});

        expect(response.status).toBe(200);
    });

    it('Test killed a monster on database', async () => {
        const user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const monster = await Monster.create({"name": "Loki"});
        const killed = await KilledMonster.create({user: user.id, monster: monster.id});
        expect(typeof killed).toBe("object");
    });

});
