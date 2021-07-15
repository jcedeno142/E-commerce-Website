const { check } = require('express-validator');

exports.auth = [
    check('id_token', 'El token de usuario es requerido').not().isEmpty()
]

exports.createProduct = [
    check('productName').trim().escape().not().isEmpty().withMessage('El nombre del producto es obligatorio')
    .isLength({ max: 50 }).withMessage('El nombre del producto excede el máximo de caracteres permitidos'),
    check('unitPrice').trim().escape().not().isEmpty().withMessage('El precio del artículo es requerido')
    .isFloat({min: 0.0}).withMessage('Precio no válido'),
    check('description').trim().escape().isLength({ max: 150 }).optional(),
    check('img').trim().escape().optional(),
    check('status', 'Estado incorrecto').isBoolean()
];

exports.addCart = [
    check('item').trim().escape().not().isEmpty().withMessage('El id del producto es requerido')
];