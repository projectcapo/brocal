// *********************************************************************************
// api-routes.js - set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app, passport) {

  app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
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

  app.put('/api/profile', function(req, res){
    db.user.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

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
