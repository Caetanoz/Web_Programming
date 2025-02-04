var mongoose = require("mongoose");
var Event = require("../models/Events");
var Ticket = require("../models/Ticket_local");
var Ticket_event = require("../models/Ticket_event");
const cookieParser = require('cookie-parser');
var fs = require("fs");
var path = require ("path");

var eventcontroller = {};

//Função para renderizar a página para se criar os eventos
eventcontroller.create = function(req, res) {
  const role = req.cookies['role']
  res.render("Events/addevents", {role: req.cookies.role});
};

//Função para guardar as informações dos eventos na base de dados
eventcontroller.save = async function (req, res) {
  var event = new Event(req.body);

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=e45eae15dc4f4cdba19df52b95a64d0c`;

  console.log(latitude);
  console.log(longitude);

    try {
    const response = await fetch(url);
    const data = await response.json();
    

    event.city = data.features[0].properties.city;
    event.country = data.features[0].properties.country;
    event.address = data.features[0].properties.street;
    
    event.images = req.file.filename
    
    await event.save();


    console.log("Successfully created an event.");
    res.redirect('/events?mensagem=Successfully created an event!!');
  } catch (error) {
    console.log(error);
    res.redirect('/?mensagem= There was an error when creating the event!');
  }
};

//Função para listar os eventos
eventcontroller.list = function(req,res){
  const role = req.cookies['role']
    Event.find().then(function(events){
      console.log("Sucessfully loaded all events!");
      res.render("Events/events", {event: events, role: req.cookies.role});
    }).catch(function(err){
      console.log(err);
    });
  };

//Função para listar o evento em especifico
eventcontroller.show = async function(req,res){
  try {
    const role = req.cookies['role']
    
    const events = await Event.findOne({_id: req.params.id});

    events.totalviews++;

      await events.updateOne({totalviews: events.totalviews});
      console.log(events);
      console.log("Found the Place!");
      res.render("Events/showevents", {event: events, role: req.cookies.role});


  } catch (error) {
    console.log(error);
  }
  };

  //Função para editar os eventos
  eventcontroller.edit = function(req,res){
    const role = req.cookies['role']
    Event.findOne({_id: req.params.id}).then(function(Event){
      console.log(Event);
      console.log("Editing the Place!");
      res.render("Events/editEvents", {event: Event, role: req.cookies.role});
    }).catch(function(err){
      console.log(err);
    });
  };
  
  //Função para atualizar a informação dos eventos da base de dados
  eventcontroller.update = async function(req,res){

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
        res.redirect('/events?mensagem= ERROR')
      }

    Event.findByIdAndUpdate(req.params.id, {$set: { name : req.body.name, address: req.body.address, city: req.body.city, 
    country: req.body.country, latitude: req.body.latitude, longitude: req.body.longitude, type: req.body.type, capacity: req.body.capacity, hasseats : req.body.hasseats,
    firstday: req.body.firstday, lastday: req.body.lastday, hour: req.body.hour,
    duration: req.body.duration, description: req.body.description, 
    price: req.body.price}}, {new: true}).then(function(event){
      if(event){
        res.redirect('/events/showevents/'+ event.id);
      }else {
        res.redirect('/events');
      }
    }).catch(function(err){
      console.log(err);
    });
  };

  //Função para apagar os eventos
  eventcontroller.delete = async function(req,res){
    try {
      
      const event = await Event.findOne({_id: req.params.id});
      const ticket = await Ticket_event.findOne({eventID: event.id});

      if(ticket){
        res.redirect('/?mensagem= Não é possivel eliminar este evento, visto que possui bilhetes!');
      }else{
      event.deleteOne({_id: req.params.id});
      console.log("Events deleted! ");
      res.redirect('/users');
      }
    } catch (error) {
      console.log(error)
      res.redirect('/admin?mensagem= Ocorreu um erro!!!')
    }
  };

module.exports = eventcontroller;