const jwt = require('jsonwebtoken');
const authconfig = require('../config/authconfig');
const db = require('../models');
const User = db.user;
const logger = require('../Utils/logger');


// Verfivy Token Middleware for login
verifyToken = async(req, res, next)=>{
    const token = req.cookies.token || req.headers["x-access-token"];
    if(!token){
        logger.error("ERROR NO TOKEN PROVIDED");
        return res.status(403).send({
            message : "No token provided!"
        });
    }
    try{
        const decoded = await jwt.verify(token, authconfig.secret);
        req.userId = decoded.id;
        
    }catch(err){
        logger.error("ERROR UNAUTHORIZED");
        return res.status(401).send("Unauthorized!")
    }
    
    return next();
    };


const authjwt = {
    verifyToken : verifyToken,
}

module.exports = authjwt;