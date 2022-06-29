const { ErrorHandler } = require('../helpers');
const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const [products] = await productsModel.getById(id);
  console.log(products);
  if (!products) throw new ErrorHandler(404, 'Product not found');
  
  return products;
};

module.exports = {
  getAll,
  getById,
};
