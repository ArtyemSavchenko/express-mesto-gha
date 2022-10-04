const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const { secretKey } = require('../utils/constants');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходима авторизация.');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    throw new Unauthorized('Необходима авторизация.');
  }

  req.user = payload;

  next();
};
