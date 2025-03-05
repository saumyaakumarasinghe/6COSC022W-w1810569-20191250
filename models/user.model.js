'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Define associations here
        }
    }

    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your name'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Email address already in use'
            },
            validate: {
                isEmail: {
                    msg: 'Please enter a valid email address'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your password'
                }
            }
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users'
    });

    return User;
};