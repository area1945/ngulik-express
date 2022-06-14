const jwt = require("jsonwebtoken");
const models = require("../models")
const User = models.AuthUser

exports.tokenValid = function (req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode){

        if (err) req.user = undefined;

        let user_id = decode.id

        User.findByPk(user_id).
            then((data) => {
                req.user = data;
                next();
            })
            .catch((error) => {
                res.status(500)
                .send({
                  message: error
                });
            });
       
    });
   
}