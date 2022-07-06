const salesService = require('../services/salesService');

const add = async (req, res, next) => {
  try {
    const sale = await salesService.add(req.body);
    return res.status(201).json(sale);
   } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const sale = await salesService.getAll();
     return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const sale = await salesService.getById(req.params.id);
     return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.remove(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const addedProduct = await salesService.update(req.body, id);
    return res.status(200).json(addedProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add,
  getAll,
  getById,
  remove,
  update,
};