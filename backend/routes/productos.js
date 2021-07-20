const validators = require('../middlewares/validator');
const { Productos } = require('../controllers/productos');
const { valResults } = require('../middlewares/validator-results');

const express = require('express');
const app = express();

app.get('/api/store/products', Productos.getProducts);
app.get('/api/store/product/:id', Productos.getProduct);
app.post('/api/store/products', [validators.createProduct, valResults, 
    Productos.insertProduct]);
app.put('/api/store/products', Productos.updateProduct);

module.exports = app;