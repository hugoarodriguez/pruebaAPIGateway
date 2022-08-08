var express = require('express');
var router = express.Router();
const apiAdapter = require('./apiAdapter');
var config = require('../config');
//const isValidated = require('../requestValidator');
var nodemailer = require('nodemailer');

const BASE_URL = 'http://localhost:5000/';//Dirección y puerto correspondientes al contenedor del kubernete
const api = apiAdapter(BASE_URL);

// Authorization: Bearer <token>
function verifyToken(req, res, next){
    const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){

        jwt.verify(req.headers['authorization'], config.sk, (err, decoded) => {
            if (err) {
              res.status(403).send("Forbidden")
            } else {
                const bearerToken = bearerHeader.split(" ")[1];
                req.token  = bearerToken;
                next();
            }
          });
    }else{
        res.sendStatus(401);
    }
}

const isValidated = verifyToken;

router.post("/api/login", (req , res) => {
    const user = {
        id: 1,
        nombre : "Henry",
        email: "henry@email.com"
    }

    /*jwt.sign({user}, 'secretkey', {expiresIn: '32s'}, (err, token) => {
        res.json({
            token
        });
    });*/

    res.json({
        'algo': 'algo'
    });

});

//Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pasteleriamoresprueba@gmail.com',
      pass: 'nwxm fckk dgfn vvgh'
    }
  });

  var mensaje = "Hola desde NodeJS... Tu contraseña de es...";

  var mailOptions = {
    from: 'pasteleriamoresprueba@gmail.com',
    to: 'hugorodriguez98@outlook.es',
    subject: 'Asunto Del Correo',
    text: mensaje
  };

router.get('/accountOwners/owner', (req, res) => {
    
    api.get(req.path).then(resp => {
        try {
            res.send(resp.data);
        } catch (error) {
            console.log(error);
        }
    });

    //Enviar correo
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email enviado: ' + info.response);
        }
    });

});

router.get('/weatherforecast', (req, res) => {

    api.get(req.path).then(resp => {
        res.send(resp.data);
    });

});

module.exports = router;