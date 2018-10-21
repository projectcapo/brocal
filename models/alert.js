module.exports = function (sequelize, Sequelize) {

    var Alert = sequelize.define('alert', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        topic: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        message: {
            type: Sequelize.STRING,
            notEmpty: true
        }
    });

    Alert.associate = function (models) {
        Alert.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    
    return Alert;
}