var mongoose = require("mongoose");
var Ticket = require("../models/Ticket_local");
var Ticket_event = require("../models/Ticket_event");
var Event = require("../models/Events");
var Local = require("../models/Locals");
var User = require("../models/Users");
const cookieParser = require('cookie-parser');

var ticketcontroller = {};


// Função para criar bilhetes para eventos
ticketcontroller.createEvent = async function(req,res){
  try {
    const role = req.cookies['role']
    const event = await Event.findOne({_id: req.params.id});
    const user = await User.find();

    console.log(event);
    console.log("Let´s buy the ticket for the Event!");
    res.render("Events/checkout-event", {ticket: event, user: user, role: req.cookies.role});
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

// Função para criar bilhetes para os monumentos
ticketcontroller.createLocal = async function(req,res){
  try {
    const role = req.cookies['role']
    const local = await Local.findOne({_id: req.params.id});
    const user = await User.find();

    console.log(local);
    console.log("Let´s buy the ticket for the Event!");
    res.render("Locals/checkout-local", {ticket: local, user: user, role: req.cookies.role});
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

// Função que gera um número de lugar random para o bilhete do evento.
// O número varia com a capacidade de lugares do evento.
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Calcula os pontos que o utilizador recebe pelos bilhetes comprados.
function calculateTicketPoints(ticketprice) {
  const pointsPerInterval = 5;
  const intervalValue = 10;
  
  const roundedTicketPrice = Math.floor(ticketprice);
  const completeIntervals = Math.floor(roundedTicketPrice / intervalValue);
  const ticketpoints = completeIntervals * pointsPerInterval;
  
  return ticketpoints;
}


function updatePoints(ticketpoints, userpoints) {
  // Verifica se os pontos são números válidos
  if (typeof ticketpoints !== 'number' || typeof userpoints !== 'number') {
    throw new Error('Os pontos devem ser números válidos.');
  }
  const totalPoints = ticketpoints + userpoints;

  return totalPoints;
}

  // Função que guarda na base de dados o bilhete para o evento.
  ticketcontroller.savevent = async function(req, res, next) {
    try {
      const ticketEvent = new Ticket_event(req.body);
  
        const userbuyer = await User.findOne({ nif: req.body.nif });
      if (userbuyer) {
        ticketEvent.userID = userbuyer.id;
      } else {
        ticketEvent.userID = "";
      }
      
      const employee = await User.findOne({ name: req.body.username });
      if (employee) {
        ticketEvent.employeeID = employee.id;
      } else {
        ticketEvent.employeeID = "";
      }
      
      const ticketpoints = calculateTicketPoints(req.body.ticketprice);
      
  
      let user = await User.findOne({ nif: req.body.nif });
        if (user) {
          const totalpoints = updatePoints(ticketpoints, user.points);
          await user.updateOne({points : totalpoints});
        } 
      if(!user){
        
        const newuser = await User.create({
          name: "none",
          email: req.body.email,
          password: "none",
          role: "Client",
          birthdate: "",
          address: "none",
          location: "none",
          nif: req.body.nif,
          cell: 910000009,
          points: ticketpoints,
        });
      }
  
      const event = await Event.findOne({ _id: req.params.id });
      if (!event) {
        throw new Error("Evento não encontrado.");
      }
  
      if (event.hasseats === 'Yes') {
        ticketEvent.seat = getRandomInt(event.capacity);
      } else {
        ticketEvent.seat = '';
      }
  
      if (event.capacity <= 0) {
        throw new Error("Não há mais lugares disponíveis.");
      }
  
      ticketEvent.quantity = req.body.quantity;
      event.capacity -= ticketEvent.quantity;
      ticketEvent.eventID = event.id;
      for (let i = 0; i < ticketEvent.quantity; i++) {
        event.count++;
      }
  
      await event.save();
  
      ticketEvent.eventID = event.id;

      ticketEvent.eventID = event.id;
      for (let i = 0; i < ticketEvent.quantity; i++) {
        event.count++;
      }

      await event.updateOne({count: event.count});
  
      await ticketEvent.save();
  
      console.log("Successfully bought a ticket!");
      res.redirect('/?mensagem=Successfully bought a ticket!');
    } catch (error) {
      console.log(error);
      res.redirect('/events?mensagem=You couldn´t buy a ticket!');
    }
  };
  
  
  
  

  // Função que guarda na base de dados o bilhete para o monumento.
  ticketcontroller.savelocal = async function(req, res, next) {
    try {
      const ticket = new Ticket(req.body);
  
      if(req.body.nif){
        const username = await User.findOne({ nif: req.body.nif });
      if (username) {
        ticket.userID = username.id;
      } else {
        ticket.userID = "";
      }
      }

      const employee = await User.findOne({ name: req.body.username });
      if (employee) {
        ticket.employeeID = employee.id;
      } else {
        ticket.employeeID = "";
      }
      
      const ticketpoints = calculateTicketPoints(req.body.fullprice);
      
  
      let user = await User.findOne({ nif: req.body.nif });
        if (user) {
          const totalpoints = updatePoints(ticketpoints, user.points);
          await user.updateOne({points : totalpoints});
        } 
      if(!user){
        const newuser = await User.create({
          name: "none",
          email: req.body.email,
          password: "none",
          role: "Client",
          birthdate: "",
          address: "none",
          location: "none",
          nif: req.body.nif,
          cell: 910000009,
          points: ticketpoints,
        });
      }
  
  
      const local = await Local.findOne({ _id: req.params.id });
      if (!local) {
        throw new Error("Local não encontrado.");
      }
      
      const totaljuvenil = ticket.quantityjuvenil;
      const totaladult = ticket.quantityadult;
      const totalsenior = ticket.quantitysenior;
      
      for (let i = 0; i < totaljuvenil; i++) {
        local.countjuvenil++;
      }
      for (let i = 0; i < totaladult; i++) {
        local.countadult++;
      }
      for (let i = 0; i < totalsenior; i++) {
        local.countsenior++;
      }

      await local.updateOne({countjuvenil: local.countjuvenil, countadult: local.countadult, countsenior: local.countsenior});
      
      ticket.localID = local.id;
      await ticket.save();
  
      console.log(ticket);
      console.log("Ticket criado com sucesso!");
      res.redirect('/?mensagem=Successfully bought a ticket!');
    } catch (error) {
      console.log(error);
      res.redirect('/locals?mensagem=You couldn´t buy a ticket!');

    }
  };

  //Função que lista os bilhetes
  ticketcontroller.show = async function(req, res) {
    try {
      const role = req.cookies['role']
      const user = await User.findOne({ _id: req.params.id });
      const ticket_local = await Ticket.find({userID: user.id});
      const ticket_event = await Ticket_event.find({userID: user.id});
      
      console.log(ticket_local);
      console.log("Ingressos carregados com sucesso!");
      res.render("Tickets/tickets", { ticket: ticket_local, ticketevents: ticket_event, user: user , role: req.cookies.role});
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  };

  ticketcontroller.showMTL = async function(req, res) {
    try {
      const role = req.cookies['role']
      const ticket_local = await Ticket.findOne({_id : req.params.id});
      
      console.log(ticket_local);
      console.log("Ingressos carregados com sucesso!");
      res.render("Tickets/multitickets_locals", { ticket: ticket_local, role: req.cookies.role});
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  };

  //Função que apresenta os vários bilhetes, dependendo da quantidade que foi comprada pelo employee
  ticketcontroller.showMTE = async function(req, res) {
    try {
      const role = req.cookies['role']
      const ticket_event = await Ticket_event.findOne({_id: req.params.id});
      
      console.log("Ingressos carregados com sucesso!");
      res.render("Tickets/multitickets_events", { ticketevents: ticket_event, role: req.cookies.role});
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  };

  // Função que apaga os bilhetes de eventos
  ticketcontroller.deletevent = async function(req, res) {
    try {
      const tickets = await Ticket_event.findOne({_id: req.params.id});
      const ticketevent = await Event.findOne({_id: tickets.eventID});
      ticketevent.capacity += tickets.quantity;
      await ticketevent.updateOne({capacity: ticketevent.capacity});

      tickets.deleteOne({_id : req.params.id});
      console.log("Tickets deleted! ");
      res.redirect('/users');

    } catch (err) {
      console.log(err);
      res.redirect('/users');
    }
  };
  
  // Função que apaga os bilhetes de monumentos
  ticketcontroller.deletelocal = async function(req,res){
    try {
      const ticket = await Ticket.findOne({_id: req.params.id});

      ticket.deleteOne({_id : req.params.id});
      console.log("Tickets deleted! ");
      res.redirect('/users');

    } catch (err) {
      console.log(err);
      res.redirect('/users');
    }
  };


module.exports = ticketcontroller;