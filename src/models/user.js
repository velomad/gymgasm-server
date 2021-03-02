"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserDetail, {
        as: "details",
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      gymId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Gyms", key: "id" },
      },
      phoneNumber: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );

  // hash the password before saving into DB
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
  });

  return User;
};
