const { Schema, model } = require('mongoose');

const PedidoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    details: {
        type: Object,
        required: true
    }
});

PedidoSchema.method('toJSON', function() {
    const { _id, __v, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Pedido', PedidoSchema);