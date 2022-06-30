const express = require('express');
const { getAll, getById, add } = require('../controllers/productsController');

const route = express.Router();

route
  .get('/', getAll)
  .get('/:id', getById)
  .post('/', add);

module.exports = route;