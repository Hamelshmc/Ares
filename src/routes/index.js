const router = require('express').Router();
const controller = require('../controller');
const { auth } = require('../middleware');

router
  .route('/register')
  .post(async (request, response) => await controller.register(request, response));

router.route('/login').post(async (request, response) => await controller.login(request, response));

router
  .route('/got/characters')
  .all(auth)
  .get(async (request, response) => await controller.gotCharacters(request, response))
  .get(async (request, response) => await controller.gotHouse(request, response));

module.exports = { router };
