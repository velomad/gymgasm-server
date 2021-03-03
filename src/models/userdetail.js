"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    static associate(models) {
      // UserDetail.belongsTo(models.User, { foreignKey: "userId", as: "detail" });
    }
  }
  UserDetail.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "User", key: "id" },
      },
      name: { type: DataTypes.STRING(30), allowNull: false },
      profileImageUrl: DataTypes.STRING,
      bio: DataTypes.STRING(70),
    },
    {
      sequelize,
      modelName: "UserDetail",
      timestamps : true
    }
  );
  return UserDetail;
};
