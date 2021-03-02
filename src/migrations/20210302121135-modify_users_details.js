"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("UserDetails", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      references: { model: "Users", key: "id" },
    });

    await queryInterface.changeColumn("UserDetails", "name", {
      type: Sequelize.STRING(30),
      allowNull: false,
    });

    await queryInterface.changeColumn("UserDetails", "profileImageUrl", {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn("UserDetails", "bio", {
      type: Sequelize.STRING(70),
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
