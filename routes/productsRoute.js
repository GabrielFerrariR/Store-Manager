const express = require('express');
const { getAll, getById, add, update } = require('../controllers/productsController');

const route = express.Router();

route
  .get('/', getAll)
  .get('/:id', getById)
  .post('/', add)
  .put('/:id', update);

module.exports = route;