// *********************************************************************************
// api-routes.js - set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
let sequelize = require("sequelize");
const Op = sequelize.Op;

// Routes
// =============================================================
module.exports = function (app, passport) {

  // GET route for getting all of the food data
  app.get("/api/weight", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.weight.findAll({
      where: {
        userId: req.session.passport.user
      }
    }).then(function (dbweight) {
      if (dbweight.length === 0) {
        res.status(404);
      } else {
        res.json(dbweight);
      }
    });
  });

  // POST route for saving a new food entry
  app.post("/api/weight", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    db.weight.create({
      currentweight: req.body.currentweight,
      feels: req.body.feels,
      userId: req.session.passport.user
    }).then(function (dbweight) {
      // We have access inside of the callback function
      res.json(dbweight);
    });
  });


  // DELETE route for deleting items.
  app.delete("/api/weight/:id", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    // Use the sequelize destroy method to delete a record from our table with the
    // id in req.params.id. res.json the result back to the user
    db.weight.destroy({
      where: {
        id: req.params.id,
        userId: req.session.passport.user
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });

  });


  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/weight/:id", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    // Use the sequelize update method to update a food entry to be equal to the value of req.body
    // req.body will contain the id of the todo we need to update
    db.weight.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbweight) {
        res.json(dbweight);
      });
  });

};

