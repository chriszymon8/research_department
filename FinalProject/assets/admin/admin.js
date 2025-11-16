// =========================
// ADMIN LOGIN & DASHBOARD PROTECTION
// =========================
const adminEmail = "admin@gentry.com";
const adminPassword = "admin123";

const loginForm = document.getElementById("adminLoginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("gentry_admin", "true");
      window.location.href = "./admin-dashboard.html";
    } else {
      document.getElementById("loginMsg").textContent = "Invalid credentials";
    }
  });
}

const mainEl = document.querySelector("main");
if (mainEl && localStorage.getItem("gentry_admin") !== "true") {
  window.location.href = "./admin-login.html";
}

document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("gentry_admin");
  window.location.href = "./admin-login.html";
});

// =========================
// FETCH HELPER
// =========================
async function fetchData(url, options = {}) {
  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

// =========================
// RENDER USERS
// =========================
async function renderUsers(users = []) {
  const tbody = document.getElementById("usersTable");
  if (!tbody) return;
  tbody.replaceChildren();

  users.forEach(u => {
    const tr = document.createElement("tr");
    ["id", "name", "email", "blocked"].forEach(key => {
      const td = document.createElement("td");
      td.className = "p-2";
      td.textContent = u[key];
      tr.appendChild(td);
    });

    const tdActions = document.createElement("td");
    tdActions.className = "p-2 flex gap-2";

    const btnBlock = document.createElement("button");
    btnBlock.className = "blockBtn bg-yellow-400 px-2 rounded";
    btnBlock.textContent = "Toggle Block";
    btnBlock.addEventListener("click", async () => {
      await fetchData(`http://localhost:3000/api/users/${u.id}/toggle-block`, { method: "PATCH" });
    });

    const btnDelete = document.createElement("button");
    btnDelete.className = "deleteBtn bg-red-600 px-2 rounded";
    btnDelete.textContent = "Delete";
    btnDelete.addEventListener("click", async () => {
      await fetchData(`http://localhost:3000/api/users/${u.id}`, { method: "DELETE" });
    });

    tdActions.appendChild(btnBlock);
    tdActions.appendChild(btnDelete);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
  });
}

// =========================
// RENDER PRODUCTS
// =========================
async function renderProducts(products = []) {
  const tbody = document.getElementById("productsTable");
  if (!tbody) return;
  tbody.replaceChildren();

  products.forEach(p => {
    const tr = document.createElement("tr");
    ["id", "brand", "name", "price", "stock"].forEach(key => {
      const td = document.createElement("td");
      td.className = "p-2";
      td.textContent = p[key];
      tr.appendChild(td);
    });

    const tdImg = document.createElement("td");
    tdImg.className = "p-2";
    const img = document.createElement("img");
    img.src = p.img;
    img.onerror = () => img.src = "assets/default.png";
    img.className = "w-16 h-16 object-contain";
    tdImg.appendChild(img);
    tr.appendChild(tdImg);

    const tdActions = document.createElement("td");
    tdActions.className = "p-2 flex gap-2";

    const btnEdit = document.createElement("button");
    btnEdit.className = "editProdBtn bg-blue-500 px-2 rounded";
    btnEdit.textContent = "Edit";
    btnEdit.addEventListener("click", () => openEditModal(p));

    const btnDelete = document.createElement("button");
    btnDelete.className = "deleteProdBtn bg-red-600 px-2 rounded";
    btnDelete.textContent = "Delete";
    btnDelete.addEventListener("click", async () => {
      await fetchData(`http://localhost:3000/api/products/${p.id}`, { method: "DELETE" });
    });

    tdActions.appendChild(btnEdit);
    tdActions.appendChild(btnDelete);
    tr.appendChild(tdActions);
    tbody.appendChild(tr);
  });
}

// =========================
// ADD PRODUCT FORM
// =========================
const addProductForm = document.getElementById("addProductForm");
if (addProductForm) {
  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newProduct = {
      brand: document.getElementById("productBrand").value,
      name: document.getElementById("productName").value,
      price: Number(document.getElementById("productPrice").value),
      img: document.getElementById("productImage").value,
      stock: Boolean(Number(document.getElementById("productStock").value)),
    };
    await fetchData("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });
    addProductForm.reset();
  });
}

// =========================
// EDIT PRODUCT MODAL
// =========================
function openEditModal(product) {
  document.getElementById("editModal")?.remove();

  const modal = document.createElement("div");
  modal.id = "editModal";
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

  modal.innerHTML = `
    <div class="bg-gray-800 p-6 rounded-lg w-96 space-y-4">
      <h2 class="text-lg font-semibold">Edit Product</h2>
      <input id="editBrand" type="text" class="w-full p-2 rounded bg-gray-900" value="${product.brand}">
      <input id="editName" type="text" class="w-full p-2 rounded bg-gray-900" value="${product.name}">
      <input id="editPrice" type="number" class="w-full p-2 rounded bg-gray-900" value="${product.price}">
      <input id="editImg" type="text" class="w-full p-2 rounded bg-gray-900" value="${product.img}">
      <select id="editStock" class="w-full p-2 rounded bg-gray-900">
        <option value="true" ${product.stock ? "selected" : ""}>In Stock</option>
        <option value="false" ${!product.stock ? "selected" : ""}>Out of Stock</option>
      </select>
      <div class="flex justify-end gap-2">
        <button id="cancelEdit" class="px-4 py-2 bg-gray-600 rounded">Cancel</button>
        <button id="saveEdit" class="px-4 py-2 bg-green-500 rounded">Save</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("cancelEdit").addEventListener("click", () => modal.remove());

  document.getElementById("saveEdit").addEventListener("click", async () => {
    const updatedProduct = {
      brand: document.getElementById("editBrand").value,
      name: document.getElementById("editName").value,
      price: Number(document.getElementById("editPrice").value),
      img: document.getElementById("editImg").value,
      stock: document.getElementById("editStock").value === "true"
    };
    await fetchData(`http://localhost:3000/api/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct)
    });
    modal.remove();
  });
}

// =========================
// RENDER ORDERS
// =========================
async function renderOrders(orders = []) {
  const tbody = document.getElementById("ordersTable");
  if (!tbody) return;
  tbody.replaceChildren();

  orders.forEach(o => {
    const tr = document.createElement("tr");
    const tdId = document.createElement("td"); tdId.className = "p-2"; tdId.textContent = o.id; tr.appendChild(tdId);
    const tdEmail = document.createElement("td"); tdEmail.className = "p-2"; tdEmail.textContent = o.userEmail; tr.appendChild(tdEmail);
    const tdItems = document.createElement("td"); tdItems.className = "p-2"; tdItems.textContent = o.items.map(i => `${i.name} x${i.qty}`).join(", "); tr.appendChild(tdItems);
    const tdTotal = document.createElement("td"); tdTotal.className = "p-2"; tdTotal.textContent = o.total; tr.appendChild(tdTotal);
    tbody.appendChild(tr);
  });

  const ctx = document.getElementById("ordersChart");
  if (!ctx) return;

  const orderCount = {};
  orders.forEach(o => orderCount[o.userEmail] = (orderCount[o.userEmail] || 0) + 1);

  const data = {
    labels: Object.keys(orderCount),
    datasets: [{ label: "Total Orders per User", data: Object.values(orderCount), backgroundColor: "rgba(255,191,0,0.7)" }]
  };

  if (window.ordersChartInstance) {
    window.ordersChartInstance.data = data;
    window.ordersChartInstance.update();
  } else {
    window.ordersChartInstance = new Chart(ctx, { type: "bar", data, options: { responsive: true, plugins: { legend: { display: false } } } });
  }
}

// =========================
// FETCH ORDERS ON PAGE LOAD
// =========================
async function loadOrdersFallback() {
  const orders = await fetchData("http://localhost:3000/api/orders");
  const ordersArray = Array.isArray(orders) ? orders : (orders.orders || []);
  console.log("Orders fetched on page load:", ordersArray);
  renderOrders(ordersArray);
}

if (mainEl) loadOrdersFallback();

// =========================
// TOAST NOTIFICATION
// =========================
function showAdminToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = `fixed bottom-4 right-4 p-3 rounded shadow-lg text-white z-50 transition-opacity duration-500 ${
    type === "success" ? "bg-green-500" :
    type === "error" ? "bg-red-500" : "bg-blue-500"
  }`;
  toast.style.opacity = "0";
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.style.opacity = "1");
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.addEventListener("transitionend", () => toast.remove());
  }, 3000);
}

// =========================
// WEBSOCKET
// =========================
const ws = new WebSocket("ws://localhost:3000");
ws.addEventListener("open", () => console.log("Connected to WebSocket server"));
ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  switch(msg.type) {
    case "users-update": renderUsers(msg.data); showAdminToast("Users list updated", "info"); break;
    case "products-update": renderProducts(msg.data); showAdminToast("Products list updated", "success"); break;
    case "orders-update": renderOrders(msg.data); break;
    case "user-blocked": showAdminToast(`User ${msg.userEmail} ${msg.blocked ? "blocked" : "unblocked"}`, "error"); break;
    case "product-deleted": showAdminToast(`Product "${msg.productName}" deleted`, "error"); break;
    case "product-added": showAdminToast(`Product "${msg.productName}" added`, "success"); break;
    case "product-updated": showAdminToast(`Product "${msg.productName}" updated`, "success"); break;
  }
});
ws.addEventListener("close", () => console.log("WebSocket disconnected"));
