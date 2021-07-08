const express = require('express');
const app = express();

app.use(require('./cells'));

module.exports = app;