const { Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    unitPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String
    }
});

module.exports = model('Producto', ProductoSchema);