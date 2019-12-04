'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wiki = sequelize.define('Wiki', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull:false
    },
    private: DataTypes.BOOLEAN
  }, {});
  Wiki.associate = function(models) {
    Wiki.hasMany(models.User, {
      foreignKey: "userId",
      as: "users"
    });
  };
  return Wiki;
};
