'use strict';

const Joi = require('joi');

const registerAndLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerAndLoginValidation = async (user) => {
  return await registerAndLoginSchema.validateAsync(user);
};

module.exports = { registerAndLoginValidation };
