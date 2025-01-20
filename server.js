const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbConfig = {
  user: 'SIPQA',
  password: 'QU452',
  connectString: '(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.10.53)(PORT=1521)))(CONNECT_DATA=(SERVICE_NAME=SIPDESA)))'
};

app.post('/api/track', async (req, res) => {
  const { trackingNumber } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM BOK_GUIA_HEAD WHERE GH_GUIA_NO = :trackingNumber`,
      [trackingNumber]
    );
    await connection.close();

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No se encontró la guía' });
    } else {
      res.json(result.rows);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});