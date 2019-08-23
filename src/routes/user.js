const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/user-controller');

routes.get('/list', UserController.list);
routes.post('/register', UserController.register);

module.exports = routes;