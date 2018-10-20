module.exports = function (sequelize, Sequelize) {

    var Booze = sequelize.define('booze', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        boozename: {
            type: Sequelize.STRING,
            allowNull: false
        },
        boozetype: {
            type: Sequelize.STRING
        },
        boozecategory: {
            type: Sequelize.STRING,
        },
        servings: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        calories: {
            type: Sequelize.INTEGER
        },
        consumedtime: {
            type: Sequelize.DATE
        }
    });

    Booze.associate = function (models) {
        Booze.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Booze;
}



//Booze.belongsTo(User, {foreignKey: 'user_id'});
//User.hasMany(Booze, {foreignKey: 'booze__id'});