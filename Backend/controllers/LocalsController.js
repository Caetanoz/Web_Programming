var mongoose = require("mongoose");
var Local = require("../models/Locals");
const cookieParser = require('cookie-parser');
const Ticket_local = require("../models/Ticket_local");
var fs = require("fs");
var path = require ("path");

var localcontroller = {};

//Função para renderizar a página para se criar os monumentos
localcontroller.create = function(req, res) {
  const role = req.cookies['role']
  res.render("Locals/addlocals", {role: req.cookies.role});
};

//Função para guardar as informações dos monumentos na base de dados
localcontroller.save = async function (req, res) {
  var local = new Local(req.body);

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=e45eae15dc4f4cdba19df52b95a64d0c`;

  try {
    const response = await fetch(url);
    const data = await response.json();


    local.city = data.features[0].properties.city;
    local.country = data.features[0].properties.country;
    local.address = data.features[0].properties.street;

    local.images = req.file.filename;

    await local.save();

    console.log("Successfully created a local.");
    res.redirect('/locals?mensagem=Successfully created an local!!');
  } catch (error) {
    console.log(error);
    res.redirect('/?mensagem= There was an error when creating the local!');
  }
};


//Função para listar os monumentos
localcontroller.list = function(req,res){
  const role = req.cookies['role']
    Local.find().then(function(locals){
      console.log("Sucessfully loaded all locals!");
      res.render("Locals/locals", {local: locals, role: req.cookies.role});
    }).catch(function(err){
      console.log(err);
    });
  };

  //Função para listar o monumento em especifico
localcontroller.show = async function(req,res){
  try {
    const role = req.cookies['role']
    
    const locals = await Local.findOne({_id: req.params.id});

      locals.totalviews++;

      await locals.updateOne({totalviews: locals.totalviews});
      console.log(locals);
      console.log("Found the Place!");
      res.render("Locals/showlocals", {local: locals, role: req.cookies.role});


  } catch (error) {
    console.log(error);
  }
  };

//Função para editar os monumentos
  localcontroller.edit = function(req,res){
    const role = req.cookies['role']
    Local.findOne({_id: req.params.id}).then(function(Local){
      console.log(Local);
      console.log("Editing the Place!");
      res.render("Locals/localedit", {local: Local, role: req.cookies.role});
    }).catch(function(err){
      console.log(err);
    });
  };
  
//Função para atualizar a informação dos monumentos da base de dados
  localcontroller.update = async function(req,res){

    try {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=e45eae15dc4f4cdba19df52b95a64d0c`;

    const response = await fetch(url);
    const data = await response.json();


    req.body.city = data.features[0].properties.city;
    req.body.country = data.features[0].properties.country;
    req.body.address = data.features[0].properties.street;
    } catch (error) {
      console.log(error);
      res.redirect('/locals?mensagem= ERROR')
    }

    Local.findByIdAndUpdate(req.params.id, {$set: { name : req.body.name, address: req.body.address, 
    city: req.body.city, country: req.body.country, latitude: req.body.latitude, longitude: req.body.longitude, type: req.body.type, 
    duration: req.body.duration, description: req.body.description, pricejuvenil: req.body.pricejuvenil,
    priceadult: req.body.priceadult, pricesenior: req.body.pricesenior}}, {new: true}).then(function(local){
      if(local){
        res.redirect('/locals/showlocals/'+ local.id);
      }else {
        res.redirect('/locals');
      }
    }).catch(function(err){
      console.log(err);
    });
  };

//Função para apagar os monumentos
localcontroller.delete = async function(req,res){
  try {
    
    const local = await Local.findOne({_id: req.params.id});
    const ticket = await Ticket_local.findOne({ localID: local.id});

    if(ticket){
      res.redirect('/?mensagem= Não é possivel eliminar este local, visto que possui bilhetes!');
    }else{
    local.deleteOne({_id: req.params.id});
    console.log("Local deleted! ");
    res.redirect('/');
    }
  } catch (error) {
    console.log(error)
    res.redirect('/admin?mensagem= Ocorreu um erro!!!')
  }
};

module.exports = localcontroller;