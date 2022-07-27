var express = require("express");
var app = express();
var router = require('./routers/router');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.send("Prueba de API Gateway");
});

app.use(router);

console.log("Prueba de API Gateway corriendo en localhost:3000");

app.listen(3000);