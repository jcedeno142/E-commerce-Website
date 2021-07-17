const express = require('express');
const validators = require('../middlewares/validator');
const { Authentication } = require('../controllers/auth');
const { valResults } = require('../middlewares/validator-results');
const app = express();

app.post('/api/store/google', [
    validators.auth, valResults, 
    Authentication.googleSignIn
]);

module.exports = app;