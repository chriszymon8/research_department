document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("ordersTable");
  if (!tbody) {
    console.error("ordersTable element not found");
    return;
  }

  const BASE_URL = "https://research-department.onrender.com";

  // FETCH ORDERS
  async function fetchOrders() {
    try {
      const res = await fetch(`${BASE_URL}/api/orders`);
      const data = await res.json();
      return Array.isArray(data) ? data : data.orders || [];
    } catch (err) {
      console.error("Error fetching orders:", err);
      return [];
    }
  }

  // RENDER ORDERS
  function renderOrders(orders) {
    tbody.replaceChildren();
    orders.forEach(o => {
      const tr = document.createElement("tr");
      tr.className = "bg-gray-700 mb-1 rounded";

      tr.innerHTML = `
        <td class="p-2">${o.id}</td>
        <td class="p-2">${o.userEmail || o.userId || "Unknown"}</td>
        <td class="p-2">${(o.items || []).map(i => i.name + " x" + i.qty).join(", ")}</td>
        <td class="p-2">₱${(o.total || 0).toLocaleString()}</td>
        <td class="p-2 flex gap-2">
          <button class="bg-blue-500 px-2 rounded editBtn">Edit</button>
          <button class="bg-red-600 px-2 rounded deleteBtn">Delete</button>
        </td>
      `;

      // DELETE
      tr.querySelector(".deleteBtn").addEventListener("click", async () => {
        if (!confirm(`Delete order #${o.id}?`)) return;
        try {
          const res = await fetch(`${BASE_URL}/api/orders/${o.id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Failed to delete");
          tr.remove();
        } catch (err) {
          console.error(err);
          alert("Failed to delete order");
        }
      });

      // EDIT (optional)
      tr.querySelector(".editBtn").addEventListener("click", () => {
        alert("Edit order not implemented yet");
      });

      tbody.appendChild(tr);
    });
  }

  // PLACE ORDER FUNCTION (example)
  async function placeOrder(order) {
    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!res.ok) throw new Error("Failed to place order");
      const data = await res.json();
      console.log("Order placed:", data);
      alert("Order placed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  }

  // Example hook for place order button
  document.getElementById("placeOrderBtn")?.addEventListener("click", () => {
    const order = {
      userEmail: "test@example.com",
      items: [
        { name: "Rolex Submariner", qty: 1, price: 2650000 }
      ],
      total: 2650000
    };
    placeOrder(order);
  });

  // INITIAL LOAD
  const orders = await fetchOrders();
  console.log("Fetched orders:", orders); // check console
  renderOrders(orders);

  // POLLING EVERY 10 SECONDS (no WebSocket)
  setInterval(async () => {
    const updatedOrders = await fetchOrders();
    renderOrders(updatedOrders);
  }, 10000);
});
