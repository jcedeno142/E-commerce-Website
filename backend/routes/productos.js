const validators = require('../middlewares/validator');
const { Productos } = require('../controllers/productos');
const { verifyToken } = require('../middlewares/authentication');
const { valResults } = require('../middlewares/validator-results');

const express = require('express');
const app = express();

app.get('/api/store/products', [ verifyToken, Productos.getProducts ]);
app.get('/api/store/product/:id', [ verifyToken, Productos.getProduct ]);
app.post('/api/store/products', [ verifyToken,
    validators.createProduct, valResults, 
    Productos.insertProduct ]);
app.put('/api/store/products', [ verifyToken, Productos.updateProduct ]);

module.exports = app;