'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ListElement,
        {
          foreignKey: {
            name: "userId",
            allowNull: false,
          },
          as: "listElements"
        }
      );

      this.hasMany(models.Recomendation, {
        // through: "recomendationsToMe",
        foreignKey: {
          name: "recommendedToId",
          allowNull: false,
        },
        as: "recomendationsReceived"
      });

      this.hasMany(models.Recomendation, {
        // through: "recomendationsByMe",
        foreignKey: {
          name: "recommenderId",
          allowNull: false,
        },
        as: "recomendationsMade"
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};