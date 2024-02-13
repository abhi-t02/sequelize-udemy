"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const userroles = generateUserRoles(10);
    await queryInterface.bulkInsert("UserRoles", userroles, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
    await queryInterface.bulkDelete("UserRoles", null, {});
  },
};

function generateUserRoles(rowsCounts) {
  const data = [];

  for (let i = 0; i < rowsCounts; i++) {
    data.push({
      userId: faker.number.int({
        min: 1,
        max: 10,
      }),
      roleId: faker.number.int({
        max: 3,
        min: 1,
      }),
    });
  }
  return data;
}
