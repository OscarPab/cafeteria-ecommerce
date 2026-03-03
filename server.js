const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-360', (req, res) => {
  console.log('🔄 Generando imágenes 360°...');
  
  exec('npm run generate-360', (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: error.message });
    }
    console.log('Output:', stdout);
    res.json({ success: true, output: stdout });
  });
});

app.listen(3001, () => {
  console.log('🚀 Servidor de generación 360° corriendo en http://localhost:3001');
});