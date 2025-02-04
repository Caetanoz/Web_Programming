var express = require('express');
var router = express.Router();
var path = require('path');

var authController = require('../controllers/auth.js');
var authAPI = require("../controllers/AuthAPI.js");
var API_LE = require("../controllers/Locals_EventsAPI.js")
var user = require("../controllers/UsersController.js");
var ticket = require("../controllers/TicketsController.js");

/**
 * Retorna a lista dos locais em json
 */
router.get('/local', API_LE.listlocals );
/**
 * Recebe o id de um local
 * Retorna o local escolhido em json
 */
router.get('/local/show/:id', API_LE.showlocals);
/**
 * Recebe o id de um local
 * Guarda a compra do bilhete
 */
router.post('/local/tickets/:id', API_LE.savelocal);
/**
 * Retorna a lista dos eventos em json
 */

router.get('/events', API_LE.listevents);
/**
 * Recebe o id de um evento
 * Retorna o evento escolhido em json
 */
router.get('/events/show/:id', API_LE.showevents);
/**
 * Recebe o id de um evento
 * Guarda a compra do bilhete
 */
router.post('/events/tickets/:id', API_LE.savevent);
/**
 * Realiza a verificação do login do utilizador
 * Retorna a autenticação [true or false] e a token
 */
router.post('/auth/login', authAPI.login);
/**
 * Realiza o logout
 */
router.get('/logout',  authController.logout ); 
/**
 * Cria uma conta para o utilizador
 */
router.post('/register', authAPI.register);

router.get('/perfil/:id', authAPI.Userperfil);


/**
 * Recebe o nome da imagem que pretende
 * Retorna a imagem
 */
router.get('/images/:name', (req,res)=>{
    const imageName = req.params.name;
    console.log(imageName )
    if (!imageName) {
        return res.status(400).send('Nome da imagem não fornecido');
      }
    
    const imagePath = path.join(__dirname, '../public/images', imageName);
    
    

  // Verifica se o arquivo existe
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('Imagem não encontrada');
    }
  });

});




module.exports = router;