const salesService = require('../services/salesService');

const add = async (req, res, next) => {
  try {
    const sale = await salesService.add(req.body);
    return res.status(201).json(sale);
   } catch (error) {
    next(error);
  }
};

module.exports = {
  add,
};