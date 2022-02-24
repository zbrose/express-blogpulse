'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.article.belongsTo(models.author)
      models.article.hasMany(models.comment)
    }
  }
  article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'article',
  });
  return article;
};