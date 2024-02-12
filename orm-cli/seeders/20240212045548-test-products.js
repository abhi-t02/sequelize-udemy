"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const items = generateFakeItems(100);

    await queryInterface.bulkInsert("Products", items);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};

function generateFakeItems(rowsCount) {
  const data = [];

  for (let i = 0; i < rowsCount; i++) {
    data.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      amount: faker.commerce.price(),
      status: faker.helpers.arrayElement(["active", "inactive"]),
    });
  }
  return data;
}
