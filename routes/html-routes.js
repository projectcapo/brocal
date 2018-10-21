// *********************************************************************************
// api-routes.js - set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
let db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  app.get("/", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }, function (req, res) {
    db.user.findOne({
      where: {
        id: req.session.passport.user
      }
    }).then(function (dbUser) {
      let fullName = dbUser.dataValues.firstname + ' ' + dbUser.dataValues.lastname;
      res.render("index", { "user": fullName });
    });

  });

  app.get("/login", function (req, res) {
    // Placeholder empty object being passed in
    res.render("login", { layout: 'login-layout' });
  });

  app.get("/signup", function (req, res) {
    // Placeholder empty object being passed in
    res.render("signup", {});
  });

  app.get("/profile", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }, function (req, res) {
    db.user.findOne({
      where: {
        id: req.session.passport.user
      }
    }).then(function (dbUser) {
      let userData = dbUser;
      userData.male = dbUser.dataValues.sex === "male";
      userData.female = dbUser.dataValues.sex === "female";
      userData.goalEndDate = new Date(dbUser.dataValues.goal_end_date);
      res.render("profile", userData);
    });

  });

};