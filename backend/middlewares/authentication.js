const jwt = require('jsonwebtoken');

const verifyToken = function(req,res,next){
    const token = req.query.token;
    jwt.verify(token,process.env.SEED,(err,decoded)=>{
        if(err) { return res.status(401).json({
            ok: false, err, message: 'Token no válido'
        })}
        req.user = decoded.user;
        next();
    })
};

module.exports = { verifyToken }