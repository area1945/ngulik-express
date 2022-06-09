const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var db = require('./app/models');

var corsOptions = {
  origin: "http://localhost:"+process.env.APP_PORT
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// load application routes
require("./app/routes/index.js")(app);

// set port, listen for requests
const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`Server is running on port ${PORT}.`);
});
