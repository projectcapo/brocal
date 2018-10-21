// *********************************************************************************
// api-routes.js - set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
let sequelize = require('sequelize');

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the alerts for the current user
    // and then deleting all of those alerts so they won't see them
    // again.
    app.get("/api/alert", function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401);
    }, function(req, res) {
        db.alert.findAll({
            where: {
                userId: req.session.passport.user
            }
        }).then(function(alerts) {
            alerts.forEach(function(alert) {
                db.alert.destroy({
                    where: {
                        id: alert.id
                    }
                });
            });
            res.json(alerts);
        });
    });

    //Create a new alert
    app.post("/api/alert", function(req, res) {
        db.alert.create({
            topic: req.data.topic,
            message: req.data.message,
            userId: req.session.passport.user
        }).then(function(alert) {
            res.json(alert);
        });
    });

    // Delete all alerts for the current user
    app.delete("/api/alert", function(req, res) {
        db.alert.destroy({
            where: {
                userId: req.session.passport.user
            }
        }).then(function(alert) {
            res.json(alert);
        });
    });

    app.get('/api/alert/count', function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401);
    }, function(req, res) {
        db.alert.findAll({
            attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
            where: {
                userId: req.session.passport.user
            }
        }).then(function(alerts) {
            res.json(alerts[0]);
        });
    });

};
