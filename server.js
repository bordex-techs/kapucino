// Kapucino Banka - Opsiyonel Bagimsiz Node.js Sunucusu
// Eger Render, Railway, Glitch veya kendi sunucunuzda calistirmak isterseniz bu dosyayi kullanabilirsiniz.
// GitHub Pages kullaniyorsaniz hicbir sunucu calistirmaniza gerek YOKTUR, index.html otomatik bulut senkronizasyonu yapar!

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.static(__dirname));

// Ilk veritabani dosyasi kontrolu
if (!fs.existsSync(DB_FILE)) {
  const initialDB = {
    users: [
      { username: "admin", password: "Yc544936.", plan: "ultra", balance: 50000, lastSalary: 1729612800000, createdAt: 1729612800000, iban: "TR56 0009 9012 3456 7890 01", cardNo: "4532 9988 7766 0001" },
      { username: "yusuf", password: "123", plan: "ultra", balance: 3500, lastSalary: 1729612800000, createdAt: 1729612800000, iban: "TR56 0009 9012 3456 7890 02", cardNo: "4532 7788 1234 5678" }
    ],
    requests: [],
    cardRequests: [],
    listings: [],
    transactions: [],
    settings: { salaryMultiplier: 1 },
    lastUpdated: Date.now()
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2), 'utf8');
}

// Veritabanini Oku
app.get('/api/db', (req, res) => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Veritabani okunamadi' });
  }
});

// Veritabanini Kaydet
app.post('/api/db', (req, res) => {
  try {
    const newDB = req.body;
    newDB.lastUpdated = Date.now();
    fs.writeFileSync(DB_FILE, JSON.stringify(newDB, null, 2), 'utf8');
    res.json({ success: true, lastUpdated: newDB.lastUpdated });
  } catch (err) {
    res.status(500).json({ error: 'Veritabani kaydedilemedi' });
  }
});

app.listen(PORT, () => {
  console.log(`☕ Kapucino Banka sunucusu http://localhost:${PORT} portunda calisiyor!`);
});
