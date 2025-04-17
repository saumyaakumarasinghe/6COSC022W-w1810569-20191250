'use strict';

module.exports = (sequelize, DataTypes) => {
  const ApiKeyInteraction = sequelize.define('ApiKeyInteraction', {
    apiKeyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    log: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  ApiKeyInteraction.associate = (models) => {
    ApiKeyInteraction.belongsTo(models.ApiKey, {
      foreignKey: 'apiKeyId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    ApiKeyInteraction.belongsTo(models.User, {
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return ApiKeyInteraction;
};
