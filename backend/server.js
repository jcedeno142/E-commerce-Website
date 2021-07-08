require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./db/dbconfig');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

dbConnection();

app.use(express.json());
app.use(cors());
app.use(require('./routes/index'));

app.listen(port, () => {
    console.log(`Servidor BACKEND en puerto: ${port}`)
});

// mongodb+srv://fastadmin:*****@cluster0.8u4oh.mongodb.net/test?authSource=admin&replicaSet=atlas-1la8fj-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=trueS