'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    articleId: DataTypes.INTEGER
  },{});

  comment.associate = function(models) {
    // defining 1:M relationship for article and comments
    models.comment.belongsTo(models.article)
  }

  return comment;
};