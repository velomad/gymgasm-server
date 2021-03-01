"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class Gym extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gym.init(
    {
      gymId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true,
        // validate: {
        //   min: {
        //     args: 10,
        //     msg: "Invalid Phone Number",
        //   },
        // },
      },
      lat: {
        type: DataTypes.DECIMAL(10, 8),
      },
      lon: {
        type: DataTypes.DECIMAL(11, 8),
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: "Gym",
      timestamps: true,
    }
  );

  // hash the password before saving into DB
  Gym.beforeCreate(async (gym) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(gym.password, salt);
    gym.password = hashedPassword;
  });

  return Gym;
};
