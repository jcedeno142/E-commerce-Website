const { Carrito } = require('../controllers/cart');
const validators = require('../middlewares/validator');
const { valResults } = require('../middlewares/validator-results');

const express = require('express');
const app = express();

app.get('/api/store/cart', Carrito.getCart)
app.post('/api/store/cart', [ validators.addCart, valResults, Carrito.addItemToCart ]);

module.exports = app;