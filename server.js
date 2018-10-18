const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
let PORT = process.env.PORT || 8080;

let app = express();

// For Static Content
//var publicDir = path.join(__dirname, 'public');
//app.use("/public", express.static(publicDir))
app.use(express.static("public"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ROUTES 
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Commenting out sequalize code for now
//db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
//});