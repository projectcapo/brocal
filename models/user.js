module.exports = function (sequelize, Sequelize) {

    var User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        username: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sex: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        height: {
            type: Sequelize.STRING
        },
        start_weight: {
            type: Sequelize.INTEGER
        },
        goal_weight: {
            type: Sequelize.INTEGER
        },
        goal_end_date: {
            type: Sequelize.DATE
        },
        daily_caloric_intake: {
            type: Sequelize.INTEGER
        },
        last_login: {
            type: Sequelize.DATE
        }
    });
    return User;
}