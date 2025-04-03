const { getConnection } = require('../models/db');

exports.getAllUsers = async (req, res) => {
  try {
    const connection = getConnection();
    const [users] = await connection.query("SELECT id, firstName, lastName, email, isAdmin FROM users");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const connection = getConnection();
    const { id } = req.params;
    await connection.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "Benutzer erfolgreich gelöscht" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
