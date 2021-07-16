const { googleVerify } = require('../helper/google-verify');

const Authentication = {
    googleSignIn: async (req, res) => {
        const {id_token} = req.body;
        try {
            const googleUser = await googleVerify(id_token);
            // console.log(googleUser);
            return res.status(200).json({message: 'Sesión iniciada con Google', googleUser})
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: 'Token de google no válido'});
        }
        
    }
}

module.exports = { Authentication }