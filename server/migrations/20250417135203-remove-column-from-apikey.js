'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('ApiKeys', 'usageCount');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('ApiKeys', 'usageCount', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
