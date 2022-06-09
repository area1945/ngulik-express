module.exports = app => {

    const prefix = "reference";
    const routeName = "contact";
    const routeController = require("../../controllers/reference/contact.js");
    var router = require("express").Router();

    router.post("/"+prefix+"/"+routeName+"/list", routeController.list);
    router.post("/"+prefix+"/"+routeName+"/create", routeController.create);
    router.put("/"+prefix+"/"+routeName+"/update/:id", routeController.update);
    router.get("/"+prefix+"/"+routeName+"/detail/:id", routeController.detail);
    router.delete("/"+prefix+"/"+routeName+"/delete/:id", routeController.delete);

    app.use(router);
};