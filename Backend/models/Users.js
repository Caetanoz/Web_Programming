var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  /**
     * Corresponde ao nome do cliente/funcionário/admin
     */  
    name: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Corresponde ao email do utilizador
     */
    email: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Corresponde à palavra-passe do utilizador
     */
    password: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Corresponde ao role do utilizar
     * Se o mesmo é cliente/funcionário/admin
     */
    role: {
      type: String,
      require: true,
      default: "Client",
    },
    /**
     * Indica a data de nascimento do utilizador
     */
    birthdate: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Indica o endereço do utilizador
     */
    address: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Indica o concelho/distrito do utilizador
     */
    location: {
      type: String,
      require: true,
      default: "none",
    },
    /**
     * Corresponde ao nif do utilizador
     */
    nif: {
      type: Number,
      min: 99999999,
      max: 999999999,
      require: true,
    },
    /**
     * Corresponde ao número de telemóvel do utilizador
     */
    cell: {
      type: Number,
      require: true,
      default: null
    },
    /**
     * Corresponde ao número de pontos por compra de do utilizador
     */
    points: {
      type: Number,
      require: true,
      default: 0,
    },
    

  
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', UserSchema);