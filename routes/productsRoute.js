const express = require('express');
const { getAll, getById } = require('../controllers/productsController');

const route = express.Router();

route
  .get('/', getAll)
  .get('/:id', getById);

module.exports = route;