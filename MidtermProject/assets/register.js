// assets/scripts.js\n\n// (Base scripts placeholder)\n

// --- User registration & login (client-side simulation) ---
function getUsers(){
  return JSON.parse(localStorage.getItem('gentry_users') || '[]');
}
function saveUsers(users){
  localStorage.setItem('gentry_users', JSON.stringify(users));
}

function registerUser(name, email, password){
  const users = getUsers();
  if(users.find(u => u.email.toLowerCase() === email.toLowerCase())){
    return { success: false, message: 'Email is already registered.' };
  }
  const user = { id: 'u-' + Date.now(), name, email, password };
  users.push(user);
  saveUsers(users);
  // also auto-login
  localStorage.setItem('gentry_current_user', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
  return { success: true, user };
}

function authenticateUser(email, password){
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if(user){
    localStorage.setItem('gentry_current_user', JSON.stringify({ id: user.id, name: user.name, email: user.email }));
    return { success: true, user };
  }
  return { success: false, message: 'Invalid email or password.' };
}

function getCurrentUser(){
  return JSON.parse(localStorage.getItem('gentry_current_user') || 'null');
}

function signOut(){
  localStorage.removeItem('gentry_current_user');
  window.location.href = 'index.html';
}

function attachAuthHandlers(){
  const regForm = document.getElementById('registerForm');
  if(regForm){
    regForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const pwd = document.getElementById('regPassword').value;
      const conf = document.getElementById('regConfirm').value;
      if(pwd.length < 6){ alert('Password must be at least 6 characters'); return; }
      if(pwd !== conf){ alert('Passwords do not match'); return; }
      const res = registerUser(name, email, pwd);
      if(!res.success){ alert(res.message); return; }
      alert('Registration successful — you are now signed in.');
      window.location.href = 'index.html';
    });
  }

  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', function(e){
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pwd = document.getElementById('loginPassword').value;
      const res = authenticateUser(email, pwd);
      if(!res.success){ alert(res.message); return; }
      alert('Signed in successfully.');
      window.location.href = 'index.html';
    });
  }
}

// Update nav/user display on pages
function updateUserUI(){
  const user = getCurrentUser();
  if(!user) return;
  const signLinks = document.querySelectorAll('a[href="login.html"]');
  signLinks.forEach(a => { a.textContent = user.name.split(' ')[0]; a.href = 'index.html'; });
}

document.addEventListener('DOMContentLoaded', function(){
  attachAuthHandlers();
  updateUserUI();
});

// --- end auth ---
