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
            models.Like.belongsTo(models.Publication, {
                onDelete: 'cascade', 
                foreignKey: { allowNull: false },    //   <-------------
                hooks: true
            })
        }

    };
    Likes.init({
        like: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: 'Like',
    });

    return Likes;
};