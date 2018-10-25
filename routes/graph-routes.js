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
                    res.render('index', {
                        cal: dbCal,
                        weight: dbUser.start_weight,
                        weightData: weightData
                    });
                });
            });
        });
    });

    app.get("/api/weightData", loggedIn, function (req, res) {
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
                    'calories', 'createdAt'
                ],
                where: {
                    userId: req.session.passport.user,
                }
            }).then(function (calData) {
                var calorieData = [];
                calData.forEach(foodRecord => {
                    var index = -1;
                    for(var i = 0; i < calorieData.length; i++){
                        if(calorieData[i][0] == moment(foodRecord.createdAt).dates()){
                            index = i;
                            break;
                        }
                    }
                    if(index != -1){
                        calorieData[index][1] = parseInt(calorieData[index][1]) + parseInt(foodRecord.calories);
                    }else{
                        var temp = [
                            moment(foodRecord.createdAt).dates(),
                            foodRecord.calories
                        ]
                        calorieData.push(
                            temp
                        );
                    }
                });
                res.json({
                    weightData: weightData,
                    calData: calorieData
                });
            });
        });
    });
}