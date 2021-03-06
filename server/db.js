const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

let pool = mysql.createPool({
  // host: "localhost",
  // user: process.env.DB_USERNAME,
  // database: process.env.DB,
  // waitForConnections: true,
  // connectionLimit: 10,
  host: "db",
  port: "3306",
  user: "root",
  password: "root",
  database: "OtterTech",
});
console.log("database connected");
pool = pool.promise();

module.exports = pool;
