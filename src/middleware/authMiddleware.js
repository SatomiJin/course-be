import jwt from "jsonwebtoken";
require("dotenv").config();

const authMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(200).json({
        status: "ERROR",
        message: "User does not have access!!!",
      });
    }
    if (user.role === "R1") {
      next();
    } else {
      return res.status(200).json({
        status: "ERROR",
        message: "Authorized is failed!!",
      });
    }
  });
};

const authUserMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userEmail = req.headers.email;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(200).json({
        status: "ERROR",
        message: "Authorized User is failed!!1",
      });
    }
    if (user.email === userEmail) {
      next();
    } else {
      return res.status(200).json({
        status: "ERROR",
        message: "User Authorize is failed!!2",
      });
    }
  });
};

module.exports = {
  authMiddleWare,
  authUserMiddleWare,
};
