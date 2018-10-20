module.exports = function (sequelize, Sequelize) {

    var Weight = sequelize.define('weight', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        currentweight: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },
        weighedtime: {
            type: Sequelize.DATE,
            notEmpty: true
        },
        feels: {
            type: Sequelize.STRING,
            notEmpty: true
        },
    });
    Weight.associate = function (models) {
        Weight.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Weight;
}