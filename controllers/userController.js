const pool = require("../db");

exports.getAllUsers = async (req, res) => {
  const query = "SELECT COUNT(*) FROM users";
  pool.query(query, (err, results, fields) => {
    if (err) console.log(err);
    console.log(results[0]);
  });
};
