const { googleVerify } = require('../helper/google-verify');
const jwt = require('jsonwebtoken');

const Authentication = {
    googleSignIn: async (req, res) => {
        const {id_token} = req.body;
        try {
            const googleUser = await googleVerify(id_token);
            const token = jwt.sign({
                user: googleUser
            },process.env.SEED,{expiresIn: process.env.EXPIRES_TOKEN})
            return res.status(200).json({message: 'Sesión iniciada con Google', token})
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: 'Token de google no válido'});
        }
        
    }
}

module.exports = { Authentication }