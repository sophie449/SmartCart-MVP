const express = require('express');
const cors = require('cors');
const {initDb} = require('./models/db');
const inventoryRoutes = require('./routes/inventoryRoutes');
const app = express();
const port = 3000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());

let connection;

initDb().then(conn => {
  connection = conn;
  app.listen(port, () => {
    console.log(`✅ Server läuft auf Port ${port}`);
  });
}).catch(err => {
  console.error("❌ Fehler beim Initialisieren der Datenbank:", err);
});

app.use('/api/inventory', inventoryRoutes);
