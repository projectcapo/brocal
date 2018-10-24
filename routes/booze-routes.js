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
  app.get("/api/booze", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.booze.findAll({
      where: {
        userId: req.session.passport.user
      }
    }).then(function (dbbooze) {
      if (dbbooze.length === 0) {
        res.status(404);
      } else {
        res.json(dbbooze);
      }
    });
  });

  app.get("/api/booze/today", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    var midnightToday = new Date();
    midnightToday.setHours(0, 0, 0, 0);
    // findAll returns all entries for a table when used with no options
    db.booze.findAll({
      where: {
        userId: req.session.passport.user,
        createdAt: {
          [Op.gt]: midnightToday
        }
      }
    }).then(function (dbbooze) {
      if (dbbooze.length === 0) {
        res.status(404);
      } else {
        console.log(dbbooze);
        res.json(dbbooze);
      }
    });
  });

  app.get("/api/booze/today/calories", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    var midnightToday = new Date();
    midnightToday.setHours(0, 0, 0, 0);
    // findAll returns all entries for a table when used with no options
    db.booze.findAll({
      attributes: [
        [sequelize.fn('sum', sequelize.col('calories')), 'toalCalories']
      ],
      where: {
        userId: req.session.passport.user,
        createdAt: {
          [Op.gt]: midnightToday
        }
      }
    }).then(function (dbbooze) {
      if (dbbooze.length === 0) {
        res.status(404);
      } else {
        res.json(dbbooze);
      }
    });
  });

  // POST route for saving a new food entry
  app.post("/api/booze", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.booze.create({
      boozename: req.body.boozename,
      servings: req.body.servings,
      calories: req.body.calories,
      userId: req.session.passport.user
    }).then(function (dbbooze) {
      // We have access inside of the callback function
      res.json(dbbooze);
    });
  });


  // DELETE route for deleting items.
  app.delete("/api/booze/:id", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    // Use the sequelize destroy method to delete a record from our table with the
    // id in req.params.id. res.json the result back to the user
    db.booze.destroy({
      where: {
        id: req.params.id,
        userId: req.session.passport.user
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });

  });


  // PUT route for updating todos. We can get the updated todo data from req.body
  app.put("/api/booze/:id", function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401);
  }, function (req, res) {
    // Use the sequelize update method to update a food entry to be equal to the value of req.body
    // req.body will contain the id of the todo we need to update
    db.booze.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbbooze) {
        res.json(dbbooze);
      });
  });

};

