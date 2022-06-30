const Joi = require('joi');

const nameSchema = Joi.object({
  name: Joi.string().required().min(5),
});

module.exports = {
  nameSchema,
};