const express = require('express');
const cors = require('cors');
const inventoryRoutes = require('./routes/inventoryRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/inventory', inventoryRoutes);

app.listen(port, () => {
  console.log(`✅  Server läuft auf Port ${port}`);
});
