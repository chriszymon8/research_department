document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("ordersTable");

  // Get logged in user
  const loggedUser = JSON.parse(localStorage.getItem("gentry_user"));
  if (!loggedUser) {
    window.location.href = "login.html";
    return;
  }

  const USER_EMAIL = loggedUser.email;

  // Success popup function
  function showSuccessPopup() {
    const popup = document.getElementById("successPopup");
    popup.classList.remove("hidden");
    setTimeout(() => popup.classList.add("hidden"), 2000);
  }

  // Fetch orders
  async function fetchOrders() {
    const url = "https://research-department.onrender.com/api/orders";
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : data.orders || [];
  }

  // Render orders
  function renderOrders(orders) {
    tbody.replaceChildren();

    if (orders.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.colSpan = 5;
      td.textContent = "No orders found";
      td.className = "p-4 text-center text-gray-400";
      tr.appendChild(td);
      tbody.appendChild(tr);
      return;
    }

    orders.forEach(order => {
      const tr = document.createElement("tr");
      tr.className = "bg-gray-800 mb-1 rounded";

      // ID
      const tdId = document.createElement("td");
      tdId.textContent = order.id;
      tdId.className = "p-2";
      tr.appendChild(tdId);

      // User
      // Inside renderOrders function
      // Add User ID column
      const tdUserId = document.createElement("td");
      tdUserId.textContent = order.userId || "N/A";
      tdUserId.className = "p-2";
      tr.appendChild(tdUserId);

// Make sure your table header has <th>User ID</th> before appending tbody


      // Items
      const tdItems = document.createElement("td");
      tdItems.textContent = (order.items || []).map(i => `${i.name} x${i.qty}`).join(", ");
      tdItems.className = "p-2";
      tr.appendChild(tdItems);

      // Total
      const tdTotal = document.createElement("td");
      tdTotal.textContent = `₱${(order.total || 0).toLocaleString()}`;
      tdTotal.className = "p-2";
      tr.appendChild(tdTotal);

      // Actions
      const tdActions = document.createElement("td");
      tdActions.className = "p-2";

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.className = "bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-500 transition";

      cancelBtn.addEventListener("click", async () => {
        const res = await fetch(`https://research-department.onrender.com/api/orders/${order.id}`, { 
          method: "DELETE"
        });

        if (!res.ok) {
          console.error("Failed to cancel order");
          return;
        }

        tr.remove();
        showSuccessPopup();
      });

      tdActions.appendChild(cancelBtn);
      tr.appendChild(tdActions);

      tbody.appendChild(tr);
    });
  }

  // Load and filter orders
  const orders = await fetchOrders();

  const filteredOrders = orders.filter(o =>
    o.userEmail?.toLowerCase() === USER_EMAIL.toLowerCase()
  );

  renderOrders(filteredOrders);
});
