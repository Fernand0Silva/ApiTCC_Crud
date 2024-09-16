// Routes/ProdutoRoutes.js
const express = require('express');
const { getProdutos } = require('../Controllers/ProdutoController');
const router = express.Router();

router.get('/', getProdutos);

module.exports = router;
