var express = require('express');
var router = express.Router();
var accountOwnerService = require('./accountOwnerService');

router.use((req, res, next) => {
    console.log("Llamado: ", req.path);
    next();
});

router.use(accountOwnerService);

module.exports = router;