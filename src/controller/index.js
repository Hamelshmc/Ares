'use strict';
const jwt = require('jsonwebtoken');
const { param } = require('../routes');
const services = require('../services');
const { TOKEN_SECRET } = process.env;

const register = async (request, response) => {
  const { email, password } = request.body;
  const user = { email: email, password: password };
  try {
    const userRegistered = await services.register(user);
    const token = jwt.sign(
      { id: userRegistered.id, verified: userRegistered.verified },
      TOKEN_SECRET,
      {
        expiresIn: '60m',
      }
    );
    response
      .header('Authorization', `Bearer ${token}`)
      .status(200)
      .send({ response: 'Logged In!', authorization: token });
  } catch (error) {
    response.status(404).send(error);
  }
};

const login = async (request, response) => {
  const { email, password } = request.body;
  const user = { email: email, password: password };
  try {
    const userLogged = await services.login(user);
    const token = jwt.sign({ id: userLogged.id, email: userLogged.email }, TOKEN_SECRET, {
      expiresIn: '60m',
    });
    response
      .header('Authorization', `Bearer ${token}`)
      .status(200)
      .send({ response: 'Logged In!', authorization: token });
  } catch (error) {
    response.status(404).send(error);
  }
};

const gotCharacters = async (request, response) => {
  try {
    const { ...filtros } = request.query;
    const parametros = { ...filtros };
    const characters = await services.getDataGotCharacters(parametros);
    return response.status(200).send(characters);
  } catch (error) {
    response.status(404).send(error);
  }
};

const gotHouse = async (request, response) => {
  try {
    const house = await services.getDataGotHouse();
    return response.status(200).send(house);
  } catch (error) {
    response.status(404).send(error);
  }
};

module.exports = { login, register, gotCharacters, gotHouse };
