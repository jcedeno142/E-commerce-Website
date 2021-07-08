const mongoose = require('mongoose');

const dbConnection = async() => {
    try { 
        await mongoose.connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('MongoDB Atlas online.')
    } catch (error) {
        console.log(error);
        throw new Error('Database connection error has ocurred')
    }
}

module.exports = {dbConnection};