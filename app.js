console.log('JS работает')
let clients = JSON.parse(localStorage.getItem('clients')) || [];

if (editId) {
  clients = clients.map(c =>
    c.id === editId ? { ...c, name, phone, status } : c
  );
  editId = null;
} else {
  clients.push({
    id: Date.now(),
    name,
    phone,
    status
  });
}

const addBtn = document.getElementById('addBtn');
const formContainer = document.getElementById('formContainer');

addBtn.addEventListener('click', () => {
  formContainer.classList.toggle('hidden');
});

const toggle = document.getElementById('themeToggle');

toggle.onclick = () => {
  document.body.classList.toggle('dark');
};

let editId = null;

function editClient(id) {
  const client = clients.find(c => c.id === id);

  document.getElementById('name').value = client.name;
  document.getElementById('phone').value = client.phone;
  document.getElementById('status').value = client.status;

  editId = id;
  formContainer.classList.remove('hidden');
}


function showToast(text) {
  const toast = document.getElementById('toast');
  toast.textContent = text;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}
showToast("Клиент добавлен");
function filterStatus(status) {
  if (status === 'all') {
    renderClients();
    return;
  }

  const filtered = clients.filter(c => c.status === status);
  renderClients(filtered);
}

function saveToStorage() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

function renderClients(filtered = clients) {
  const list = document.getElementById('clientList');
  list.innerHTML = '';

  filtered.forEach(client => {
    const row = document.createElement('div');
    row.className = 'table-row';
<button onclick="editClient(${client.id})">✏️</button>
    row.innerHTML = `
      <span>${client.name}</span>
      <span>${client.phone}</span>
      <span><span class="status ${client.status}">${client.status}</span></span>
      <span>
        <button onclick="deleteClient(${client.id})">❌</button>
      </span>
    `;

    list.appendChild(row);
  });
}


function deleteClient(id) {
  clients = clients.filter(c => c.id !== id);
  saveToStorage();
  renderClients();
}

document.getElementById('search').addEventListener('input', function() {
  const value = this.value.toLowerCase();

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(value)
  );

  renderClients(filtered);
});

renderClients();


row.draggable = true;

row.addEventListener('dragstart', () => {
  row.classList.add('dragging');
});

row.addEventListener('dragend', () => {
  row.classList.remove('dragging');
});

const container = document.getElementById('clientList');

container.addEventListener('dragover', e => {
  e.preventDefault();

  const dragging = document.querySelector('.dragging');
  container.appendChild(dragging);
});
