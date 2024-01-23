"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Lessons", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      // name: DataTypes.STRING,
      // courseId: DataTypes.STRING,
      // urlLesson: DataTypes.STRING,
      // lessonNumber: DataTypes.INTEGER,
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      courseId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      urlLesson: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lessonNumber: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Lessons");
  },
};
