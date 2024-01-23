import jwt from "jsonwebtoken";
require("dotenv").config();

const accessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "3h",
    }
  );
  return access_token;
};

const refreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "3h" }
  );
  return refresh_token;
};

const refreshTokenService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: "ERROR",
            message: "Authorized fail!",
          });
        }
        let access_token = "";

        if (user && user.email && user.role) {
          access_token = await accessToken({
            email: user.email,
            role: user.role,
          });
        }
        resolve({
          status: "OK",
          message: "Authentication success!!",
          access_token: access_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  accessToken,
  refreshToken,
  refreshTokenService,
};
