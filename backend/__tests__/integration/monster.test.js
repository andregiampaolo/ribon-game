const request = require('supertest');
const app = require('../../src/app');
const Monster = require('../../src/models/monster');

const mongoose = require('mongoose');



const createMonster = async () => {
    monster = await Monster.create({"name": "Loki"});
};

describe('Monster', () => {

    beforeAll(async () => {
        await Promise.all([
            Monster.deleteMany({}),
        ]);
        await createMonster();
    });

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    it('Test if create a monster on database', async () => {
        const monster = await Monster.create({"name": "Coringa"});
        expect(typeof monster).toBe("object");
    });

    it('Test if amount of monsters increse when create a monster on database', async () => {
        await Monster.deleteMany({});
        const amountMonsterBefore = await Monster.countDocuments();
        await Monster.create({"name": "Coringa"});
        const amountMonsterAfter = await Monster.countDocuments();
        expect(amountMonsterBefore).toBe(amountMonsterAfter-1);
    });

    it("Test list monster", async () => {
        const response = await request(app)
            .get('/monster/list');
        expect(response.status).toBe(200);
    });


});
