"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = generateFakeCategories(100);

    await queryInterface.bulkInsert("Categories", categories);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};

function generateFakeCategories(rowCounts) {
  const data = [];

  for (let i = 0; i < rowCounts; i++) {
    data.push({
      name: faker.commerce.department(),
      status: faker.helpers.arrayElement([1, 0]),
      categoryImage: faker.image.image(),
    });
  }
  return data;
}
