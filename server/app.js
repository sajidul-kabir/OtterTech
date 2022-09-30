const express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
app.use(express.static("./img/blogs/"));
app.use(express.static("./img/users/"));
app.use(cors({ origin: ["http://localhost:8194"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

// REST architecture
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

//Error Handling for all undefined routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//Global Error handler
app.use(globalErrorHandler);

module.exports = app;
