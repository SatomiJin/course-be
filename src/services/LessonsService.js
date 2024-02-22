import db from "../models/index";
const createNewLesson = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.courseId || !data.urlLesson || !data.lessonNumber) {
        resolve({
          status: "ERROR",
          message: "Missing parameters for creating...",
        });
      } else {
        let checkName = await db.Lesson.findOne({
          where: { name: data.name },
        });
        let course = await db.Course.findOne({
          where: { courseId: data.courseId },
          raw: false,
        });
        let checkLessonNumberPre = await db.Lesson.findOne({
          where: { lessonNumber: data.lessonNumber - 1 },
        });
        let checkLessonNumber = await db.Lesson.findOne({
          where: { lessonNumber: data.lessonNumber },
        });
        let checkCourseId = await db.Course.findOne({
          where: { courseId: data.courseId },
        });
        if (checkName || checkLessonNumber) {
          resolve({
            status: "WARNING",
            message: "The lesson's was existed!",
          });
        }
        if (!checkLessonNumberPre && data.lessonNumber > 1) {
          resolve({
            status: "WARNING",
            message: "No previous lessons...",
          });
        }
        if (!checkCourseId) {
          resolve({
            status: "WARNING",
            message: "The course id not found!",
          });
        }
        if (course) {
          course.lessonCount = course.lessonCount + 1;
          await course.save();
          await db.Lesson.create({
            name: data.name.toUpperCase(),
            courseId: data.courseId,
            urlLesson: data.urlLesson,
            lessonNumber: data.lessonNumber,
          });
          resolve({
            status: "OK",
            message: "Create lesson was successful",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllLessons = (courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let course = await db.Lesson.findAll({
        where: { courseId: courseId },
        include: [
          {
            model: db.Course,
            as: "course",
          },
        ],
        nest: true,
        raw: false,
      });
      resolve({
        status: "OK",
        message: "Get all lessons is success",
        data: course,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getLessonById = (lessonId, courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!lessonId || !courseId) {
        resolve({
          status: "ERROR",
          message: "Missing parameters for get detail...",
        });
      } else {
        let lessonDetail = await db.Lesson.findOne({
          where: { courseId: courseId, id: lessonId },
        });
        if (!lessonDetail) {
          resolve({
            status: "WARNING",
            message: "The lesson is not exist",
          });
        } else {
          resolve({
            status: "OK",
            message: "Get detail's lesson success!",
            data: lessonDetail,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewLesson,
  getAllLessons,
  getLessonById,
};
