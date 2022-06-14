module.exports = app => {

    var router = require("express").Router();
    const routeController = require("../controllers/auth.js");

    router.post("/auth/login", routeController.login);

    app.use(router);
};