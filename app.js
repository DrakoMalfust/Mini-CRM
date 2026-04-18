console.log('JS работает')
let clients = JSON.parse(localStorage.getItem('clients')) || [];


document.getElementById('clientForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const status = document.getElementById('status').value;

  const client = {
    id: Date.now(),
    name,
    phone,
    status
  };

  clients.push(client);
  saveToStorage();
  renderClients();

  this.reset();
});

const addBtn = document.getElementById('addBtn');
const formContainer = document.getElementById('formContainer');

addBtn.addEventListener('click', () => {
  formContainer.classList.toggle('hidden');
});

function saveToStorage() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

function renderClients(filtered = clients) {
  const list = document.getElementById('clientList');
  list.innerHTML = '';

  filtered.forEach(client => {
    const row = document.createElement('div');
    row.className = 'table-row';

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
