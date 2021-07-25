const { Carrito } = require('../controllers/cart');
const validators = require('../middlewares/validator');
const { verifyToken } = require('../middlewares/authentication');
const { valResults } = require('../middlewares/validator-results');

const express = require('express');
const app = express();

app.get('/api/store/cart', [ verifyToken, Carrito.getCart ]);
app.post('/api/store/cart', [ verifyToken,
    validators.addCart, valResults, 
    Carrito.addItemToCart ]);
app.delete('/api/store/cart', [Carrito.removeItemFromCart])
module.exports = app;