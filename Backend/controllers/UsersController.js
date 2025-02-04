var mongoose = require("mongoose");
var User = require("../models/Users");
const cookieParser = require('cookie-parser');

var usercontroller = {};


//Função para mostrar os utilizadores em especifico
usercontroller.show = function(req,res){
  const role = req.cookies['role']
  User.findOne({ _id: req.params.id}).then(function(User){
    console.log(User);
    console.log("Found the user!");
    res.render("Users/show", {user: User, role: req.cookies.role});
  }).catch(function(err){
    console.log(err);
  });
};

//Função para editar os utilizadores
usercontroller.edit = function(req,res){
  const role = req.cookies['role']
  User.findOne({_id: req.params.id}).then(function(User){
    console.log(User);
    console.log("Found the user!");
    res.render("Users/edit", {user: User, role: req.cookies.role});
  }).catch(function(err){
    console.log(err);
  });
};

//Função para atualizar a informação dos utilizadores
usercontroller.update = function(req,res){
  User.findByIdAndUpdate(req.params.id, {$set: { name : req.body.name, email: req.body.email, birthdate: req.body.birthdate, 
  address: req.body.address, location: req.body.location, nif: req.body.nif, cell: req.body.cell}}, {new: true}).then(function(user){
    if(user){
      res.redirect('/users/show/'+ user.id);
    }else {
      res.redirect('/users/list');
    }
  }).catch(function(err){
    console.log(err);
  });
};


//Função para renderizar a página de registo
usercontroller.register = function(req,res){
  const role = req.cookies['role']
  res.render("Users/register", {role: req.cookies.role});
};

//Função para listar os utilizadores
usercontroller.list = function(req,res){
  const role = req.cookies['role']
  User.find().then(function(users){
    console.log("Sucessfully loaded all employees!");
    res.render("Users/list", {user: users, role: req.cookies.role});
  }).catch(function(err){
    console.log(err);
  });
};

//Função para apagar os utilizadores
usercontroller.delete = function(req,res){
  User.deleteOne({_id: req.params.id}).then(function(){
    console.log("Employee Deleted!");
    res.redirect('/users');
  }).catch(function(err){
    console.log(err);
  });
};

module.exports = usercontroller;
