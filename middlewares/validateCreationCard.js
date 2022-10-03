const { celebrate, Joi, Segments } = require('celebrate');
const { urlPattern } = require('../utils/constants');

module.exports = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlPattern),
  }),
});
