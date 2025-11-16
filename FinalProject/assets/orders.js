// assets/orders.js

document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.getElementById("ordersTable");
  if (!tbody) console.error("ordersTable element not found");

  // -----------------------------
  // FETCH ORDERS FROM BACKEND
  // -----------------------------
  async function fetchOrders() {
    try {
      const res = await fetch("http://localhost:3000/api/orders");
      const data = await res.json();
      return Array.isArray(data) ? data : data.orders || [];
    } catch (err) {
      console.error("Error fetching orders:", err);
      return [];
    }
  }

  // -----------------------------
  // RENDER ORDERS IN TABLE
  // -----------------------------
  function renderOrders(orders) {
    if (!tbody) return;
    tbody.replaceChildren(); // Clear table

    orders.forEach(o => {
      const tr = document.createElement("tr");
      tr.className = "bg-gray-800 mb-1 rounded";

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

      // Delete button
      tr.querySelector(".deleteBtn").addEventListener("click", async () => {
        if (!confirm(`Delete order #${o.id}?`)) return;
        try {
          const res = await fetch(`http://localhost:3000/api/orders/${o.id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Failed to delete");
          tr.remove();
        } catch (err) {
          console.error(err);
          alert("Failed to delete order");
        }
      });

      // Edit button (optional)
      tr.querySelector(".editBtn").addEventListener("click", () => {
        alert("Edit order not implemented yet");
      });

      tbody.appendChild(tr);
    });
  }

  // -----------------------------
  // PLACE ORDER FUNCTION
  // -----------------------------
  async function placeOrder(order) {
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
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

  // Example: hook this to a button in your main website
  document.getElementById("placeOrderBtn")?.addEventListener("click", () => {
    const order = {
      userEmail: "test@example.com", // replace with logged-in user email
      items: [
        { name: "Rolex Submariner", qty: 1, price: 2650000 }
      ],
      total: 2650000
    };

    placeOrder(order);
  });

  // -----------------------------
  // INITIAL LOAD
  // -----------------------------
  const orders = await fetchOrders();
  renderOrders(orders);

  // -----------------------------
  // WEBSOCKET FOR LIVE UPDATES
  // -----------------------------
  const ws = new WebSocket("ws://localhost:3000");

  ws.addEventListener("open", () => console.log("Connected to WS for orders"));

  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.type === "orders-update") {
      renderOrders(msg.data);
    }
  });

  ws.addEventListener("close", () => console.log("WS disconnected"));
});
