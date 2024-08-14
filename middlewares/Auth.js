const jwt = require("jsonwebtoken");

module.exports = function LoginRequired(req, res, next){
    // res.send(req.headers.authorization.split(" ")[0]);
    if (
        req.headers && req.headers.authorization &&
        req.headers.authorization.split(" ")[0] == "Bearer"
    ) {
        res.user = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWTKey)
        // res.send(res.user);
        next()
    } else {                                                                                                                                                                         
        res.send("Not authenticated !")
    }                                                                                                                                                                    
}