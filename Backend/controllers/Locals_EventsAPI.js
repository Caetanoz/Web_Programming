var mongoose = require("mongoose");
var Local = require("../models/Locals");
var Event = require("../models/Events");
var Ticket_local = require("../models/Ticket_local");
var Ticket_event = require("../models/Ticket_event");
var User = require("../models/Users");
const cookieParser = require('cookie-parser');

var apiLEcontroller = {};

// API para os Locais
/**
 * 
 * Esta função devolve os locais através da api
 */
apiLEcontroller.listlocals = async function(req, res, next) {
    try {
      const dblocals = await Local.find({}).exec();
      res.json(dblocals);
    } catch (err) {
      console.log('Erro a ler');
      next(err);
    }
  }
  
  /**
 * 
 * Esta função devolve um local especifico através da api
 * recebe o id para verificar qual é o local escolhido
 */
  apiLEcontroller.showlocals = async function(req, res, next) {
    try {
      const dblocal = await Local.findOne({_id: req.params.id}).exec();
      dblocal.totalviews++;

      await dblocal.updateOne({totalviews: dblocal.totalviews});
      res.json(dblocal);
    } catch (err) {
      console.log('Erro a ler');
      next(err);
    }
  }

  /**
 * 
 * Esta função compra o bilhete de um monumento 
 */
  apiLEcontroller.savelocal = async function(req, res, next) {
    try {
      const ticket = new Ticket_local(req.body);
  
      const username = await User.findOne({ nif: ticket.nif });
      if (username) {
        ticket.userID = username.id;
      } else {
        ticket.userID = "";
      }

      
      const ticketpoints = calculateTicketPoints(ticket.fullprice);
      
  
        let user = await User.findOne({ nif: ticket.nif });
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
  
      const local = await Local.findOne({ _id: req.params.id });
      if (!local) {
        throw new Error("Local nÃ£o encontrado.");
      }
  
      ticket.localID = local.id;
      await ticket.save();
  
      console.log(ticket);
    } catch (error) {
      console.log(error);

    }
  };

// API para os Eventos

/**
 * 
 * Esta função devolve os eventos através da api
 */
apiLEcontroller.listevents = async function(req, res, next) {
    try {
      const dbevents = await Event.find({}).exec();
      res.json(dbevents);
    } catch (err) {
      console.log('Erro a ler');
      next(err);
    }
  }
  
  /**
 * 
 * Esta função devolve um evento especifico através da api
 * recebe o id para verificar qual é o evento escolhido
 */
  apiLEcontroller.showevents = async function(req, res, next) {
    try {
      const dbevent = await Event.findOne({_id: req.params.id}).exec();
      dbevent.totalviews++;

      await dbevent.updateOne({totalviews: dbevent.totalviews});
      res.json(dbevent);
    } catch (err) {
      console.log('Erro a ler');
      next(err);
    }
  }

  /**
 * 
 * Esta função compra o bilhete de um evento 
 */
  apiLEcontroller.savevent = async function(req, res, next) {
    try {
      const ticketEvent = new Ticket_event(req.body);
  
      const username = await User.findOne({ nif: ticketEvent.nif });
      if (username) {
        ticketEvent.userID = username.id;
      } else {
        ticketEvent.userID = "";
      }
  
      
      const ticketpoints = calculateTicketPoints(ticketEvent.ticketprice);
      
  
      let user = await User.findOne({ nif: ticketEvent.nif });
        if (user) {
          const totalpoints = updatePoints(ticketpoints, user.points);
          await user.updateOne({points : totalpoints});
        } 
      if(!user){
        
        const newuser = await User.create({
          name: "none",
          email: ticketEvent.email,
          password: "none",
          role: "Client",
          birthdate: "",
          address: "none",
          location: "none",
          nif: ticketEvent.nif,
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
  
      ticketEvent.quantity = ticketEvent.quantity;
      event.capacity -= ticketEvent.quantity;
  
      await event.save();
  
      ticketEvent.eventID = event.id;
      for (let i = 0; i < ticketEvent.quantity; i++) {
        event.count++;
      }

      await event.updateOne({count: event.count});

      await ticketEvent.save();

    } catch (error) {
      console.log(error);
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

module.exports = apiLEcontroller;