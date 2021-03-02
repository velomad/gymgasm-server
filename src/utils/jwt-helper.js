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

  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    JWT.verify(token, process.env.JWTSECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
};
