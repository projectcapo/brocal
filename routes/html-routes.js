const path = require("path");

module.exports = function (app) {

  app.get("/", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }, function (req, res) {
    // Placeholder empty object being passed in
    res.render("index", {});
  });

  app.get("/login", function (req, res) {
    // Placeholder empty object being passed in
    res.render("login", {});
  });

};