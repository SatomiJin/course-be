import express from "express";
import UserRouter from "./UserRouter";
import CourseRouter from "./CourseRouter";
let router = express.Router();

let initWebRoute = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/course", CourseRouter);
};

module.exports = initWebRoute;
