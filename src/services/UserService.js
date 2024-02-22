import db from "../models/index";
import bcrypt from "bcrypt";
import { accessToken, refreshToken } from "./JwtService";

const signUp = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password || !data.phoneNumber || !data.firstName || !data.lastName || !data.gender) {
        resolve({
          status: "ERROR",
          message: "Missing parameter....",
        });
      } else {
        let emailChecker = await db.User.findOne({
          where: { email: data.email },
        });
        if (emailChecker) {
          resolve({
            status: "ERROR",
            message: "The email is already!!",
          });
        } else {
          if (data.password !== data.confirmPassword) {
            resolve({
              status: "WARNING",
              message: "The password and confirmPassword is not equal!",
            });
          } else {
            let hasPass = bcrypt.hashSync(data.password, 15);
            let newUser = await db.User.create({
              email: data.email,
              password: hasPass,
              phoneNumber: data.phoneNumber,
              firstName: data.firstName,
              lastName: data.lastName,
              gender: data.gender,
              role: data && data.role ? data.role : "R2",
              image: data.image || "",
            });
            if (newUser) {
              resolve({
                status: "OK",
                message: "Sign up is successfully!",
              });
            } else {
              resolve({
                status: "ERROR",
                message: "Sign up fail, try again!",
              });
            }
          }
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

const signIn = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password) {
        resolve({
          status: "ERROR",
          message: "Missing parameters for login...",
        });
      }
      let checkUser = await db.User.findOne({
        where: { email: data.email },
      });
      if (!checkUser) {
        resolve({
          status: "ERROR",
          message: "User is not defined!!",
        });
      }
      let comparePassword = bcrypt.compareSync(data.password, checkUser.password);
      if (!comparePassword) {
        resolve({
          status: "ERROR",
          message: "Email or password is wrong!!",
        });
      }

      const access_token = await accessToken({
        email: checkUser.email,
        role: checkUser.role,
      });
      const refresh_token = await refreshToken({
        email: checkUser.email,
        role: checkUser.role,
      });
      resolve({
        status: "OK",
        message: "Login success!!",
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: data.email },
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      if (!user) {
        resolve({
          status: "ERROR",
          message: "User is not defined",
        });
      }
      if (user && user.image) {
        user.image = Buffer.from(user.image, "base64").toString("binary");
        resolve({
          status: "OK",
          message: "Get detail user success!!!",
          data: user,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkUser = await db.User.findOne({
        where: { email: data.email },
        raw: false,
      });
      if (!checkUser) {
        resolve({
          status: "ERROR",
          message: "User is not found!!",
        });
      } else {
        checkUser.phoneNumber = data.phoneNumber;
        checkUser.firstName = data.firstName;
        checkUser.lastName = data.lastName;
        checkUser.gender = data.gender;
        checkUser.image = data.image;
        checkUser.role = data.role;
        await checkUser.save();
        resolve({
          status: "OK",
          message: "The updated user was successful!!!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!email) {
        resolve({
          status: "ERROR",
          message: "The email can't find",
        });
      } else {
        let userDelete = await db.User.findOne({
          where: { email: email },
          raw: false,
        });
        if (!userDelete) {
          resolve({
            status: "ERROR",
            message: "The email can't find",
          });
        } else {
          await userDelete.destroy();
          resolve({
            status: "OK",
            message: "User is deleted",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  signUp,
  signIn,
  getDetailUser,
  updateUser,
  deleteUser,
};
