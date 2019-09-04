const routes = require('express').Router();;
const KilledMonster = require('../controllers/killed-monster-controller');
const authMiddleware = require('../middleware/auth');

routes.use(authMiddleware);

routes.post('/killed', KilledMonster.killed);

module.exports = routes;