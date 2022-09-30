const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { secretKey } = require('../utils/constants');

const extractBearerToken = (header) => header.replace('Bearer ', '');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация.');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    throw new AuthError('Необходима авторизация.');
  }

  req.user = payload;

  next();
};
