const pool = require("../db");

exports.getAllUsers = async (req, res) => {
  const query = "SELECT * FROM users";
  const users = await pool.execute(query);

  res.status(200).json({
    message: "successful",
    data: users[0],
  });
};
