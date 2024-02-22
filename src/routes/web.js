import express from "express";
import UserRouter from "./UserRouter";
import CourseRouter from "./CourseRouter";
import LessonRouter from "./LessonsRouter";
let router = express.Router();

let initWebRoute = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/course", CourseRouter);
  app.use("/api/lesson", LessonRouter);
};

module.exports = initWebRoute;
