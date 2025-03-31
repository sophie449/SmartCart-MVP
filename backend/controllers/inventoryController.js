const { getConnection } = require('../models/db');

exports.getInventory = async (req, res) => {
  try {
    const connection = getConnection();
    const [results] = await connection.query("SELECT * FROM inventory");
    res.json(results);
  } catch (err) {
    console.error("❌ Fehler bei der Datenbankabfrage:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.addItem = async (req, res) => {
  const { name, quantity, unit } = req.body;
  try {
    const connection = getConnection();
    const [results] = await connection.query(
      "INSERT INTO inventory (name, quantity, unit) VALUES (?, ?, ?)",
      [name, quantity, unit]
    );
    res.json({ message: "Artikel hinzugefügt", id: results.insertId });
  } catch (err) {
    console.error("❌ Fehler beim Hinzufügen:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = getConnection();
    const [results] = await connection.query("DELETE FROM inventory WHERE id = ?", [id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: `Artikel mit ID ${id} nicht gefunden.` });
    }

    res.json({ message: "Artikel gelöscht" });
  } catch (err) {
    console.error("❌ Fehler beim Löschen:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, quantity, unit } = req.body;

  try {
    const connection = getConnection();
    const [results] = await connection.query(
      "UPDATE inventory SET name = ?, quantity = ?, unit = ? WHERE id = ?",
      [name, quantity, unit, id]
    );

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: `Artikel mit ID ${id} nicht gefunden.` });
    }

    res.json({ message: "Artikel erfolgreich aktualisiert" });
  } catch (err) {
    console.error("❌ Fehler beim Aktualisieren:", err.message);
    res.status(500).json({ error: err.message });
  }
};
