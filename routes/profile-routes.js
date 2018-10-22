// *********************************************************************************
// api-routes.js - set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app, passport) {
  // Passport Routes
  // ===========================================================
  app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
      res.redirect('/login');
    });
  });

  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login'
  }
  ));

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/login'
  }
  ));
  // Passport routes end
  // ===========================================================


  // API calls -- NO POST because all users are created by passport.
  // No parameters for ID because the user can only work with their 
  // own profile which is maintained by passport.
  // ===============================================================
  app.get('/api/profile', function (req, res) {
    db.user.findOne({
      where: {
        id: req.session.passport.user
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.put('/api/profile', function (req, res) {
    db.user.update(
      req.body,
      {
        where: {
          id: req.session.passport.user
        }
      }).then(function (dbUser) {
        res.status(200).end();
      });
  });
  // END Api Calls
  // ===============================================================

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }

};

