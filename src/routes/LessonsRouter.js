import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware";
import LessonsController from "../controller/LessonsController";
let router = express.Router();
router.post("/create-lesson", LessonsController.createNewLesson);
router.get("/get-all-lessons", LessonsController.getAllLessons);
router.get("/get-lesson-by-id", LessonsController.getLessonById);
module.exports = router;
