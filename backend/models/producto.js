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

ProductoSchema.method('toJSON', function() {
    const { _id, __v, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Producto', ProductoSchema);