const mongoose = require('mongoose')
const User = require("../models/Users");
const jwt = require('jsonwebtoken')
const config = require('../jwt_secret/config')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');
var authController = require('../controllers/auth.js');


let AuthApiController = {}

/**
 * 
 * Esta função serve para enviar dados sobre o utilziador através da api
 */
AuthApiController.Userperfil = async function(req, res, next) {
  try {
    const user = await User.findOne({_id: req.params.id}).exec();
    res.json(user);
  } catch (err) {
    console.log('Erro a ler');
    next(err);
  }
}

/**
 * 
 * Esta função serve para o utlizador dar login através da api
 */
AuthApiController.login = async function(req, res){
    
  try {
      
      const user = await User.findOne({email: req.body.email});
  
      if (!user) return res.status(404).send('No user found.');         
      if(user) console.log(user); 
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
          
      authController.submittedLogin;

      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ auth: true, token: token, role: user.role, id: user.id});
  
  } catch (error) {
      return res.status(500).send('Error on the server.');
  }
  
}

/**
 * 
 * Esta função serve para o utlizador criar uma conta através da api
 */
AuthApiController.register = async function(req, res) {
    try {
  
      const olduser = await User.findOne({nif:req.body.nif});

        if(olduser){
            const hashedPassword = bcrypt.hashSync(req.body.password, 8);
            req.body.password = hashedPassword

            await olduser.updateOne({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                role:req.body.role,
                address:req.body.address,
                location:req.body.location,
                birthdate:req.body.birthdate,
                cell:req.body.cell
            })
            
            const token = jwt.sign({ id: olduser._id }, config.secret, {
              expiresIn: '24h'
            });
        
            res.status(200).json({ auth: true, token: token });

        }else{
            const hashedPassword = bcrypt.hashSync(req.body.password, 8);
            req.body.password = hashedPassword
            const user = new User(req.body);

            await user.save();
            const token = jwt.sign({ id: user._id }, config.secret, {
              expiresIn: '24h'
            });
        
            res.status(200).json({ auth: true, token: token });

        }

    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
  
  /**
 * 
 * Esta função serve para verificar se o utilizador esta logado no FrontEnd
 */
  AuthApiController.verifyToken = function(req, res, next) {

    var token = req.headers['x-access-token'];
    if (!token) 
      return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) 
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    
  
      req.userId = decoded.id;
      next();
    });
  
  }

  /**
 * 
 * Esta função serve para verificar se o utlizador tem papel de admin no FrontEnd
 */
  AuthApiController.verifyTokenAdmin = function(req, res, next) {

    var token = req.headers['x-access-token'];
    if (!token) 
      return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err || decoded.role !== 'ADMIN') 
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token or not Admin' });    
      req.userId = decoded.id;
      next();
    });
  
  }


module.exports = AuthApiController;