const { celebrate, Joi, Segments } = require('celebrate');
const { urlPattern } = require('../utils/constants');

module.exports = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().pattern(urlPattern),
  }),
});
