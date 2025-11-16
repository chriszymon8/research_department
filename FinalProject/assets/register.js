const registerForm = document.getElementById('registerForm');
const msg = document.getElementById('regMsg');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const password2 = document.getElementById('regPassword2').value;

  msg.textContent = '';

  if (!name || !email || !password || !password2) {
    msg.textContent = 'All fields are required.';
    return;
  }

  if (password !== password2) {
    msg.textContent = 'Passwords do not match.';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.message || 'Server error. Try again later.';
      return;
    }

    // Registration successful, redirect to login
    window.location.href = 'login.html';
  } catch (err) {
    console.error(err);
    msg.textContent = 'Server error. Try again later.';
  }
});
