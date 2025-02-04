const mongoose = require('mongoose')
const User = require("../models/Users");
const jwt = require('jsonwebtoken')
const config = require('../jwt_secret/config')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser');

let authController = {}
/**
 * 
 * @param {*} req recebe o email e a password no body
 * @param {*} res 
 * @param {*} next 
 */
authController.submittedLogin = function(req, res, next) {
    const emailInput = req.body.email
    const passwordInput = req.body.password

    User.findOne({email: emailInput})
        .then(function(user){
            bcrypt.compare(passwordInput, user.password)
                .then(function(result){
                    if (result ===true){
                        
                        if( user.role === 'Admin' || user.role === 'Employee'){
                        const authToken = jwt.sign({ email: user.email, role: user.role}, config.secret, { expiresIn: 600000 });
                        res.cookie('auth-token', authToken, {maxAge: 600000})
                        res.cookie('role', user.role, {maxAge: 600000})
                        res.redirect('/admin');
                        }else {
                            res.redirect('/users/signup?mensagem= YOU DONT´T HAVE ENOUGH CREDENTIALS!');
                        }

                    } else {
                        res.redirect('/users/signup?mensagem= There was an error when you were logging your account!');
                    }
                })
        })
        .catch(function(err){
            res.redirect('/users/signup?mensagem= That account doesn´t exist!');
            next(err)
        })
};


/**
 * 
 * Esta função serve para o utilizador dar logout
 */
authController.logout = function(req, res, next) {
    res.clearCookie('auth-token')
    res.clearCookie('role')
    res.redirect('/users/signup');
};

/**
 * 
 * Esta função cria a página do login
 */
authController.createLogin = function(req, res, next) {
    const role = req.cookies['role']
    res.render('Users/login', {role: req.cookies,role})
};

/**
 * 
 * Esta função registra o utilizador na base de dados
 * 
 */
authController.register = async function(req, res, next) {
    
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
            console.log('The account was substituted!');
            res.redirect('/?mensagem= Successfully created an account!');

        }else{
            const hashedPassword = bcrypt.hashSync(req.body.password, 8);
            req.body.password = hashedPassword
            const user = new User(req.body);

            await user.save();
            console.log('Created an new user!');
            res.redirect('/?mensagem= Successfully created an account!');
        }
        
    } catch (error) {
        console.log(error);
        res.redirect('/users/register?mensagem=It occurred a problem when you were creating your account!');
    }
    
};

/**
 * 
 * Esta função verifica se o utlizador está logado
 * So assim é que acesso ao backend
 * 
 */
authController.verifyLoginUser = function(req, res, next) {
    const authToken = req.cookies['auth-token']
    const role = req.cookies['role']
    if (authToken){
        jwt.verify(authToken, config.secret, async function(err, decoded) {
            
            const user = await User.findOne({email: decoded.email});
            req.userEmail = decoded.email
            next()
        })
    } else {
        //res.render('error', {message:"not authenticated!", error: {status:"",stack:""}})
        res.redirect('/users/signup?mensagem= Need to login first!');
    }
}

/**
 * 
 * Esta função verifica se o utilizador logado é administrador
 * 
 */
authController.verifyAdmin = function(req, res, next) {
    
    const authToken = req.cookies['auth-token']
    const role = req.cookies['role']
    if (authToken){
        jwt.verify(authToken, config.secret, async function(err, decoded) {
           
            const user = await User.findOne({email: decoded.email});
            if(user.role === 'Admin'){
                req.userEmail = decoded.email
                res.cookie('role', user.role, {maxAge: 600000});
                next() 
            }else {
                res.redirect('/?mensagem= You don´t have enough credentials!');
                next()
            }
        })
    } else {
        res.redirect('/users/signup?mensagem= Need to login first!');
    }
}


module.exports = authController;