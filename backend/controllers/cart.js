const Cart = require('../models/Cart');
const Producto = require('../models/Producto');

const Carrito = {
    getCart: async (req,res) => {

    },
    addItemToCart: async (req, res) => {
        const id = req.body.item;
        try {
            const producto = await Producto.findById(id);
            const newCart = await Cart.create({producto, new: true});
            return res.status(200).json({ ok: true, newCart})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ok: false, error, message: 'Unexpected server error'});
        }
    }
}

module.exports = { Carrito }