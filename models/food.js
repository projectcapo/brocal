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
        mealcategory: {
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
        models.food.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Food;
}