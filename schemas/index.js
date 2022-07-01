const Joi = require('joi');

const nameSchema = Joi.object({
  name: Joi.string().required().min(5),
});

const saleSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required().min(1),
});

const listSaleSerialize = (sale) => ({
  saleId: sale.sale_id,
  date: sale.date,
  productId: sale.product_id,
  quantity: sale.quantity,
});

const saleIdSerialize = (sale) => ({
  date: sale.date,
  productId: sale.product_id,
  quantity: sale.quantity,
});

module.exports = {
  nameSchema,
  saleSchema,
  listSaleSerialize,
  saleIdSerialize,
};