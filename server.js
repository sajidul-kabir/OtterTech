const mysql = require("mysql2/promise");
const app = require("./app");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "OtterTech",
});
console.log("database connected");

app.listen(4000, () => {
  console.log("server started");
});
