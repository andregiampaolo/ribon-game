const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/user-controller');

routes.post('/register', UserController.register);

module.exports = routes;