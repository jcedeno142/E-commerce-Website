const { Schema, model } = require('mongoose');

const CartSchema = Schema({
    item: {
        type: Schema.Types.ObjectId, ref: 'Producto'
    }
});

CartSchema.method('toJSON', function() {
    const { _id, __v, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Cart', CartSchema)