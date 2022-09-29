const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

let pool = mysql.createPool({
  host: "127.0.0.1",
  user: process.env.DB_USERNAME,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 10,
  // host: "db",
  // port: "3306",
  // user: "root",
  // password: "root",
  // database: "OtterTech",
});
//let pool = mysql.createPool(process.env.DATABASE_URL);
console.log("database connected");
pool = pool.promise();

module.exports = pool;
