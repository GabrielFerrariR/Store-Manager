const express = require('express');
const { add, getAll, getById } = require('../controllers/salesController');

const route = express.Router();

route.post('/', add)
  .get('/', getAll)
  .get('/:id', getById);

module.exports = route;