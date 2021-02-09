'use strict';
const { registerAndLoginValidation } = require('../validations');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const helper = require('../helpers');
const repository = require('../repository');

const register = async (user) => {
  await registerAndLoginValidation(user);
  const { email, password } = user;
  const hasEmail = await repository.valueExist(email);
  if (hasEmail) {
    const error = new Error();
    error.status = 404;
    error.message = 'This email exits';
    throw error;
  }
  const salt = await bcrypt.genSalt(15);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = { email: email, password: hashedPassword };
  await repository.add(newUser);
  return await repository.find(email);
};

const login = async (user) => {
  await registerAndLoginValidation(user);
  const { email, password } = user;
  const getUser = await repository.find(email);
  if (!getUser) {
    const error = new Error();
    error.status = 404;
    error.message = 'User not found';
    throw error;
  }

  return await bcrypt.compare(password, getUser.password).then((res) => {
    if (res === true) {
      return user;
    }
    const error = new Error();
    error.status = 404;
    error.message = 'Invalid Password';
    throw error;
  });
};

const getDataGotCharacters = async (parametros) => {
  try {
    const result = await helper.builderQuery(parametros);
    const url = `https://anapioficeandfire.com/api/characters${result}`;
    console.log(url);
    const response = await axios.request({
      method: 'get',
      url,
    });

    return response.data;
  } catch (err) {
    throw new Error('Connection is fail');
  }
};

const getDataGotHouse = async () => {
  try {
    const url = `https://anapioficeandfire.com/api/houses`;
    const response = await axios.request({
      method: 'get',
      url,
    });

    return response.data;
  } catch (err) {
    throw new Error('Connection is fail');
  }
};

module.exports = {
  register,
  login,
  getDataGotCharacters,
  getDataGotHouse,
};
