module.exports = function (sequelize, Sequelize) {

    var Food = sequelize.define('food', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        foodname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        foodtype: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        foodcategory: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        servings: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        calories: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        consumedtime: {
            type: Sequelize.DATE,
            notEmpty: true
        }
    });
    Food.associate = function (models) {
        Food.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Food;
}