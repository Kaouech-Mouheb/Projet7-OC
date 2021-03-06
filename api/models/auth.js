'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.hasMany(models.Publication, {
                onDelete: 'cascade',
                hooks: true
            });
            models.User.hasMany(models.Like, {
                onDelete: 'cascade',
                hooks: true
            });
            models.User.hasMany(models.Comment, {
                onDelete: 'cascade',
                hooks: true
            });

        }
    };
    Users.init({
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
            isEmail: true,
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notNull: {
                    msg: 'Please enter your name'
                }
            }
        },
        lastName: {
            allowNull: true,
            type: DataTypes.STRING
        },
        birthday: {
            allowNull: true,
            type: DataTypes.STRING
        },
        password: {
            is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
            type: DataTypes.STRING
        },
        avatar: {
            allowNull: true,
            type: DataTypes.STRING
        },

        bio: {
            allowNull: true,
            type: DataTypes.STRING
        },
        isAdmin: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'User',
    });

    return Users;
};