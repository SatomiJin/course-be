import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware";
import CourseController from "../controller/CourseController";
let router = express.Router();

router.post("/create-course", authMiddleWare, CourseController.createCourse);
router.get("/get-detail-course", CourseController.getDetailCourse);
router.get("/get-all-course", CourseController.getAllCourse);
router.put("/update-course", authMiddleWare, CourseController.editCourse);
router.delete("/delete-course", authMiddleWare, CourseController.deleteCourse);
module.exports = router;
