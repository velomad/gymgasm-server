"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Attendance.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      gymId: {
        type: DataTypes.INTEGER,
        references: { model: "Gyms", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "Attendance",
      timestamps: true,
    }
  );
  return Attendance;
};
