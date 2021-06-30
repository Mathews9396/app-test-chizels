const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

verifyToken = (req,res,next) =>{ 

    let bearerHeader = req.headers['authorization'];
 
    if(!bearerHeader){
        return res.status(403).send({
            message: "No token provided - User is not authorized!"
        })
    }

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(bearerToken, config.secret, (err) => {
            if(err){
                return res.status(401).send({message: "User Unauthorized"})
            }
    })

    next();
}

const authJwt = { verifyToken }

module.exports = authJwt;