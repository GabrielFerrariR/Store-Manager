const { ErrorBody, validationErrHandler } = require('../helpers');
const productsModel = require('../models/productsModel');
const { nameSchema } = require('../schemas');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const [products] = await productsModel.getById(id);
  if (!products) throw new ErrorBody(404, 'Product not found');
  
  return products;
};

const add = async (body) => {
  const { name } = body;
  validationErrHandler(nameSchema, body);
  const [newProduct] = await productsModel.add(name);
  return {
    id: newProduct.insertId,
    name,
  };
};

module.exports = {
  getAll,
  getById,
  add,
};
