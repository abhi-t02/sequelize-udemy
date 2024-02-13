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
    const users = generateUsers(10);
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};

function generateUsers(rowCounts) {
  const data = [];
  for (let i = 0; i < rowCounts; i++) {
    data.push({
      name: faker.person.firstName(),
      email: faker.internet.email(),
    });
  }
  return data;
}
