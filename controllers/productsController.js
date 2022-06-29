const productsService = require('../services/productsService');

const getAll = async (_req, res, next) => {
  try {
    const products = await productsService.getAll();
    return res.status(200).send(products);
    } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productById = await productsService.getById(id);
    return res.status(200).send(productById);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
};