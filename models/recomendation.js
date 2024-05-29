'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recomendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'recommenderId',
        // through: 'userWhoRecomends',
        as: 'userWhoRecomends'
      });

      this.belongsTo(models.User, {
        foreignKey: 'recommendedToId',
        // through: 'userWhoGetsRecomended',
        as: 'userWhoGetsRecomended'
      });

      this.belongsTo(models.Book, {
        foreignKey: "bookId",
        as: "book"
      })

    }
  }
  Recomendation.init({
    content: DataTypes.STRING,
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recommenderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }, recommendedToId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Recomendation',
  });
  return Recomendation;
};