const Cart = require('../models/Cart');
const Producto = require('../models/Producto');

const Carrito = {
    getCart: async (req,res) => {
        const email  = req.user.email;
        try {
            const cart = await Cart.find({email}).populate('item')
            return res.status(200).json({ ok: true, cart})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ok: false, error, message: 'Unexpected server error'});
        }
    },
    addItemToCart: async (req, res) => {
        const { name, picture, email } = req.user;
        const id = req.body.item;
        try {
            const item = await Producto.findById(id);
            const newCart = await Cart.create({name, picture, email, item, new: true});
            return res.status(200).json({ ok: true, newCart})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ok: false, error, message: 'Unexpected server error'});
        }
    },
    removeItemFromCart:async (req, res) => {
        const id = req.body.id;
        try {
            const remove = await Cart.deleteOne({_id: id});
            return res.status(200).json({ok:true, remove})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ok: false, error, message: 'Unexpected server error'});
        }
    }
}

module.exports = { Carrito }