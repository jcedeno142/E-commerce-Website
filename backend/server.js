require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(require('./routes/index'));

app.listen(port, () => {
    console.log(`Servidor BACKEND en puerto: ${port}`)
});