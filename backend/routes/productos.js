const { Productos } = require('../controllers/productos');
const express = require('express');
const app = express();

app.get('/api/store/products', Productos.getProducts);
app.post('/api/store/products', Productos.insertProduct);
app.put('/api/store/products/:id', Productos.updateProduct);

module.exports = app;