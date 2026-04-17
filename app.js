
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

function saveToStorage() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

function renderClients(filtered = clients) {
  const list = document.getElementById('clientList');
  list.innerHTML = '';

  filtered.forEach(client => {
    const li = document.createElement('li');

    li.innerHTML = `
      <strong>${client.name}</strong> (${client.phone})<br>
      Статус: ${client.status}
      <button onclick="deleteClient(${client.id})">Удалить</button>
    `;

    list.appendChild(li);
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
