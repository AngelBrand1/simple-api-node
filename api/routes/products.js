const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Product = require('../models/product');

const ProductsController = require('../controllers/products');

router.get('/', checkAuth, ProductsController.products_get_all );

router.post('/', checkAuth, ProductsController.products_create_product);  

router.get('/:productId', checkAuth, ProductsController.products_get_product);

router.delete('/:productId', checkAuth, ProductsController.products_delete_product);

module.exports = router;