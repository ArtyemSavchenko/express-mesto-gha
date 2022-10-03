const { celebrate, Joi, Segments } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.objectId(),
  }),
});
