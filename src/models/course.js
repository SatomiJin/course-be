"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.hasMany(models.Lesson, { foreignKey: "courseId", as: "course" });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      courseId: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT("long"),
      urlIntro: DataTypes.STRING,
      lessonCount: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
