const { Productos } = require('../controllers/productos');
const express = require('express');
const app = express();

app.get('/api/store/product/get', Productos.getProducts);
app.post('/api/store/product/insert', Productos.insertProduct);

module.exports = app;