const routes = require('express').Router();;
const MonsterController = require('../controllers/monster-controller');

routes.get('/list', MonsterController.list);

module.exports = routes;