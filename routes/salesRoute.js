const express = require('express');
// const { getAll, getById, add } = require("../controllers/productsController");
const route = express.Router();

route.get('/', (req, res) => res.status(200).send('vaai'));

module.exports = route;