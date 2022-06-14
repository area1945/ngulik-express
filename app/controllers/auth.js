const models = require("../models")
const User = models.AuthUser
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        },
    }).
    then((data) => {

            let status_code = 401;
            let message = "User Not found.";
            let dataResponse = {};

            if (data) {
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    data.password
                );

                if (!passwordIsValid) {
                    message = "Invalid Password!";
                }else{

                    var token = jwt.sign({
                        id: data.id
                    }, process.env.API_SECRET, {
                        expiresIn: 86400
                    });

                    status_code = 200;
                    message = "Login successfull";
                    dataResponse = {
                        accessToken: token
                    }

                }

                

            }

            let response = {
                "message": message,
                "data": dataResponse,
            }
            res.status(status_code).send(response);
            
        })
        .catch((error) => {
            console.log(error);
        });
}