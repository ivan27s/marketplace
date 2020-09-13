const jwt =require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req,res,next)=>{
    try {
        const token =req.headers.authorization.split(' ')[1];
        if(!token){
           return res.status(401).json({message: 'Нет авторизации'});
        }

        const decoded = jwt.verify(token, keys.jwt);
        req.user =decoded;
        next();

    }catch (e) {
        res.status(401).json({message: 'Нет авторизации'});
    }
};
