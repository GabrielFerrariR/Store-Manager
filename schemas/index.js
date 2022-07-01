const Joi = require('joi');

const nameSchema = Joi.object({
  name: Joi.string().required().min(5),
});

const saleSchema = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().required().min(1),
});

module.exports = {
  nameSchema,
  saleSchema,
};