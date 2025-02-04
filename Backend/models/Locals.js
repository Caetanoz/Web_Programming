var mongoose = require('mongoose');

var LocalSchema = new mongoose.Schema({
    name: {
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
    city: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Corresponde à cidade do monumento
     */
    country: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Corresponde ao país do monumento
     */
    latitude: {
      type: String,
      require: true,
    },
    /**
     * Corresponde à latitude do endereço do monumento
     */
    longitude: {
      type: String,
      require: true,
    },
    /**
     * Corresponde à longitude do endereço do monumento
     */
    type: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Indica o tipo de monumento
     */
    duration: {
      type: Number,
      require: true,
      default: "none",
    },
    /**
     * Indica a duração da visita no monumento
     */
    description: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Corresponde à descrição sobre o monumento
     */
    pricejuvenil: {
      type: Number,
      require: true,
    },
    /**
     * Indica o preço da criança
     */
    priceadult: {
      type: Number,
      require: true,
    },
    /**
     * Indica o preço do adulto
     */
    pricesenior: {
      type: Number,
      require: true,
    },
    /**
     * Indica o preço do visitante senior
     */
    images: {
      type: String,
      require: true,
      default: "logo.png",
    },
    /**
     * Indica o nome da imagem que será guardada do monumento
     */
    countjuvenil: {
      type: Number,
      default: 0
    },
    /**
     * Corresponde à contagem de bilhetes infantis vendidos
     */
    countadult: {
      type: Number,
      default: 0
    },
    /**
     * Corresponde à contagem de bilhetes adults vendidos
     */
    countsenior: {
      type: Number,
      default: 0
    },
    /**
     * Corresponde à contagem de bilhetes senior vendidos
     */
    totalviews: {
      type: Number,
      default: 0
    },
    /**
     * Corresponde à contagem de pessoas que clicam para ver o local
     */


  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Locals', LocalSchema);