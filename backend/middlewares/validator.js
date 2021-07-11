const { check } = require('express-validator');

exports.createProduct = [
    check('productName').trim().escape().not().isEmpty('El nombre del producto es obligatorio')
    .isLength({ min: 1, max: 50 }).withMessage('El nombre del producto es demasiado corto o excede el máximo de caracteres permitidos')
]