document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('gentry_users')||'[]');
  const user = users.find(u => u.email === email && u.password === password);

  if(!user){
    alert('Invalid credentials');
    return;
  }

  // Save logged-in user
  localStorage.setItem('gentry_user', JSON.stringify(user));
  alert('Signed in successfully!');
  window.location.href = 'index.html';
});