const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  loginMsg.textContent = '';

  if (!email || !password) {
    loginMsg.textContent = 'All fields are required.';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/users');
    const users = await res.json();

    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
      loginMsg.textContent = 'Invalid credentials';
      return;
    }

    if (user.blocked) {
      loginMsg.textContent = 'Your account is blocked.';
      return;
    }

    // Save logged-in user in localStorage (optional)
    localStorage.setItem('gentry_user', JSON.stringify(user));

    // Redirect to homepage
    window.location.href = 'index.html';

  } catch (err) {
    console.error(err);
    loginMsg.textContent = 'Server error. Try again later.';
  }
});
