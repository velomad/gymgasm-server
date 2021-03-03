const { json, urlencoded } = require("express");
const express = require("express");
const createError = require("http-errors");
const app = express();
require("dotenv").config();
// require("./utils/init-redis")

// middlewares
app.use(json());
app.use(urlencoded({ extended: true }));

// unviersal routes
app.use("/api/v1", require("./src/universal-api/routes/routes.isTaken"));

// GYM APP 
app.use("/api/v1/gym/auth", require("./src/Gym-app/routes/routes.auth"));
app.use("/api/v1/gym/member", require("./src/Gym-app/routes/routes.gymMember"));
app.use("/api/v1/gym/attendance", require("./src/Gym-app/routes/routes.attendance"));

// USER APP
app.use("/api/v1/user/auth", require("./src/User-app/routes/routes.auth"));
app.use("/api/v1/user/profile", require("./src/User-app/routes/routes.profile"));

// error handling middleware

app.use(async (req, res, next) => {
  //   const error = new Error("not found");
  //   error.status = 404;
  //   next(error);
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const port = process.env.port || 5000;
app.listen(port, () => console.log(`connected at port : ${port}`));
