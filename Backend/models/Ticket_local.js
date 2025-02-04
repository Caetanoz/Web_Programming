var mongoose = require('mongoose');

var TicketSchema = new mongoose.Schema({
    userID : {
      type: String,
      require: true,
    },
    /**
     * Corresponde ao id do utilizador que comprou o bilhete
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
     * Corresponde ao nome do utilizador
     */
    localID: {
      type: String,
      require: true,
    },
    /**
     *Corresponde ao id do monumento 
     */
    placename: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Corresponde ao nome do monumento
     */
    address: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Corresponde ao endereço do monumento
     */
    duration: {
      type: Number,
      require: true,
    },
    /**
     * Indica a duração da visita no monumento
     */
    quantityjuvenil: {
      type: Number,
      require: true,
      default: 0,
    },
    /**
     * Indica a quantidade de bilhete que será para crianças
     */
    quantityadult: {
      type: Number,
      require: true,
      default: 0,
    },
    /**
     * Indica a quantidade de bilhete que será para adultos
     */
    quantitysenior: {
      type: Number,
      require: true,
      default: 0,
    },
    /**
     * Indica a quantidade de bilhete que será para idosos
     */
    pricejuvenil: {
      type: Number,
      require: true,
    },
    /**
     * Indica o preço do bilhete que será para crianças
     */
    priceadult: {
      type: Number,
      require: true,
    },
    /**
     * Indica o preço do bilhete que será para adultos
     */
    pricesenior: {
      type: Number,
      require: true,
    },
    /**
     * Indica o preço do bilhete que será para idosos
     */
    fullprice: {
      type: Number,
      require: true,
    },
    /**
     * Indica o preço do bilhete total
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

module.exports = mongoose.model('Ticket_local', TicketSchema);