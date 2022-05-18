const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const pool = mysql.createPool({
  host: "localhost",
  user: process.env.DB_USERNAME,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 10,
});
console.log("database connected");

module.exports = pool;
