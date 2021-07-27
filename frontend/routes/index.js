const express = require('express');
const path = require('path');
const views = path.join(__dirname, '../public')
const app = express();

app.get('/', (req,res) => {
    res.sendFile('index.html', { root: views });
});

app.get('/producto', (req,res) => {
    res.sendFile('/producto.html',  { root: views });
});

app.get('/cart', (req,res) => {
    res.sendFile('/cart.html',  { root: views });
});

app.get('/pedidos', (req,res) => {
    res.sendFile('/pedidos.html',  { root: views });
});

module.exports = app;