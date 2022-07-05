const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

//Middleware for protecting routes from non logged in users
exports.protectRoute = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (token === null || token === undefined)
    return res.json({
      message: "NOT LOGGED IN",
    });
  jwt.verify(token, process.env.ACCESSKEY, (err, user) => {
    if (err)
      return res.json({
        message: "WRONG TOKEN",
      });
    req.user = user;
    next();
  });
};
