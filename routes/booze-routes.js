// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
let sequelize = require('sequelize');
const Op = sequelize.Op;

// Routes
// =============================================================
module.exports = function (app, passport) {

  // Get all booze records
  app.get("/api/booze", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    db.booze.findAll({
      where: {
        userId: req.session.passport.user
      }
    }).then(function (booze) {
      res.json(booze);
    });
  });

  // Get all booze records created on the current day
  app.get("/api/booze/today", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    db.booze.findAll({
      where: {
        userId: req.session.passport.user,
        createdAt: {
          [Op.gt]: new Date()
        }
      }
    }).then(function (booze) {
      res.json(booze);
    });
  });

  // for posting new booze records
  // body format: 
  // booze: {
  //    boozename: "Jack Daniels",
  //    servings: 3,
  //    calories: 350
  // }
  // Calories are per serving.
  app.post("/api/booze", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    db.booze.create({
      boozename: req.data.boozename,
      servings: req.data.servings,
      calories: req.data.calories,
      userId: req.session.passport.user
    });
  });

  app.put("/api/booze", function (req, res, next) { 

  });

  // GET route for getting all of the todos
  //app.get("/api/XXXX", function(req, res) {
  // findAll returns all entries for a table when used with no options
  //});

  // POST route for saving a new todo
  //app.post("/api/XXXXX", function(req, res) {
  // create takes an argument of an object describing the item we want to
  // insert into our table. In this case we just we pass in an object with a text
  // and complete property

  //  });

  // DELETE route for deleting items.
  //  app.delete("/api/XXXX/:id", function(req, res) {
  // Use the sequelize destroy method to delete a record from our table with the
  // id in req.params.id. res.json the result back to the user
  //  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  //  app.put("/api/XXXX", function(req, res) {
  // Use the sequelize update method to update a todo to be equal to the value of req.body
  // req.body will contain the id of the todo we need to update
  //  });
};

