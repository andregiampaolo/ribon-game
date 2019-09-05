const User = require('../../src/models/user');
const request = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');

let user = { "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" };

describe('User', () => {


    afterAll((done) => {
        mongoose.disconnect(done);
    });

    beforeEach(async () => {
        await Promise.all([
            User.deleteMany({})
        ]);
    });

    it('Register new user', async () => {
        const response = await request(app)
            .post('/user/register')
            .send(user);
        expect(response.status).toBe(200);
    });

    it('Duplicated email user', async () => {

        await request(app)
            .post('/user/register')
            .send(user);

        const user2 = { "name": "Usuario 1", "email": "usuario1@teste.com", "password": "123456" };
        const response2 = await request(app)
            .post('/user/register')
            .send(user2);

        expect(response2.status).toBe(400);
    });

    it('Number of users on database increase when create new user', async () => {
        const quantityUsersBeforeCreate = await User.countDocuments({});
        await User.create(user);
        const quantityUsersAfterCreate = await User.countDocuments({});
        expect(quantityUsersBeforeCreate).toBe(quantityUsersAfterCreate-1);
    });

    it('Register new user without email', async () => {
        const response = await request(app)
            .post('/user/register')
            .send({ "name": "Usuario 1", "password": "123456" });
        expect(response.status).toBe(400);
    });

    it('Register new user without name', async () => {
        const response = await request(app)
            .post('/user/register')
            .send({ "email": "usuario1@teste.com", "password": "123456" });
        expect(response.status).toBe(400);
    });
    it('Register new user without password', async () => {
        const response = await request(app)
            .post('/user/register')
            .send({ "name": "Usuario 1", "email": "usuario1@teste.com" });
        expect(response.status).toBe(400);
    });

    it("Test list users", async () => {
        const response = await request(app)
            .get('/user/list');
        expect(response.status).toBe(200);
    });

    it('Test authenticate user', async () => {
        await request(app)
            .post('/user/register')
            .send(user);
        
        const response = await request(app)
            .post('/user/authenticate')
            .send(user);

        expect(response.status).toBe(200);
    });

    it('Test authenticate user with invalid email', async () => {
        await request(app)
            .post('/user/register')
            .send(user);

        const response = await request(app)
            .post('/user/authenticate')
            .send({email: 'fake@email.com', password: user.password});

        expect(response.status).toBe(400);
    });

    it('Test authenticate user without email', async () => {

        await request(app)
            .post('/user/register')
            .send(user);

        const response = await request(app)
            .post('/user/authenticate')
            .send({email: null, password: user.password});

        expect(response.status).toBe(400);
    });

    it('Test authenticate user with invalid password', async () => {
        await request(app)
            .post('/user/register')
            .send(user);
            
        const response = await request(app)
            .post('/user/authenticate')
            .send({email: user.email, password: '123'});

        expect(response.status).toBe(400);
    });


    it('Test authenticate user without password', async () => {

        await request(app)
            .post('/user/register')
            .send(user);

        const response = await request(app)
            .post('/user/authenticate')
            .send({email: user.email, password: null});

        expect(response.status).toBe(400);
    });

});
