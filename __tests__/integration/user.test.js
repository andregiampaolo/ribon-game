const User = require('../../src/models/user');
const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

describe('Registration User', () => {

    afterAll((done) => {
        mongoose.disconnect(done);
    });

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany({})
        ]);
    });

    it('Register new user', async () => {

        const user = { "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" };
        const response = await request(app)
            .post('/user/register')
            .send(user);
        expect(response.status).toBe(200);
    });

    it('Duplicated email user', async () => {

        const user = { "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" };
        const response = await request(app)
            .post('/user/register')
            .send(user);

        const user2 = { "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" };
        const response2 = await request(app)
            .post('/user/register')
            .send(user2);

        expect(response2.status).toBe(400);
    });

    it('Register new user without email', async () => {

        const user = { "name": "Usuario 1", "password": "123456" };
        const response = await request(app)
            .post('/user/register')
            .send(user);
        expect(response.status).toBe(400);
    });

    it('Register new user without name', async () => {

        const user = { "email": "usuario1@teste.com", "password": "123456" };
        const response = await request(app)
            .post('/user/register')
            .send(user);
        expect(response.status).toBe(400);
    });
    it('Register new user without password', async () => {

        const user = { "name": "Usuario 1", "email": "usuario1@teste.com"};
        const response = await request(app)
            .post('/user/register')
            .send(user);
        expect(response.status).toBe(400);
    });

    it('Number of users on database increase when create new user', async () => {

        const quantityUsersBeforeCreate = await User.countDocuments({}, (err, quantity) => {
            return quantity;
        });
        await User.create({ "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" });
        const quantityUsersAfterCreate = await User.countDocuments({}, (err, quantity) => {
            return quantity;
        });
        expect(quantityUsersAfterCreate-1).toBe(quantityUsersBeforeCreate);
    });


});