"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gymId: {
        type: Sequelize.INTEGER,
        references: { model: "Gyms", key: "id" },
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(13),
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profileImage: {
        type: Sequelize.STRING,
      },
      bio: {
        type: Sequelize.STRING(70),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
