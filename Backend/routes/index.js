var express = require('express');
var router = express.Router();
var Event = require("../models/Events");
var Local = require("../models/Locals");
var User = require("../models/Users");
const cookieParser = require('cookie-parser');

var fs = require("fs");
var bodyParser = require("body-parser"); // npm install body-parser --save
var multer = require("multer"); // npm install multer --save

var user = require("../controllers/UsersController.js");
var ticket = require("../controllers/TicketsController.js");
const authController = require('../controllers/auth');

/* GET home page. */
router.get('/', authController.verifyLoginUser , function(req, res, next) {
  const role = req.cookies['role']
  const user = req.cookies['auth-token']
  Event.find().then(function(events){
    Local.find().then(function(locals){
      console.log("Sucessfully loaded everything!");
      res.render('index', { title: 'LusoTicket', event: events, local: locals, role: req.cookies.role, user: req.cookies.user});
    }).catch(function(err){
      console.log(err);
    });

  }).catch(function(err){
    console.log(err);
  });
});

//TICKETS

router.get('/checkout-Event/:id', authController.verifyLoginUser ,function(req,res){
  ticket.createEvent(req,res);
});

router.get('/checkout-Local/:id', authController.verifyLoginUser , function(req,res){
  ticket.createLocal(req,res);
});

router.post('/buyticket-event/:id', authController.verifyLoginUser ,function(req,res){
  ticket.savevent(req,res);
});

router.post('/buyticket-local/:id', authController.verifyLoginUser ,function(req,res){
  ticket.savelocal(req,res);
});

router.get('/multitickets-locals/:id', authController.verifyLoginUser ,function(req,res){
  ticket.showMTL(req,res);
});

router.get('/multitickets-events/:id', authController.verifyLoginUser ,function(req,res){
  ticket.showMTE(req,res);
});


router.post('/refundevent/:id', authController.verifyAdmin, function(req,res){
  ticket.deletevent(req,res);
});

router.post('/refundlocal/:id', authController.verifyAdmin,function(req,res){
  ticket.deletelocal(req,res);
});

//LOGIN

router.post('/signin', authController.submittedLogin);

router.get('/logout', authController.verifyLoginUser , authController.logout );

//ADMIN

router.get('/dashboard',  authController.verifyLoginUser , async function(req,res,next){
  
  try {
    
    const events = await Event.find({});
    const locals = await Local.find({});

    res.render('Graphs/Dashboard', {local: locals, event: events});

  } catch (error) {
    console.log(error);
  }

});

router.get('/dashboard/events/:id', authController.verifyLoginUser , async function(req,res,next){
  
    try {
      
      const events = await Event.findById({_id: req.params.id});
      res.render('Graphs/dashboard_events', {event: events})
    } catch (error) {
      console.log(error)
    }

});

router.get('/dashboard/locals/:id',  authController.verifyLoginUser , async function(req,res,next){
  
  try {
    const locals = await Local.findById({_id: req.params.id});
    res.render('Graphs/dashboard_locals', {local: locals});
  } catch (error) {
    console.log(error)
  }

});


router.get('/admin', authController.verifyLoginUser , function(req, res, next) {
  const role = req.cookies['role']
  res.render('admin', {role: req.cookies.role});
});



module.exports = router;
