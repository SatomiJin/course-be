import UserService from "../services/UserService";
const signUp = async (req, res) => {
  try {
    let response = await UserService.signUp(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const signIn = async (req, res) => {
  try {
    let response = await UserService.signIn(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getDetailUser = async (req, res) => {
  try {
    let response = await UserService.getDetailUser(req.headers);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let response = await UserService.updateUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    let response = await UserService.deleteUser(req.header.email);
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
  signUp,
  signIn,
  getDetailUser,
  updateUser,
  deleteUser,
};
