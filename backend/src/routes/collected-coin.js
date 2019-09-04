const routes = require('express').Router();;
const CollectedCointController = require('../controllers/collected-coin-controller');
const authMiddleware = require('../middleware/auth');

routes.use(authMiddleware);

routes.post('/collect', CollectedCointController.collect);
routes.get('/list', CollectedCointController.list);

module.exports = routes;