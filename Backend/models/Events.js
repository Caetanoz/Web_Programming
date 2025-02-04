var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
    /***
     * Corresponde ao nome do evento
     */
    address: {
      type: String,
      require: true,
    },
    /**
     * Corresponde ao endereço do evento
     */
    city: {
      type: String,
      require: true,
    },
    /**
     * Corresponde á cidade de onde o evento se irá realizar
     */
    country: {
      type: String,
      require: true,
    },
    /**
     * Corresponde ao país de onde o evento se irá realizar
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
    },
    /**
     * Corresponde ao tipo de evento que irá ser criado
     */
    capacity: {
      type: Number,
      require: true,
    },
    /**
     * Corresponde à capacidade de lotação dos bilhetes do evento
     */
    firstday: {
      type: String,
      require: true,
    },
    /**
     * Corresponde ao primeiro dia do evento
     */
    lastday: {
      type: String,
      require: true,
    },
    /**
     * Corresponde ao ultimo dia do evento
     */
    hasseats: {
      type: String,
      require: true,
      default: "Yes"
    },
    /**
     * Indica que o evento terá lugares marcados ou não
     */
    hour: {
      type: String,
      require: true,
    },
    /**
     * Indica a que horas começa o evento
     */
    duration: {
      type: Number,
      require: true,
    },
    /**
     * Indica a duração do evento
     */
    description: {
      type: String,
      require: true,
    },
    /**
     * Indica a descrição sobre o evento
     */
    price: {
      type: Number,
      require: true,
    },
    /**
     * Indica o preço do bilhete do evento
     */
    images: {
      type: String,
      require: true,
      default: "logo.png",
    },
    /**
     * Corresponde à imagem que irá ser guardada para o evento
     */
    count: {
      type: Number,
      default: 0
    },
    /**
     * Corresponde à contagem de bilhetes vendidos
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

module.exports = mongoose.model('Events', EventSchema);