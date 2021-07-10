const Productos = {
    getProducts: (req, res) => {
        return res.status(200).json({ok: true, message: 'Lista de productos: {}'})
    },
    insertProduct: (req, res) => {
        return res.status(200).json({ok: true, message: 'insert'});
    }
}

module.exports = { Productos }