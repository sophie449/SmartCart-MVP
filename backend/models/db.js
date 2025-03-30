require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

let connection;

const connectWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`🔄 Versuch, Verbindung zur Datenbank herzustellen... (Versuch ${i + 1} von ${retries})`);

      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
      });

      console.log("✅ Verbindung zur Datenbank hergestellt!");
      return connection;
    } catch (error) {
      console.error(`❌ Fehler bei der Verbindung: ${error.message}`);
      if (i < retries - 1) {
        console.log(`⏳ Warte ${delay / 1000} Sekunden bevor erneut versucht wird...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error("❌ Verbindung zur Datenbank fehlgeschlagen, alle Versuche ausgeschöpft.");
        process.exit(1);
      }
    }
  }
};

const initDb = async () => {
  try {
    const connection = await connectWithRetry();

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
    await connection.query(`USE ${process.env.DB_NAME};`);

    const sqlFilePath = path.join(__dirname, 'smartcart.sql');
    if (fs.existsSync(sqlFilePath)) {
      const sql = fs.readFileSync(sqlFilePath, 'utf-8');
      const queries = sql.split(';').filter(Boolean);

      for (let query of queries) {
        if (query.trim()) {
          await connection.query(query.trim() + ';');
        }
      }

      console.log("✅ Datenbank und Tabellen erfolgreich importiert!");
    } else {
      console.log("⚠️ Keine SQL-Datei gefunden, Datenbank nur erstellt.");
    }

    return connection;
  } catch (error) {
    console.error("❌ Fehler bei der Datenbankinitialisierung:", error.message);
    process.exit(1);
  }
};

module.exports = { initDb, getConnection: () => connection };
