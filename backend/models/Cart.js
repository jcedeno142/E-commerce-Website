const { Schema, model } = require('mongoose');

const CartSchema = Schema({
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
    item: {
        type: Schema.Types.ObjectId, ref: 'Producto',
        required: true
    }
});

CartSchema.method('toJSON', function() {
    const { _id, __v, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Cart', CartSchema);