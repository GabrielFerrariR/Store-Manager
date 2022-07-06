const express = require('express');
const { add, getAll, getById, remove, update } = require('../controllers/salesController');

const route = express.Router();

route.post('/', add)
  .get('/', getAll)
  .get('/:id', getById)
  .delete('/:id', remove)
  .put('/:id', update);

module.exports = route;