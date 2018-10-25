var db = require("../models");
var moment = require("moment");
let sequelize = require("sequelize");
const Op = sequelize.Op;

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

    app.get("/", loggedIn, function (req, res) {
        console.log("/route");
        db.food.findAll({
            attributes: [
                'calories', 'createdAt'
            ],
            where: {
                userId: req.session.passport.user
            }
        }).then(function (dbCal) {
            db.user.findOne({
                attributes: [
                    'start_weight'
                ],
                where: {
                    id: req.session.passport.user
                }
            }).then(function (dbUser) {
                db.weight.findAll({
                    attributes: [
                        'currentweight', 'id'
                    ],
                    where: {
                        userId: req.session.passport.user
                    }
                }).then(function (dbWeight) {
                    var weightData = [];
                    dbWeight.forEach(weight => {
                        var temp = [
                            weight.id,
                            weight.currentweight
                        ]
                        weightData.push(
                            temp
                        );
                    });
                    console.log(weightData);

                    res.render('index', {
                        cal: dbCal,
                        weight: dbUser.start_weight,
                        weightData: weightData
                    });
                });
            });
            //console.log(req.session.passport.user);
        });
    });

    app.get("/api/weightData", loggedIn, function (req, res) {
        console.log("/route");
        db.weight.findAll({
            attributes: [
                'currentweight', 'createdAt'
            ],
            where: {
                userId: req.session.passport.user
            }
        }).then(function (dbWeight) {
            var weightData = [];
            dbWeight.forEach(weight => {
                var temp = [
                    moment(weight.createdAt).dates(),
                    weight.currentweight
                ]
                weightData.push(
                    temp
                );
            });

            db.food.findAll({
                attributes: [
                    [sequelize.fn('sum', sequelize.col('calories')), 'toalCalories']
                ],
                where: {
                    userId: req.session.passport.user,
                }
            }).then(function (calData) {
                if (calData.length === 0) {
                    res.status(404);
                } else {
                    res.json({
                        calData: calData,
                        weightData: weightData
                    });
                }
            });
        });
    });
}