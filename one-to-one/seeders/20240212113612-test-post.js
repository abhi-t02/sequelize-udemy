"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     
     */
    const posts = generatePosts(10);
    await queryInterface.bulkInsert("Posts", posts, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Posts", null, {});
  },
};

function generatePosts(rowCounts) {
  const data = [];

  for (let i = 0; i < rowCounts; i++) {
    data.push({
      name: faker.lorem.word(),
      content: faker.lorem.text(),
    });
  }
  return data;
}
