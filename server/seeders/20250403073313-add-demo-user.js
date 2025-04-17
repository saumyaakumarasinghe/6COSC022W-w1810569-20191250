'use strict';

const { ROLE } = require('../constants');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Saumya',
        lastName: 'Kumarasinghe',
        mobile: '0701454255',
        email: 'saumya.20191250@iit.ac.lk',
        password:
          '$2b$12$99UE8eiRzjAcPI/v7A6mUeVv1A5VG2N6hDqq9Y3pK9txNZhoIQSIa', //TODO remove this 123456
        lastActivateAt: new Date(),
        role: ROLE.ADMIN,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    console.log('User seeded successfully!');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: { [Sequelize.Op.eq]: 'saumya.20191250@iit.ac.lk' },
    });

    console.log('User removed from database.');
  },
};
