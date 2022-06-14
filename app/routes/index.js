module.exports = app => {
    require("./reference/contact.js")(app);
    require("./reference/note.js")(app);
    require("./auth.js")(app);
};