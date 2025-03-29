const db = require('../models/db');

exports.getInventory = (req, res) => {
  db.query("SELECT * FROM inventory", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

exports.addItem = (req, res) => {
  const { name, quantity, unit } = req.body;
  db.query("INSERT INTO inventory (name, quantity, unit) VALUES (?, ?, ?)",
    [name, quantity, unit], (err, results) => {
      if (err) throw err;
      res.json({ message: "Artikel hinzugefügt", id: results.insertId });
    }
  );
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM inventory WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.json({ message: "Artikel gelöscht" });
  });
};
