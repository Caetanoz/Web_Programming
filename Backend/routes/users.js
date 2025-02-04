var express = require('express');
var router = express.Router();

var user = require("../controllers/UsersController.js");
var ticket = require("../controllers/TicketsController.js");
const authController = require('../controllers/auth');

/* GET users listing. */
router.get('/', authController.verifyLoginUser  ,function(req, res, next) {
  user.list(req,res);
});

router.get('/signup', authController.createLogin);


router.get('/register',  function(req,res){
  user.register(req,res);
});

router.get('/show/:id', authController.verifyLoginUser  ,function(req,res){
  user.show(req,res);
});

router.post('/delete/:id', authController.verifyAdmin, function(req,res){
  user.delete(req,res);
});

router.get('/edit/:id', authController.verifyLoginUser  ,function(req,res){
  user.edit(req,res);
});

router.post('/update/:id', authController.verifyLoginUser ,function(req,res){
  user.update(req,res);
});

router.post('/save', authController.register);

router.get('/ticket/:id', authController.verifyLoginUser ,function(req,res){
  ticket.show(req,res);
});

module.exports = router;
