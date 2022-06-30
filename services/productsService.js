const { ErrorHandler } = require('../helpers');
const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const [products] = await productsModel.getById(id);
  if (!products) throw new ErrorHandler(404, 'Product not found');
  
  return products;
};

const add = async (body) => {
  const { name } = body;
  if (!name) throw new ErrorHandler(400, 'Insert product name');
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
