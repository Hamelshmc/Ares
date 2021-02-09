'use strict';
const { v4 } = require('uuid');
const store = [
  {
    id: '76e920ef-5b5f-471d-9f0b-5d4d3def1784',
    email: 'hamelhmc@gmail.com',
    password: '$2a$15$8bFtr/iz0DHrc2e.bmroBerEdQMioOVFyIrWdasQHedN/PZ33iK/.',
  },
];

const add = async ({ email, password }) => {
  const id = v4();
  store.push({ id, email, password });
  console.log(store);
};

const find = async (email) => {
  console.log(store);
  return store.find((item) => item.email === email);
};

const valueExist = async (email) => {
  const hasEmail = store.find((item) => item.email === email);
  if (hasEmail) {
    return true;
  }
  return false;
};
module.exports = {
  add,
  find,
  valueExist,
};
