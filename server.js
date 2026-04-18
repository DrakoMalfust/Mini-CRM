// ==============================
// 🚀 НАСТРОЙКА
// ==============================
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ==============================
// 📦 ДАННЫЕ (вместо базы)
// ==============================
let clients = [];

// ==============================
// 📋 GET — получить всех
// ==============================
app.get('/clients', (req, res) => {
  res.json(clients);
});

// ==============================
// ➕ POST — добавить
// ==============================
app.post('/clients', (req, res) => {
  const client = {
    id: Date.now(),
    ...req.body
  };

  clients.push(client);
  res.json(client);
});

// ==============================
// ❌ DELETE — удалить
// ==============================
app.delete('/clients/:id', (req, res) => {
  const id = Number(req.params.id);

  clients = clients.filter(c => c.id !== id);

  res.json({ success: true });
});

// ==============================
// 🔄 PUT — обновить
// ==============================
app.put('/clients/:id', (req, res) => {
  const id = Number(req.params.id);

  clients = clients.map(c =>
    c.id === id ? { ...c, ...req.body } : c
  );

  res.json({ success: true });
});

// ==============================
// ▶️ СТАРТ
// ==============================
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
