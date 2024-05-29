'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Recomendation, {
        foreignKey: {
          name: "bookId",
          allowNull: false,
        },
        as: "recomendations"
      });
      this.hasMany(models.ListElement, {
        foreignKey: {
          name: "bookId",
          allowNull: false,
        },
        as: "listElements"
      });
    }
  }
  Book.init({
    apiId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};