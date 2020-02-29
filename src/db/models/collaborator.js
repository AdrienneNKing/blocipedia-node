'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborator', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      }

    },
    wikiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Wikis',
        key: 'id',
      }

    }
  }, {});
  Collaborator.associate = function(models) {

    Collaborator.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
  };
  return Collaborator;
};
