"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Courses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      //   name: DataTypes.STRING,
      //   courseId: DataTypes.STRING,
      //   image: DataTypes.STRING,
      //   lessonCount: DataTypes.INTEGER,
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      courseId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      image: {
        type: Sequelize.BLOB("long"),
        allowNull: false,
      },
      lessonCount: {
        type: Sequelize.INTEGER,
        // allowNull: false,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT("long"),
      },
      urlIntro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Courses");
  },
};
