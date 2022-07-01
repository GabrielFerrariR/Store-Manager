const { validationErrHandler, ErrorBody } = require('../helpers');
const { saleSchema, listSaleSerialize, saleIdSerialize } = require('../schemas');
const salesModel = require('../models/salesModel');

const add = async (body) => {
  body.forEach((prod) => validationErrHandler(saleSchema, prod));
  const products = body.map(async ({ productId }) => salesModel.getById(productId));
  const isAnyEmpty = await (await Promise.all(products)).find((e) => e.length === 0);
  if (!isAnyEmpty) {
    const saleId = await salesModel.addSale();
    body.map(async ({ productId, quantity }) =>
      salesModel.addSaleProducts(saleId, productId, quantity));
    return {
      id: saleId,
      itemsSold: body,
    };
  }
  if (isAnyEmpty) throw new ErrorBody(404, 'Product not found');
};

const getAll = async () => {
  const result = await salesModel.getAll();
  return result.map(listSaleSerialize);
};

const getById = async (id) => {
  const result = await salesModel.getSaleById(id);
  console.log(result);
  if (result.length === 0) throw new ErrorBody(404, 'Sale not found');
  return result.map(saleIdSerialize);
};

const remove = async (id) => {
  const { affectedRows } = await salesModel.remove(id);
  if (affectedRows > 0) {
    return true;
  }
  throw new ErrorBody(404, 'Sale not found');
};

module.exports = {
  add,
  getAll,
  getById,
  remove,
};