const db = require('../models');
const authconfig = require('../config/authconfig');
const User = db.user;
const logger = require('../Utils/logger');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Controller POST /register
exports.register = async(req, res) =>{
    logger.info("POST /register route is accessed");
    try{
        res.clearCookie("user_id");
        res.clearCookie("token");
        const user = await User.create({
        name : req.body.name,
        password: await bcrypt.hashSync(req.body.password, 8)
        
    })
    res.status(201).json(user);
    logger.info("REGISTER SUCCESSFUL");
    }catch(err){
    res.status(500).send({message:err.message});
    logger.error("ERROR on POST /register");
    }
    };

// Controller POST /login
exports.login = async(req, res) =>{
    logger.info("POST /login route is accessed");
    try{
    res.clearCookie("user");
    const user = await User.findOne({
        where: {
            name : req.body.name
        }
    })
    if(!user){
        logger.error("USER Not Found!");
        return res.status(404).send({message:'User Not Found'});
    }
    var validpassword = await bcrypt.compareSync(
        req.body.password,
        user.password
    );
    if(!validpassword){
        logger.error("INVALID PASSWORD");
        return res.status(401).send({
            accessToken:null,
            message:'Invalid Password!'
        });
    }
    const token = await jwt.sign({id : user.id}, authconfig.secret, {
        expiresIn:86400
    });
    res.cookie('token',token,{httpOnly:false});
    res.cookie('user_id',user.id);
    res.status(200).json({user});
    logger.info("LOGIN SUCCESSFUL");

    }catch(e){
        res.status(500).send({message:e.message});
        logger.error("ERROR on POST /login");
    };
    
};

// Controller POST /logout
exports.logout = async(req, res) =>{
    logger.info("GET /logout route is accessed");
    try{
        res.clearCookie("user_id");
        res.clearCookie("token");
        res.redirect('/');
        logger.info("LOGOUT SUCCESSFUL");
    }catch(e){
        console.log(e);
    }
}
