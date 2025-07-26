document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const actionsDiv = document.getElementById('actions');
  const userDisplay = document.getElementById('userDisplay');
  const activityLog = document.getElementById('activityLog');

  const user = localStorage.getItem('user');
  if (user) {
    showActions(user);
    loadActivities();
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
      localStorage.setItem('user', username);
      logActivity('Inicio de sesión');
      showActions(username);
      loadActivities();
    }
  });
});

function showActions(username) {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('actions').classList.remove('hidden');
  document.getElementById('userDisplay').textContent = username;
}

function logActivity(action) {
  const user = localStorage.getItem('user');
  const timestamp = new Date().toLocaleString();
  const entry = `${timestamp} - ${user}: ${action}`;

  let logs = JSON.parse(localStorage.getItem('activityLog')) || [];
  logs.unshift(entry); 
  localStorage.setItem('activityLog', JSON.stringify(logs));

  loadActivities();
}

function loadActivities() {
  const activityLog = document.getElementById('activityLog');
  activityLog.innerHTML = '';
  const logs = JSON.parse(localStorage.getItem('activityLog')) || [];

  logs.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry;
    activityLog.appendChild(li);
  });
}

function clearActivities() {
  localStorage.removeItem('activityLog');
  loadActivities();
}

function logout() {
  localStorage.removeItem('user');
  location.reload();
}
