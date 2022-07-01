const express = require('express');
const { add } = require('../controllers/salesController');

const route = express.Router();

route.post('/', add);

module.exports = route;