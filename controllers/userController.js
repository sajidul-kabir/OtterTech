const pool = require("../db");

exports.getAllUsers = async (req, res) => {
  const query = "SELECT COUNT(*) FROM users";
  const results = await pool.query(query);
  console.log(results[0]);
};
