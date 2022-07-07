const { validationErrHandler, ErrorBody } = require('../helpers');
const { saleSchema, listSaleSerialize, saleIdSerialize } = require('../schemas');
const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

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
  if (result.length === 0) throw new ErrorBody(404, 'Sale not found');
  return result.map(saleIdSerialize);
};

const remove = async (id) => {
  const { affectedRows } = await salesModel.remove(id);
  if (affectedRows > 0) {
    return undefined;
  }
  throw new ErrorBody(404, 'Sale not found');
};

const update = async (body, id) => {
  body.map((prod) => validationErrHandler(saleSchema, prod));

  await Promise.all(body.map(async (e) => productsService.getById(e.productId)));

  const updates = await Promise.all(body.map(async ({ productId, quantity }) => 
    salesModel.update(id, productId, quantity)));
  const { affectedRows } = updates[0];
  if (affectedRows > 0) {
    return {
      saleId: id,
      itemsUpdated: body,
    };
  }
  throw new ErrorBody(404, 'Sale not found');
};

module.exports = {
  add,
  getAll,
  getById,
  remove,
  update,
};