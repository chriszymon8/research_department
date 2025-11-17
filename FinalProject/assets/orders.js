document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("ordersTable");
  if (!tbody) {
    console.error("ordersTable element not found");
    return;
  }

  // ----------------- FETCH ORDERS -----------------
  async function fetchOrders() {
    const url = "https://research-department.onrender.com/api/orders";
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : data.orders || [];
  }

  // ----------------- RENDER ORDERS -----------------
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
      const tdUser = document.createElement("td");
      tdUser.textContent = order.userEmail || order.userId || "Unknown";
      tdUser.className = "p-2";
      tr.appendChild(tdUser);

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
      tdActions.className = "p-2 flex gap-2";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "bg-blue-500 px-2 rounded";
      editBtn.addEventListener("click", () => alert("Edit order not implemented yet"));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "bg-red-600 px-2 rounded";
      deleteBtn.addEventListener("click", async () => {
        if (!confirm(`Delete order #${order.id}?`)) return;
        const res = await fetch(`https://research-department.onrender.com/api/orders/${order.id}`, { method: "DELETE" });
        if (!res.ok) {
          console.error("Failed to delete order");
          alert("Failed to delete order");
        } else {
          tr.remove();
        }
      });

      tdActions.append(editBtn, deleteBtn);
      tr.appendChild(tdActions);

      tbody.appendChild(tr);
    });
  }

  // ----------------- INITIAL LOAD -----------------
  const orders = await fetchOrders();
  renderOrders(orders);

  // ----------------- WEBSOCKET -----------------
  const ws = new WebSocket("wss://research-department.onrender.com"); // Use WSS for HTTPS

  ws.addEventListener("open", () => console.log("Connected to WebSocket for orders"));

  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.type === "orders-update") {
      renderOrders(msg.data);
    }
  });

  ws.addEventListener("close", () => console.log("WebSocket disconnected"));
});
