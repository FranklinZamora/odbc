// filepath: /c:/Users/fzamora/Documents/Power_Platform_Pages/test-odbc---testingbd/server.js
const express = require('express');
const odbc = require('odbc');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const connectionString = 'DSN=SIPQA;UID=SIPQA;PWD=QU452;';

app.post('/api/track', async (req, res) => {
  const { trackingNumber } = req.body;

  try {
    const connection = await odbc.connect(connectionString);
    const result = await connection.query(`SELECT * FROM BOK_GUIA_HEAD WHERE GH_GUIA_NO = ?`, [trackingNumber]);
    await connection.close();

    if (result.length === 0) {
      res.status(404).json({ error: 'No se encontró la guía' });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});