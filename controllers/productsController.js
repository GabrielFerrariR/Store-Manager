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

const add = async (req, res, next) => {
  try {
    const addedProduct = await productsService.add(req.body);
    return res.status(201).json(addedProduct);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const addedProduct = await productsService.update(req.body, id);
    return res.status(200).json(addedProduct);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productsService.remove(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
};