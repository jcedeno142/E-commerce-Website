const { verifyToken } = require('../middlewares/authentication');
const { Pedidos } = require('../controllers/pedidos');
const express = require('express');
const app = express();

app.post('/api/store/pedidos', [verifyToken, Pedidos.insertPedido])

module.exports = app;