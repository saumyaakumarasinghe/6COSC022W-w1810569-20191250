'use strict';

module.exports = (sequelize, DataTypes) => {
  const ApiKey = sequelize.define('ApiKey', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Define association here
  ApiKey.associate = (models) => {
    ApiKey.belongsTo(models.User, {
      foreignKey: 'userId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return ApiKey;
};
