const { json, urlencoded } = require("express");
const express = require("express");
const app = express();
const createError = require("http-errors");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const helmet = require("helmet");
const compression = require("compression");

require("dotenv").config();
// require("./utils/init-redis")

// Image handler
const fileStorage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("imageUrl")
);
app.use(helmet());
app.use(compression());

// unviersal routes
app.use("/api/v1", require("./src/universal-api/routes/routes.uni"));

// GYM APP
app.use("/api/v1/gym/auth", require("./src/Gym-app/routes/routes.auth"));
app.use("/api/v1/gym/member", require("./src/Gym-app/routes/routes.gymMember"));
app.use(
  "/api/v1/gym/attendance",
  require("./src/Gym-app/routes/routes.attendance")
);

// USER APP
app.use("/api/v1/user/auth", require("./src/User-app/routes/routes.auth"));
app.use(
  "/api/v1/user/profile",
  require("./src/User-app/routes/routes.profile")
);
app.use(
  "/api/v1/user/attendance",
  require("./src/User-app/routes/routes.attendance")
);
app.use("/api/v1/user/post", require("./src/User-app/routes/routes.post"));

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
