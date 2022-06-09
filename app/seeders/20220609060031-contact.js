'use strict';

const faker = require('faker');

const contacts = [...Array(100)].map((contact) => (
  {
    name : faker.name.firstName(),
    email : faker.internet.email(),
    phone : faker.phone.phoneNumber(),
    website : faker.internet.domainName(),
    address : faker.address.city(),
    createdAt : new Date(),
    updatedAt : new Date()
  }
))

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkDelete('contacts', null, {});
    return queryInterface.bulkInsert('contacts', contacts, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('contacts', null, {});
  }
};
