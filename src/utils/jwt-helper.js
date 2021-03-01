const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.JWTSECRET;
      const options = {
        expiresIn: "1y",
        issuer: "test.com",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) return reject(err);
        resolve(token);
      });
    });
  },
};
