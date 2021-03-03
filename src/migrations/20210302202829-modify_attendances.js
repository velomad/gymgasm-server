"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("Attendances", "userId", {
      type: Sequelize.INTEGER,
      foreignKey: true,
      references: { model: "Users", key: "id" },
    });

    await queryInterface.changeColumn("Attendances", "gymId", {
      type: Sequelize.INTEGER,
      foreignKey: true,
      references: { model: "Gyms", key: "id" },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
