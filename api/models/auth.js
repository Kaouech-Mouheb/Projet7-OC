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

            models.User.hasMany(models.Like);
            models.User.hasMany(models.Publication);

        }
    };
    Users.init({
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastName: {
            allowNull: true,
            type: DataTypes.STRING
        },
        birthday: {
            allowNull: true,
            type: DataTypes.STRING
        },
        password: DataTypes.STRING,
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