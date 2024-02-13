"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     *
     */
    const comments = generateComments(20);
    await queryInterface.bulkInsert("comments", comments, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
    await queryInterface.bulkDelete("comments", null, {});
  },
};

function generateComments(rowCounts) {
  const data = [];

  for (let i = 0; i < rowCounts; i++) {
    data.push({
      comment_text: faker.lorem.text(),
      postId: faker.number.int({
        max: 10,
        min: 1,
      }),
    });
  }
  return data;
}
