"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      gymId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Gyms", foreignKey: "id" },
      },
      username: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING(13),
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileImage: {
        type: DataTypes.STRING,
      },
      bio: {
        type: DataTypes.STRING(70),
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
};
