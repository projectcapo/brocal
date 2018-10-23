// *********************************************************************************
// food-routes.js - set of routes for displaying and saving "food" data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
function loggedIn(req, res, next) {
  if (req.user) {
      next();
  } else {
      res.redirect('/login');
  }
}
// Routes
// =============================================================
module.exports = function (app, passport) {
  // GET route for getting all of the food entries
  app.get("/api/food",loggedIn, function (req, res) {
    db.food.findAll({
      limit: 10,
      //include: [db.user.name]
      //var query = {};
      /*     if (req.session.passport.user) {
            query.UserId = req.session.passport.user;
          } */
      where: {
        userId: req.session.passport.user
      }
    }).then(function (dbFood) {
      res.json(dbFood);
    });
    //console.log(req.session.passport.user);
  });

  // Get route for Displaying HTML view of Food log entry by User.
  app.get("/view/food", loggedIn, function(req, res) {
      db.food.findAll({
      limit: 10,
      where: {
        userId: req.session.passport.user
      }
    }).then(function (dbFood) {
      res.render("food", dbFood);
    });
    //console.log(req.session.passport.user);
  });


  // Get route for retrieving a single food entry
   app.get("/view/food/:id", function(req, res) {
      db.food.findOne({
        where: {
          id: req.params.id,
          //userid: req.session.passport.user
        }
      }).then(function(dbFood) {
        console.log(dbFood);
        res.render(dbFood);
      });
    });

  // POST route for saving a food entry
   app.post("/api/food", function(req, res) {
     let dataObj = req.body
     // req.session.passport.user
    dataObj["userId"]= req.session.passport.user;
     console.log(dataObj);
      db.food.create(dataObj).then(function(dbFood) {
       res.json(dbFood);
     });
   });
 
  // DELETE route for deleting food entries
  /*  app.delete("/api/food/:id", function(req, res) {
     db.Food.destroy({
       where: {
         id: req.params.id
       }
     }).then(function(dbFood) {
       res.json(dbFood);
     });
   }); */

  // PUT route for updating food entries
   app.put("/api/food", function(req, res) {
     db.food.update(
       req.body,
       {
         where: {
           id: req.body.id,
           userId: req.session.passport.user
         }
       }).then(function(dbFood) {
       res.json(dbFood);
     });
   });

};
