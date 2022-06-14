'use strict';

const bcrypt = require("bcrypt");
const faker = require('faker');

const authuser = [...Array(100)].map((authuser) => (
  {
    fullname: faker.name.findName(),
    email: faker.internet.email(),
    role: "admin",
    password: bcrypt.hashSync("P@assw0rd!", 8),
    createdAt : new Date(),
    updatedAt : new Date()
  }
))


module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkDelete('authusers', null, {});
    return queryInterface.bulkInsert('authusers', authuser, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('authusers', null, {});
  }
};
