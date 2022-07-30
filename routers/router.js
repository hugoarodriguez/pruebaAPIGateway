var express = require('express');
var router = express.Router();
var accountOwnerService = require('./accountOwnerService');
var pruebaUserService = require('./pruebaUserService');

router.use((req, res, next) => {
    console.log("Llamado: ", req.path);
    next();
});

router.use(pruebaUserService);
router.use(accountOwnerService);

module.exports = router;