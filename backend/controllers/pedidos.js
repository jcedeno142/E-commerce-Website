const Pedido = require('../models/Pedido');
const Cart = require('../models/Cart');

const Pedidos = {
    getPedidos: async (req, res) => {
        const email  = req.user.email;
        try {
            const pedido = await Pedido.find({email})
            return res.status(200).json({ ok: true, pedido})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ok: false, error, message: 'Unexpected server error'});
        }
    },
    insertPedido: async(req, res) => {
        const { name, picture, email } = req.user;
        const details = req.body.details
        try {
            const pedido = await Pedido.create( {name, picture, email, details, new: true} );
            return res.status(200).json({ok: true, pedido,  message: `Compra realizada.`});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ok: false, error, message: 'Unexpected server error'});
        }
    }
}

module.exports = { Pedidos }