const request = require('supertest');
const app = require('../../src/app');
const KilledMonster = require('../../src/models/killed-monster');
const User = require('../../src/models/user');
const Monster = require('../../src/models/monster');
const Trophy = require('../../src/models/trophy');
const UserTrophy = require('../../src/models/user-trophy');

const mongoose = require('mongoose');


let user = null;
let authorizationToken = null;
let monster = null;

const createUser = async () => {
    user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
};

const createMonster = async () => {
    monster = await Monster.create({"name": "Loki"});
};

const generateAuthorizationToken = async () => {
    authorizationToken = await User.generateAuthorizationToken({ id: user.id });
}


describe('Killed Monster', () => {

    beforeAll(async () => {
        await Promise.all([
            User.deleteMany({}),
            Monster.deleteMany({}),
            Trophy.deleteMany({}),
            UserTrophy.deleteMany({}),
        ]);
        await Trophy.create({'action' : 'killed_monster', 'value': 1});
        await createUser();
        await generateAuthorizationToken();
        await createMonster();
    });


    afterAll((done) => {
        mongoose.disconnect(done);
    });

    it('Test killed a monster', async () => {
        const response = await request(app)
            .post('/killed-monster/killed')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send({monsterId: monster.id});
        expect(response.status).toBe(200);
    });

    it('Test if amount number of kills on database, when user kill a monster', async () => {
        const amountKillBefore = await KilledMonster.countDocuments();
        await request(app)
            .post('/killed-monster/killed')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send({monsterId: monster.id});
        const amountKillAfter = await KilledMonster.countDocuments();

        expect(amountKillBefore).toBe(amountKillAfter-1);
    });

    it("Test if user can't kill a monster without send an authorization token", async () => {
        const response = await request(app)
            .post('/killed-monster/killed')
            .send({monsterId: monster.id});
        expect(response.status).toBe(401);
    });

    it("Test if user can't kill a monster without send a monster", async () => {
        const response = await request(app)
            .post('/killed-monster/killed')
            .set('Authorization', 'Bearer ' + authorizationToken);
        expect(response.status).toBe(400);
    });

    it('Test if amounth of total killed monster increase when user kill a monster', async () => {
        const userBefore = await User.findByIdAndUpdate(user._id,{'totalKilledMonster':0}, { new: true });
        const totalKilledMonsterBefore = userBefore.totalKilledMonster;
        await request(app)
            .post('/killed-monster/killed')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send({monsterId: monster.id});
        const userAfterKilledMonster = await User.findById(userBefore._id);
        const totalKilledMonsterAfter = userAfterKilledMonster.totalKilledMonster;
        expect(totalKilledMonsterBefore).toBe((totalKilledMonsterAfter-1));
    });

    it("Test if user can't killed a mosnter when monster not founded", async () => {
        const response = await request(app)
            .post('/killed-monster/killed')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send({monsterId: null});

        expect(response.status).toBe(400);
    });

    it('Test if killed monster trophy is given to user when they kill a monster', async () => {
        await UserTrophy.deleteMany({});
        const quantityKilledMonsterTrophiesBefore = await UserTrophy.countDocuments({user: user._id});
        await request(app)
            .post('/killed-monster/killed')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send({monsterId: monster.id});
        const quantityKilledMonsterTrophiesAfter = await UserTrophy.countDocuments({user: user._id});
        expect(quantityKilledMonsterTrophiesBefore).toBe((quantityKilledMonsterTrophiesAfter-1));
    });

    it("Test if user can't win killed monster trophy without trophies on database", async () => {
        await Trophy.deleteMany({});
        const response = await request(app)
            .post('/killed-monster/killed')
            .set('Authorization', 'Bearer ' + authorizationToken)
            .send({monsterId: monster.id});
        expect(response.status).toBe(400);
    });

    it('Test killed a monster on database', async () => {
        const killed = await KilledMonster.create({user: user.id, monster: monster.id});
        expect(typeof killed).toBe("object");
    });

});
