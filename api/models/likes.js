'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Likes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Like.hasOne(models.Publication);
        }
    };
    Likes.init({
        like: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        dislike: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }

    }, {
        sequelize,
        modelName: 'Like',
    });

    return Likes;
};