'use strict';

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Comment.belongsTo(models.Publication, {
                onDelete: 'cascade',
                foreignKey: {
                    allowNull: false
                }, //   <-------------
                hooks: true
            })
        }

    };
    Comments.init({
        comment: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        lastName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        avatar: {
            allowNull: true,
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'Comment',
    });

    return Comments;
};