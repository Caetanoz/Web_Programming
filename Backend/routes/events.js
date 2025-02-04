var express = require('express');
var router = express.Router();

var event = require("../controllers/EventsController.js");
const authController = require('../controllers/auth');

var fs = require("fs");
var bodyParser = require("body-parser"); // npm install body-parser --save
var multer = require("multer"); // npm install multer --save

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/"); // cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //  + "-" + Date.now() + ".pdf"
  },
});

var upload = multer({ storage: storage });

router.use(express.static("public"));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(upload.single("file")); // upload.single("image")

router.get('/', authController.verifyLoginUser ,  function(req, res, next) {
    event.list(req,res);
});

router.get('/create-event', authController.verifyLoginUser , function(req, res) {
  event.create(req, res);
});

router.post('/addevent', authController.verifyLoginUser , function(req,res){
  event.save(req,res);
});

router.get('/showevents/:id', authController.verifyLoginUser ,function(req,res){
    event.show(req,res);
});

  router.get('/edit-event/:id', authController.verifyLoginUser ,function(req,res){
    event.edit(req,res);
});
  
  router.post('/update-event/:id', authController.verifyLoginUser ,function(req,res){
    event.update(req,res);
});

router.post('/delete-event/:id', authController.verifyAdmin, function(req,res){
  event.delete(req,res);
});


module.exports = router;