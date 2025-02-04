var express = require('express');
var router = express.Router();

var local = require("../controllers/LocalsController.js");
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

router.get('/', authController.verifyLoginUser , function(req, res, next) {
    local.list(req,res);
});

router.get('/create-local', authController.verifyLoginUser ,function(req, res) {
  local.create(req, res);
});

router.post('/addlocal', authController.verifyLoginUser , function(req,res){
  local.save(req,res);
});

router.get('/showlocals/:id', authController.verifyLoginUser , function(req,res){
    local.show(req,res);
});

  router.get('/localedit/:id', authController.verifyLoginUser ,function(req,res){
    local.edit(req,res);
});
  
  router.post('/update/:id', authController.verifyLoginUser , function(req,res){
    local.update(req,res);
});

router.post('/delete-local/:id', authController.verifyAdmin,function(req,res){
  local.delete(req,res);
});

module.exports = router;