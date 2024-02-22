import db from "../models/index";

const createCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.courseId || !data.urlIntro) {
        resolve({
          status: "ERROR",
          message: "Missing parameters for create...",
        });
      } else {
        let checkCourse = await db.Course.findOne({
          where: { courseId: data.courseId },
        });
        let checkCourseName = await db.Course.findOne({
          where: { name: data.name },
        });
        if (checkCourse || checkCourseName) {
          resolve({
            status: "ERROR",
            message: "The Course is existed",
          });
        } else {
          await db.Course.create({
            name: data.name.toUpperCase(),
            courseId: data.courseId,
            image: data.image !== "" ? data.image : "",
            description: data.description,
            urlIntro: data.urlIntro,
            lessonCount: data.lessonCount || 0,
            price: data.price || 0,
          });
          resolve({
            status: "OK",
            message: "Create new course is success!!!",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let courseData = await db.Course.findOne({
        where: { courseId: data.toUpperCase() },
      });
      if (!courseData) {
        resolve({
          status: "ERROR",
          message: "The course ís not found!!",
        });
      } else {
        resolve({
          status: "OK",
          message: "Get detail's course is success!!",
          data: courseData,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCourse = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let courseData = await db.Course.findAll();
      if (!courseData) {
        resolve({
          status: "ERROR",
          message: "The course ís not found!!",
        });
      } else {
        if (courseData && courseData.length > 0) {
          courseData.map((item) => {
            item.image = Buffer.from(item.image, "base64").toString("binary");
          });
        }
        resolve({
          status: "OK",
          message: "Get all courses is successful!!",
          data: courseData,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let editCourse = await db.Course.findOne({
        where: { courseId: data.courseId },
        raw: false,
      });
      if (!editCourse) {
        resolve({
          status: "ERROR",
          message: "The course isn't found!",
        });
      } else {
        editCourse.name = data.name;
        editCourse.courseId = data.courseId;
        editCourse.image = data.image;
        editCourse.urlIntro = data.urlIntro;
        await editCourse.save();
        resolve({
          status: "OK",
          message: "Updated success!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const deleteCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let deleteCourse = await db.Course.findOne({
        where: { courseId: data.courseId },
        raw: false,
      });
      if (!deleteCourse) {
        resolve({
          status: "ERROR",
          message: "The course isn't found!",
        });
      } else {
        await deleteCourse.destroy();
        resolve({
          status: "OK",
          message: "The Course was deleted!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createCourse,
  getDetailCourse,
  editCourse,
  deleteCourse,
  getAllCourse,
};
