var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
const apiAdapter = require('./apiAdapter');
var config = require('../config');

const BASE_URL = 'http://localhost:27722';
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

router.post("/api/users/Login", (req , res) => {
    try {
        
        api.post(req.path, req.body).then(resp => {

            var user = {
                IdUser : resp.data
            }

            if(user.IdUser > 0){
                jwt.sign({user}, config.sk, {expiresIn: '32s'}, (err, token) => {
                    res.json({
                        "data": user,
                        token
                    });
                });
            } else{
                res.json(user);
            }
        });
        
    } catch (error) {
        console.log(error);
    }
});


router.get('/api/users/GetUserByEmail', isValidated, (req, res) => {

    try {
        api.get(req.path,{
            params: {
                email: req.query.email,
            }
        }).then(resp => {
            res.send(resp.data);
        });
        
    } catch (error) {
        console.log(error);
    }
    

});

module.exports = router;