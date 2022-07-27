var express = require('express');
var router = express.Router();
const apiAdapter = require('./apiAdapter');
var config = require('../config');
//const isValidated = require('../requestValidator');

const BASE_URL = 'http://localhost:24912/';
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


router.get('/accountOwners/owner', isValidated, (req, res) => {

    api.get(req.path).then(resp => {
        res.send(resp.data);
    });

});

module.exports = router;