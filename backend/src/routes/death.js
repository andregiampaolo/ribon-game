const routes = require('express').Router();;
const Death = require('../controllers/death-controller');
const authMiddleware = require('../middleware/auth');

routes.use(authMiddleware);
routes.post('/die', Death.die);

module.exports = routes;