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

  // This route serves the home page when the user loads the site.
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

  // This route serves the login page with the login layout
  // so the user does not see functionality that requires
  // authentication.
  app.get("/login", function (req, res) {
    res.render("login", { layout: 'login-layout' });
  });

  // This route serves the signup page with the login layout
  // so the user does not see functionality that requires
  // authentication.
  app.get("/signup", function (req, res) {
    res.render("signup", { layout: 'login-layout' });
  });

  // This route serves the profile form where the user can
  // update/change their information.
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

  // This route serves the alcohol page
  app.get("/alcohol", function (req, res, next) {
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
      res.render("alcohol", {});
    });

  });

  // Default route if no others match
  // this will send the user to the homepage
  // or to the login screen if they are not
  // athenticated with passport.
  app.get("*", function (req, res, next) {
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
      res.render("index", userData);
    });
  });
};

