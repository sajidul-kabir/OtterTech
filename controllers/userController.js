const pool = require("../db");

exports.getAllUsers = async (req, res) => {
  const query = "SELECT * FROM users";
  const users = await pool.execute(query);

  res.status(200).json({
    message: "successful",
    data: users[0],
  });
};

exports.getAUser = async (req, res) => {
  const { username } = req.body;
  const username_query = "SELECT * FROM users where username=?";
  const users = await pool.execute(username_query, [username]);

  res.status(200).json({
    message: "successful",
    data: users[0],
  });
};
