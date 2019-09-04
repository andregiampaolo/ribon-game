const routes = require('express').Router();;
const UserController = require('../controllers/user-controller');

routes.get('/list', UserController.list);
routes.post('/register', UserController.register);
routes.post('/authenticate', UserController.authenticate);

module.exports = routes;