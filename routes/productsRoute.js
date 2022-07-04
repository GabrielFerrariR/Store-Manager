const express = require('express');
const { getAll, getById, add, update,
  remove, findByName } = require('../controllers/productsController');

const route = express.Router();

route
  .get('/', getAll)
  .get('/search', findByName)
  .get('/:id', getById)
  .post('/', add)
  .put('/:id', update)
  .delete('/:id', remove);

module.exports = route;