require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes/index'));

app.listen(port, () => {
    console.log(`Servidor FRONTEND en puerto: ${port}`)
});