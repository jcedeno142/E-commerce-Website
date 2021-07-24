const Pedido = require('../models/Pedido');

const Pedidos = {
    insertPedido: async(req, res) => {
        const { name, picture, email } = req.user;
        const details = req.body.details
        try {
            const pedido = await Pedido.create( {name, picture, email, details, new: true} );
            return res.status(200).json({ok: true, pedido,  message: `Compra guardada en la base de datos`});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ok: false, error, message: 'Unexpected server error'});
        }
    }
}

module.exports = { Pedidos }