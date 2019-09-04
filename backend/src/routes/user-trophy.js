const routes = require('express').Router();;
const UserTrophyController = require('../controllers/user-trophy-controller');
const authMiddleware = require('../middleware/auth');

routes.use(authMiddleware);

routes.get('/trophies', UserTrophyController.userTrophies);

module.exports = routes;