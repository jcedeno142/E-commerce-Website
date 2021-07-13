const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    // Que lleva esto
});

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = { CartModel }