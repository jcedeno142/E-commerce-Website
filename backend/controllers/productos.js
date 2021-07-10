const Producto = require('../models/producto');

const Productos = {
    getProducts: async (req, res) => {
        try {
            const productos = await Producto.find();
            return res.status(200).json({ok: true, productos})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ok: false, error, message: 'Unexpected server error'});
        }
    },
    insertProduct: async (req, res) => {
        const {productName, unitPrice, description, img} = req.body;
        const producto = new Producto(req.body)
        try {
            await producto.save();
            return res.status(200).json({ok: true, producto,  message: `Producto ${productName} agregado a la base de datos`});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ok: false, error, message: 'Unexpected server error'});
        }
    }
}

module.exports = { Productos }