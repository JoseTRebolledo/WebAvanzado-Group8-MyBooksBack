'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListElement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      this.belongsTo(models.Book, {
        foreignKey: 'bookId',
        as: 'book',
      });
    }
  }
  ListElement.init({
    state: DataTypes.STRING,
    score: {
      type: DataTypes.INTEGER,
      validate: {
        max: 10,
        min: 1
      }

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ListElement',
  });
  return ListElement;
};