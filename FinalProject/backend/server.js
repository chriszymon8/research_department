const express = require("express");
const fs = require("fs");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("assets"));

// HTTP + WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


// UTILITY FUNCTIONS

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) client.send(msg);
  });
}

function readJSON(filename) {
  return JSON.parse(fs.readFileSync(filename, "utf-8") || "[]");
}

function writeJSON(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}


// ROUTES

app.get("/", (req, res) => res.send("Backend is running"));


// PRODUCTS

app.get("/api/products", (req, res) => res.json(readJSON("products.json")));

app.post("/api/products", (req, res) => {
  const products = readJSON("products.json");
  const newProduct = { id: `prod-${Date.now()}`, ...req.body };
  products.push(newProduct);
  writeJSON("products.json", products);

  res.json({ message: "Product added!" });
  broadcast({ type: "products-update", data: products });
  broadcast({ type: "product-added", productName: newProduct.name });
});

app.delete("/api/products/:id", (req, res) => {
  let products = readJSON("products.json");
  const prodId = req.params.id; // string comparison
  const deletedProduct = products.find(p => p.id === prodId);
  products = products.filter(p => p.id !== prodId);
  writeJSON("products.json", products);

  res.json({ message: "Product deleted" });
  broadcast({ type: "products-update", data: products });
  broadcast({ type: "product-deleted", productName: deletedProduct?.name || "Unknown" });
});


// PATCH endpoint para EDIT

app.patch("/api/products/:id", (req, res) => {
  const products = readJSON("products.json");
  const prodId = req.params.id; 
  const product = products.find(p => p.id === prodId);

  if (!product) return res.status(404).json({ message: "Product not found" });

  Object.assign(product, req.body);
  writeJSON("products.json", products);

  res.json({ message: "Product updated!", product });
  broadcast({ type: "products-update", data: products });
});


// DELETE product
app.delete("/api/products/:id", (req, res) => {
  let products = readJSON("products.json");
  const prodId = Number(req.params.id);
  const deletedProduct = products.find(p => p.id === prodId);
  products = products.filter(p => p.id !== prodId);
  writeJSON("products.json", products);

  res.json({ message: "Product deleted" });
  broadcast({ type: "products-update", data: products });
  broadcast({ type: "product-deleted", productName: deletedProduct?.name || "Unknown" });
});


// USERS

app.get("/api/users", (req, res) => res.json(readJSON("users.json")));

app.post("/api/users", (req, res) => {
  const users = readJSON("users.json");
  const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id: newId, blocked: false, ...req.body };
  users.push(newUser);
  writeJSON("users.json", users);

  res.json({ message: "User registered!", user: newUser });
  broadcast({ type: "users-update", data: users });
});

app.patch("/api/users/:id/toggle-block", (req, res) => {
  const users = readJSON("users.json");
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) return res.status(404).json({ message: "User not found" });

  user.blocked = !user.blocked;
  writeJSON("users.json", users);
  res.json({ message: "User updated", user });
  broadcast({ type: "users-update", data: users });
  broadcast({ type: "user-blocked", userEmail: user.email, blocked: user.blocked });
});

app.delete("/api/users/:id", (req, res) => {
  let users = readJSON("users.json");
  const userId = Number(req.params.id);
  const deletedUser = users.find(u => u.id === userId);
  users = users.filter(u => u.id !== userId);
  writeJSON("users.json", users);

  res.json({ message: "User deleted" });
  broadcast({ type: "users-update", data: users });
});


// ORDERS

app.get("/api/orders", (req, res) => res.json(readJSON("orders.json")));

app.post("/api/orders", (req, res) => {
  const orders = readJSON("orders.json");
  const newId = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;
  const newOrder = { id: newId, ...req.body };
  orders.push(newOrder);
  writeJSON("orders.json", orders);

  res.json({ message: "Order added!" });
  broadcast({ type: "orders-update", data: orders });
});


// WebSocket

wss.on("connection", ws => {
  console.log("Client connected via WS");

  // Send initial data
  ws.send(JSON.stringify({ type: "products-update", data: readJSON("products.json") }));
  ws.send(JSON.stringify({ type: "users-update", data: readJSON("users.json") }));
  ws.send(JSON.stringify({ type: "orders-update", data: readJSON("orders.json") }));

  ws.on("close", () => console.log("Client disconnected"));
});

// DELETE order
app.delete("/api/orders/:id", (req, res) => {
  let orders = readJSON("orders.json");
  const orderId = req.params.id;
  orders = orders.filter(o => o.id === orderId);
  writeJSON("orders.json", orders);
  res.json({ message: "Order deleted" });
});

// PATCH order (optional, kung gusto i-edit)
app.patch("/api/orders/:id", (req, res) => {
  const orders = readJSON("orders.json");
  const orderId = req.params.id;
  const order = orders.find(o => o.id === orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });
  Object.assign(order, req.body);
  writeJSON("orders.json", orders);
  res.json({ message: "Order updated", order });
});

// POST product (for Add Product)
app.post("/api/orders", (req, res) => {
  const orders = readJSON("assets/orders.json"); 
  const newOrder = { id: `order-${Date.now()}`, ...req.body };
  orders.push(newOrder);
  writeJSON("assets/orders.json", orders);
  res.json({ message: "Order added!", order: newOrder });
  broadcast({ type: "orders-update", data: orders });
});



// START SERVER

server.listen(3000, () => console.log("Backend + WS running on http://localhost:3000"));
