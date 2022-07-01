const { validationErrHandler, ErrorBody } = require('../helpers');
const { saleSchema } = require('../schemas');
const salesModel = require('../models/salesModel');

const add = async (body) => {
  body.forEach((prod) => validationErrHandler(saleSchema, prod));
  const products = body.map(async ({ productId }) => salesModel.getById(productId));
  const isAnyEmpty = await (await Promise.all(products)).find((e) => e.length === 0);
  if (!isAnyEmpty) {
    const saleId = await salesModel.getSaleId();
    body.map(async ({ productId, quantity }) =>
      salesModel.add(saleId, productId, quantity));
    return {
      id: saleId,
      itemsSold: body,
    };
  }
  if (isAnyEmpty) throw new ErrorBody(404, 'Product not found');
};

const listSaleSchema = (sale) => ({
  saleId: sale.sale_id,
  date: sale.date,
  productId: sale.product_id,
  quantity: sale.quantity,
});

const saleIdSchema = (sale) => ({
  date: sale.date,
  productId: sale.product_id,
  quantity: sale.quantity,
});

const getAll = async () => {
  const result = await salesModel.getAll();
  return result.map(listSaleSchema);
};

const getById = async (id) => {
  const result = await salesModel.getSaleById(id);
  console.log(result);
  if (result.length === 0) throw new ErrorBody(404, 'Sale not found');
  return result.map(saleIdSchema);
};

module.exports = {
  add,
  getAll,
  getById,
};