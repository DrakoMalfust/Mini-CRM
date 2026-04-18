// ==============================
// 📦 ХРАНИЛИЩЕ
// ==============================
let clients = JSON.parse(localStorage.getItem('clients')) || [];
let editId = null;

// ==============================
// 🎯 DOM ЭЛЕМЕНТЫ
// ==============================
const list = document.getElementById('clientList');
const form = document.getElementById('clientForm');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('addBtn');
const search = document.getElementById('search');
const themeToggle = document.getElementById('themeToggle');

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

// Закрытие по клику вне окна
modal.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
};

// ==============================
// 💾 СОХРАНЕНИЕ
// ==============================
function save() {
  localStorage.setItem('clients', JSON.stringify(clients));
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

    // DRAG START
    row.addEventListener('dragstart', () => {
      row.classList.add('dragging');
    });

    // DRAG END
    row.addEventListener('dragend', () => {
      row.classList.remove('dragging');
    });

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
// ➕ ДОБАВЛЕНИЕ / РЕДАКТИРОВАНИЕ
// ==============================
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const status = document.getElementById('status').value;

  if (editId) {
    clients = clients.map(c =>
      c.id === editId ? { ...c, name, phone, status } : c
    );
    showToast("Клиент обновлён");
    editId = null;
  } else {
    clients.push({
      id: Date.now(),
      name,
      phone,
      status
    });
    showToast("Клиент добавлен");
  }

  save();
  render();

  modal.classList.add('hidden');
  form.reset();
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
function deleteClient(id) {
  clients = clients.filter(c => c.id !== id);
  save();
  render();
  showToast("Удалено");
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
// 🧲 DRAG & DROP
// ==============================
list.addEventListener('dragover', e => {
  e.preventDefault();

  const dragging = document.querySelector('.dragging');
  if (dragging) list.appendChild(dragging);
});

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
render();
