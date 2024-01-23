"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lesson.belongsTo(models.Course, { foreignKey: "courseId", targetKey: "courseId", as: "ListLesson" });
    }
  }
  Lesson.init(
    {
      name: DataTypes.STRING,
      courseId: DataTypes.STRING,
      urlLesson: DataTypes.STRING,
      lessonNumber: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Lesson",
    }
  );
  return Lesson;
};
