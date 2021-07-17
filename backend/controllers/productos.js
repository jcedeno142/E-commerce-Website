const Producto = require('../models/Producto');

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
    getProduct: async (req,res) => {
        const id = req.params.id;
        try {
            const producto = await Producto.findById(id);
            return res.status(200).json({ok: true, producto})
        } catch (error) {
            return res.json({error, message: 'Unexpected server error'});
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
    },
    updateProduct: async (req, res) => {
        const id = req.body.id;
        const body = req.body;
        try {
            const update = await Producto.findByIdAndUpdate(id, body, {new: true});
            return res.status(200).json({ok: true, update,  message: `Producto actualizado`});
        } catch (error) {
            console.log(error);
            return res.status(500).json({ok: false, error, message: 'Unexpected server error'});
        }
    }
}

module.exports = { Productos }