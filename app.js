// ==============================
// 📦 ДАННЫЕ
// ==============================
let clients = [];
let editId = null;

// ==============================
// 🎯 DOM
// ==============================
const list = document.getElementById('clientList');
const form = document.getElementById('clientForm');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('addBtn');
const search = document.getElementById('search');
const themeToggle = document.getElementById('themeToggle');

// ==============================
// 🌐 API URL
// ==============================
const API = 'http://localhost:3000/clients';

// ==============================
// 🌓 ТЁМНАЯ ТЕМА
// ==============================
themeToggle.onclick = () => {
  document.body.classList.toggle('dark');
};

// ==============================
// 🪟 МОДАЛКА
// ==============================
addBtn.onclick = () => {
  modal.classList.remove('hidden');
};

modal.onclick = (e) => {
  if (e.target === modal) modal.classList.add('hidden');
};

// ==============================
// 📥 ПОЛУЧИТЬ ДАННЫЕ (GET)
// ==============================
async function loadClients() {
  const res = await fetch(API);
  clients = await res.json();
  render();
}

// ==============================
// 📋 РЕНДЕР
// ==============================
function render(data = clients) {
  list.innerHTML = '';

  data.forEach(client => {
    const row = document.createElement('div');
    row.className = 'table-row';
    row.draggable = true;

    row.innerHTML = `
      <span>${client.name}</span>
      <span>${client.phone}</span>
      <span><span class="status ${client.status}">${client.status}</span></span>
      <span>
        <button onclick="editClient(${client.id})">✏️</button>
        <button onclick="deleteClient(${client.id})">❌</button>
      </span>
    `;

    list.appendChild(row);
  });
}

// ==============================
// ➕ ДОБАВИТЬ / ✏️ РЕДАКТИРОВАТЬ
// ==============================
form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const status = document.getElementById('status').value;

  if (editId) {
    // PUT
    await fetch(`${API}/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, status })
    });

    showToast("Обновлено");
    editId = null;
  } else {
    // POST
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, status })
    });

    showToast("Добавлено");
  }

  form.reset();
  modal.classList.add('hidden');

  loadClients();
});

// ==============================
// ✏️ РЕДАКТИРОВАНИЕ
// ==============================
function editClient(id) {
  const client = clients.find(c => c.id === id);

  document.getElementById('name').value = client.name;
  document.getElementById('phone').value = client.phone;
  document.getElementById('status').value = client.status;

  editId = id;
  modal.classList.remove('hidden');
}

// ==============================
// ❌ УДАЛЕНИЕ
// ==============================
async function deleteClient(id) {
  await fetch(`${API}/${id}`, {
    method: 'DELETE'
  });

  showToast("Удалено");
  loadClients();
}

// ==============================
// 🔍 ПОИСК
// ==============================
search.addEventListener('input', function() {
  const value = this.value.toLowerCase();

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(value)
  );

  render(filtered);
});

// ==============================
// 📊 ФИЛЬТР
// ==============================
function filterStatus(status) {
  if (status === 'all') return render();

  const filtered = clients.filter(c => c.status === status);
  render(filtered);
}

// ==============================
// 💬 TOAST
// ==============================
function showToast(text) {
  const toast = document.getElementById('toast');
  toast.textContent = text;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// ==============================
// 🚀 СТАРТ
// ==============================
loadClients();
