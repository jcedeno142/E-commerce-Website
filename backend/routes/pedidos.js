const { verifyToken } = require('../middlewares/authentication');
const { Pedidos } = require('../controllers/pedidos');
const express = require('express');
const app = express();

app.get('/api/store/pedidos', [verifyToken, Pedidos.getPedidos])
app.post('/api/store/pedidos', [verifyToken, Pedidos.insertPedido])

module.exports = app;