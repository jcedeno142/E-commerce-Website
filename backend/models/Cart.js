const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Producto'
    }
});

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = { CartModel }