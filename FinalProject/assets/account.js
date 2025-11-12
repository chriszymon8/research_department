    (function(){
      const container = document.getElementById('accountBox');
      const current = (function getCurrentUser(){ const raw = localStorage.getItem('gentry_user'); if(!raw) return null; try { return JSON.parse(raw); } catch(e){ localStorage.removeItem('gentry_user'); return null; } })();

      if(!container) return;
      container.textContent = ''; // clear if any

      if(!current){
        const el = document.createElement('div');
        el.className = 'text-gray-400';
        el.textContent = 'You are not signed in. ';
        const a = document.createElement('a'); a.href = 'login.html'; a.textContent = 'Sign in'; a.className = 'text-amber-300 ml-1';
        el.appendChild(a);
        container.appendChild(el);
        return;
      }

      // display editable form (client-side only)
      const form = document.createElement('form');
      form.className = 'space-y-4';

      const nameLabel = document.createElement('label'); nameLabel.className = 'block text-sm text-gray-300';
      nameLabel.textContent = 'Full name';
      const nameInput = document.createElement('input');
      nameInput.type = 'text'; nameInput.value = current.name || ''; nameInput.className = 'w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded';

      const emailLabel = document.createElement('label'); emailLabel.className = 'block text-sm text-gray-300';
      emailLabel.textContent = 'Email';
      const emailInput = document.createElement('input');
      emailInput.type = 'email'; emailInput.value = current.email || ''; emailInput.className = 'w-full mt-1 p-2 bg-gray-900 border border-gray-700 rounded';

      const saveBtn = document.createElement('button');
      saveBtn.type = 'button';
      saveBtn.className = 'px-4 py-2 bg-amber-400 text-black rounded';
      saveBtn.textContent = 'Save changes';

      const feedback = document.createElement('div'); feedback.className = 'text-sm text-green-400 hidden';

      saveBtn.addEventListener('click', function(){
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        if(!name || !email){ feedback.textContent = 'Please fill both fields.'; feedback.classList.remove('hidden'); feedback.classList.remove('text-green-400'); feedback.classList.add('text-red-400'); return; }
        // update storage (demo only: updates both gentry_user and gentry_users list)
        const rawUsers = localStorage.getItem('gentry_users');
        let users = [];
        try { users = rawUsers ? JSON.parse(rawUsers) : []; } catch(e){ users = []; }
        const idx = users.findIndex(u => u.id === current.id);
        if(idx >= 0){ users[idx].name = name; users[idx].email = email; localStorage.setItem('gentry_users', JSON.stringify(users)); }
        const newCurrent = { id: current.id, name, email };
        localStorage.setItem('gentry_user', JSON.stringify(newCurrent));
        feedback.textContent = 'Saved.';
        feedback.classList.remove('hidden'); feedback.classList.remove('text-red-400'); feedback.classList.add('text-green-400');
        // update header/account UI via global function
        if(typeof updateAuthUI === 'function') updateAuthUI();
      });

      form.appendChild(nameLabel); form.appendChild(nameInput);
      form.appendChild(emailLabel); form.appendChild(emailInput);
      form.appendChild(saveBtn);
      form.appendChild(feedback);

      container.appendChild(form);

      document.getElementById('signOutPageBtn').addEventListener('click', function(){
        if(typeof logoutUser === 'function'){ logoutUser(); }
        window.location.href = 'index.html';
      });
    })();