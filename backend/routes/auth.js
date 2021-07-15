const express = require('express');
const validators = require('../middlewares/validator');
const { valResults } = require('../middlewares/validator-results');
const app = express();

app.post('/api/store/auth', [validators.auth, valResults], (req, res) => {
    res.json({message: 'Sesión iniciada con Google'})
});

module.exports = app;