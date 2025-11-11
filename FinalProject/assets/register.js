  document.getElementById('registerForm').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;

    if(!name || !email || !password){ 
      alert('Please fill all fields'); 
      return; 
    }

    const users = JSON.parse(localStorage.getItem('gentry_users')||'[]');
    if(users.find(u=>u.email===email)){ 
      alert('Email already registered'); 
      return; 
    }

    const newUser = { id:'u'+Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem('gentry_users', JSON.stringify(users));

    // create notification div
    const notification = document.createElement('div');
    notification.textContent = 'Registered Successfully!';
    notification.style.position = 'fixed';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.backgroundColor = '#4ade80'; // green
    notification.style.color = 'white';
    notification.style.padding = '20px 40px';
    notification.style.borderRadius = '12px';
    notification.style.fontSize = '18px';
    notification.style.zIndex = '9999';
    notification.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    notification.style.textAlign = 'center';
    document.body.appendChild(notification);

    // remove notification after 1.5s and redirect to login
    setTimeout(() => {
      document.body.removeChild(notification);
      window.location.href = 'login.html';
    }, 1500);
  });