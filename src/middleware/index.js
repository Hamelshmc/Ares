'use strict';
const jwt = require('jsonwebtoken');

function auth(request, response, next) {
  const { authorization } = request.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer')) {
      const error = new Error();
      error.status = 403;
      error.message = 'Authorization required';
      throw error;
    }
    const token = authorization.split(' ')[1];
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    request.user = verified;
    next();
  } catch (error) {
    response.status(401).send(error.message || 'Invalid Token');
  }
}

module.exports = { auth };
