import CourseService from "../services/CourseService";

const createCourse = async (req, res) => {
  try {
    let response = await CourseService.createCourse(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getDetailCourse = async (req, res) => {
  try {
    let response = await CourseService.getDetailCourse(req.headers.id);
    return res.status(200).json(response);
  } catch (e) {
    console.log("error", e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getAllCourse = async (req, res) => {
  try {
    let response = await CourseService.getAllCourse();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const editCourse = async (req, res) => {
  try {
    let response = await CourseService.editCourse(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    let response = await CourseService.deleteCourse(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
module.exports = {
  createCourse,
  getDetailCourse,
  editCourse,
  deleteCourse,
  getAllCourse,
};
