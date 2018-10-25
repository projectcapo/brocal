const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const env = require('dotenv').load();

let PORT = process.env.PORT || 8080;
let app = express();

let db = require("./models");

// For Static Content
app.use(express.static("public"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Load Passport Strategies 
require('./config/passport/passport.js')(passport, db.user);

// serialize and deserialize user
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  db.user.findById(id, function(err, user){
      if(!err){
         done(null, user);
      }else{
         done(err, null);
      }
    });
});

// ROUTES 
require("./routes/profile-routes.js")(app, passport);
require("./routes/weight-routes.js")(app);
require("./routes/food-routes.js")(app);
require("./routes/booze-routes.js")(app);
require("./routes/alert-routes.js")(app);
require("./routes/graph-routes")(app);
require("./routes/html-routes.js")(app);

// Commenting out sequalize code for now
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
