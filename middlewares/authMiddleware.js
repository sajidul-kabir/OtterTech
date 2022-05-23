const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

//Middleware for protecting routes from non logged in users
exports.protectRoute = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null)
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
