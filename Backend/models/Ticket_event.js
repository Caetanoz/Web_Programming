var mongoose = require('mongoose');

var TicketeventSchema = new mongoose.Schema({
    userID : {
      type: String,
      require: true,
    },
    /**
     * Indica o id do utilizador que comprou o bilhete
     */
    employeeID : {
      type: String,
      require: true,
    },
    /**
     * Indica o id do funcionário que comprou o bilhete
     */
    username: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Indica o nome do utlizador
     */
    eventID: {
      type: String,
      require: true,
    },
    /**
     * Indica o id do evento que foi comprado
     */
    placename: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Indica o nome do evento
     */
    address: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Indica o nome do endereço do evento
     */
    duration: {
      type: Number,
      require: true,
    },
    /**
     * Indica a duração do evento
     */
    quantity: {
      type: Number,
      require: true,
      default: 0,
    },
    /**
     * Indica a quantidade de bilhetes que foi comprado
     */
    ticketprice: {
      type: Number,
      require: true,
    },
    /**
     * Indica o preço do bilhete
     */
    seat: {
      type: Number,
      require: true,
    },
    /**
     * Indica o lugar do bilhete no caso de ser um evento com lugares marcados
     */
    nif:{
      type: Number,
      require: true
    },
    /**
     * Indica o nif do comprador
     */

  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket_event', TicketeventSchema);