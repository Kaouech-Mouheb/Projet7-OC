'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Publications extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Publication.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false,
                }
            })
            models.Publication.hasMany(models.Like,{
                onDelete: 'cascade',
                hooks: true
            });

        }

    };
    Publications.init({
        content: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        attachment: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    }, {
        sequelize,
        modelName: 'Publication',
    });

    return Publications;
};