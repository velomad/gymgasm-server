"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhotoPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhotoPost.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
      caption: { type: DataTypes.STRING(70) },
    },
    {
      sequelize,
      modelName: "PhotoPost",
      timestamps: true,
    }
  );
  return PhotoPost;
};
