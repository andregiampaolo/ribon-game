const request = require('supertest');
const app = require('../../src/app');
const Trophy = require('../../src/models/trophy');
const User = require('../../src/models/user');
const UserTrophy = require('../../src/models/user-trophy');
const mongoose = require('mongoose');

let user = null;
let authorizationToken = null;

const createUser = async () => {
    user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
};

const generateAuthorizationToken = async () => {
    authorizationToken = await User.generateAuthorizationToken({ id: user.id });
}


describe('Death', () => {

    beforeAll(async () => {
        await Promise.all([
            User.deleteMany({}),
            Trophy.deleteMany({}),
            UserTrophy.deleteMany({}),
        ]);
        await createUser();
        await generateAuthorizationToken();
    });

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    it('Test win trophy', async () => {
        const trophy = await Trophy.create({ "action": "collected_coin", "value": 1 });
        const userTrophy = {user: user.id, trophy: trophy.id};
        const winTrophy = await UserTrophy.create(userTrophy);
        expect(typeof winTrophy).toBe("object");
    });

    it("Test list user trophies", async () => {

        const response = await request(app)
            .get('/user-trophy/trophies')
            .set('Authorization', 'Bearer ' + authorizationToken);
        expect(response.status).toBe(200);
    });

});
























// const User = require('../../src/models/user');
// const Trophy = require('../../src/models/trophy');
// const UserTrophy = require('../../src/models/user-trophy');
// const mongoose = require('../../src/database/index');

// describe('User Trophy', () => {

//     beforeAll((done) => {
//         mongoose.connect(done);
//     });


//     afterAll((done) => {
//         mongoose.disconnect(done);
//     });

//     // beforeEach(async () => {
//     //     await Promise.all([
//     //         User.deleteMany({}),
//     //         //Trophy.deleteMany({})
//     //     ]);
//     // });

//     it('Test win trophy', async () => {
//         console.log('ola! ');
//         const x = 2;
//         const y = 2;
//         const sum = x + y;
//         expect(sum).toBe(4);
//         //const user = await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
//         //const trophy = await Trophy.create({ "action": "collected_coin", "value": 1 });

//         // const userTrophy = {user: user.id, trophy: trophy.id};
//         // console.log(userTrophy);
//         // const winTrophy = await UserTrophy.create(userTrophy);
//         // expect(typeof winTrophy).toBe("object");
//     });

// });
