require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./db/dbconfig');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

dbConnection();

app.use(cors());
app.use(express.json());
app.use(require('./routes/index'));

app.listen(port, () => {
    console.log(`Servidor BACKEND en puerto: ${port}`)
});