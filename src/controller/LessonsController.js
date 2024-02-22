import LessonsService from "../services/LessonsService";

const createNewLesson = async (req, res) => {
  try {
    let data = req.body;
    let response = await LessonsService.createNewLesson(data);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getAllLessons = async (req, res) => {
  try {
    let response = await LessonsService.getAllLessons(req.headers.courseid);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getLessonById = async (req, res) => {
  try {
    let response = await LessonsService.getLessonById(req.headers.lessonid, req.headers.courseid);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
module.exports = {
  createNewLesson,
  getAllLessons,
  getLessonById,
};
