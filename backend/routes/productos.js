const { Productos } = require('../controllers/productos');
const validators = require('../middlewares/validator');
const express = require('express');
const app = express();

app.get('/api/store/products', Productos.getProducts);
app.get('/api/store/product/:id', Productos.getProduct);
app.post('/api/store/products', [validators.createProduct, Productos.insertProduct]);
app.put('/api/store/products/:id', Productos.updateProduct);

module.exports = app;