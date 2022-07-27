// Authorization: Bearer <token>
function verifyToken(req, res, next){
    const bearerHeader =  req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){

        jwt.verify(req.headers['authorization'], config.secret, (err, decoded) => {
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