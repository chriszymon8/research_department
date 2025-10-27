const PRODUCTS = [

  //Rolex
  { id: 'rx-1', brand: 'Rolex', name: 'Rolex Submariner 124060', price: 2650000, img: 'assets/watches/m124060.avif', stock: true, desc: 'Iconic diver watch, 40mm Oystersteel case, unidirectional bezel.' },
  { id: 'rx-2', brand: 'Rolex', name: 'Rolex Daytona 116500LN', price: 6599000, img: 'assets/watches/m116500ln.avif', stock: true, desc: 'Legendary racing chronograph with Cerachrom bezel and Oyster bracelet.' },
  { id: 'rx-3', brand: 'Rolex', name: 'Rolex Datejust 126334', price: 1850000, img: 'assets/watches/m126334.avif', stock: false, desc: 'Timeless Datejust in steel with fluted bezel and jubilee bracelet.' },
  { id: 'rx-4', brand: 'Rolex', name: 'Rolex GMT-Master II 126710BLRO', price: 4125000, img: 'assets/watches/m126710blro.avif', stock: true, desc: 'Dual time zone travel watch — iconic “Pepsi” bezel.' },
  { id: 'rx-5', brand: 'Rolex', name: 'Rolex Yacht-Master 126622', price: 2750000, img: 'assets/watches/m126622.avif', stock: true, desc: 'Sport-luxury model with comfortable Oysterflex bracelet option.' },
  { id: 'rx-6', brand: 'Rolex', name: 'Rolex Explorer 124270', price: 480000, img: 'assets/watches/m124270.avif', stock: true, desc: 'Compact 36mm sports watch built for exploration and durability.' },
  { id: 'rx-7', brand: 'Rolex', name: 'Rolex Milgauss 116400GV', price: 620000, img: 'assets/watches/116400GV.jpg', stock: false, desc: 'Engineered for scientists, anti-magnetic performance.' },
  { id: 'rx-8', brand: 'Rolex', name: 'Rolex Sea-Dweller 126600', price: 3550000, img: 'assets/watches/m126600.avif', stock: true, desc: 'Professional diver rated to 1220 meters, helium escape valve.' },
  { id: 'rx-9', brand: 'Rolex', name: 'Rolex Sky-Dweller 326934', price: 5200000, img: 'assets/watches/m326934.avif', stock: true, desc: 'Annual calendar and dual time — complex yet intuitive.' },
  { id: 'rx-10', brand: 'Rolex', name: 'Rolex Cellini Time 50509', price: 3200000, img: 'assets/watches/50509.jpg', stock: true, desc: 'Refined dress watch with polished case and classic leather strap.' },
  { id: 'rx-11', brand: 'Rolex', name: 'Rolex Oyster Perpetual 41 124300', price: 3000000, img: 'assets/watches/m124300.avif', stock: true, desc: 'Modern entry-level Rolex with colourful dials and reliable movement.' },
  { id: 'rx-12', brand: 'Rolex', name: 'Rolex Day-Date 40 228238', price: 12500000, img: 'assets/watches/m228238.avif', stock: false, desc: "The President’s watch: 18k yellow gold with day and date apertures." },

  //  Cartier
  { id: 'ct-1', brand: 'Cartier', name: 'Cartier Santos De Cartier Automatic', price: 446299, img: 'assets/watches/cartier1.avif', stock: true, desc: 'Japanese craftsmanship with enamel dial.' },
  { id: 'ct-2', brand: 'Cartier', name: 'Santos de Cartier watch(Yellow Gold)', price: 1991135, img: 'assets/watches/cartier2.avif', stock: true, desc: 'Santos de Cartier watch, small model, quartz movement.' },
  { id: 'ct-3', brand: 'Cartier', name: 'Santos de Cartier watch(Two Tone)', price: 688315, img: 'assets/watches/cartier3.avif', stock: true, desc: 'Manufacture mechanical movement with automatic winding.' },
  { id: 'ct-4', brand: 'Cartier', name: 'Tank Must de Cartier watch', price: 222605, img: 'assets/watches/cartier4.avif', stock: false, desc: 'Tank Must watch, large model, SolarBeat™ photovoltaic movement.' },



  // Patek
  { id: 'pp-1', brand: 'Patek', name: 'Patek Philippe Nautilus(White Gold)', price: 4523000, img: 'assets/watches/PatekPhilippe1.avif', stock: true, desc: 'A reinterpretation of a cult design, this model is distinguished by its white gold case and bracelet.' },
  { id: 'pp-2', brand: 'Patek', name: 'Patek Philippe Nautilus(Rose Gold)', price: 5383000, img: 'assets/watches/PatekPhilippe2.avif', stock: true, desc: 'Sunburst brown with black-gradient rim, horizontally embossed, rose gold applied baton-style hour markers with white luminescent coating.' },
  { id: 'pp-3', brand: 'Patek', name: 'Patek Philippe Nautilus(Steel)', price: 3462000, img: 'assets/watches/PatekPhilippe3.avif', stock: false, desc: 'Sunburst blue-gray with black-gradient rim, horizontally embossed, white gold applied baton-style hour markers with white luminescent coating.' },
  { id: 'pp-4', brand: 'Patek', name: 'Patek Philippe Aquanaut(Rose Gold)', price: 4903000, img: 'assets/watches/PatekPhilippe4.avif.svg', stock: true, desc: 'Sunburst brown with black-gradient rim, embossed Aquanaut pattern, rose gold applied numerals with white luminescent coating.' },
  
  // Omega
  { id: 'om-1', brand: 'Omega', name: 'Omega Seamaster Diver 300M', price: 420000, img: 'assets/watches/omega1.avif', stock: true, desc: 'Diver watch with co-axial escapement.' },
  { id: 'om-2', brand: 'Omega', name: 'Omega Speedmaster Professional', price: 380000, img: 'assets/watches/omega2.avif', stock: true, desc: 'The Moonwatch — legendary chronograph.' },
  { id: 'om-3', brand: 'Omega', name: 'Omega Constellation', price: 275000, img: 'assets/watches/omega3.avif', stock: false, desc: 'Elegant integrated bracelet design.' },
  { id: 'om-4', brand: 'Omega', name: 'Omega De Ville', price: 240000, img: 'assets/watches/omega4.avif', stock: true, desc: 'Classic dress collection.' },

  // Audemars
  { id: 'ap-1', brand: 'Audemars', name: 'Royal Oak Mini Frosted Quartz', price: 6310224, img: 'assets/watches/AP1.avif', stock: true, desc: 'Hammered 18-carat white gold case, glareproofed sapphire crystal.' },
  { id: 'ap-2', brand: 'Audemars', name: 'Royal Oak Mini Frosted Gold Quartz', price: 5528958, img: 'assets/watches/AP2.avif', stock: false, desc: 'Hammered 18-carat yellow gold case, glareproofed sapphire crystal.' },
  { id: 'ap-3', brand: 'Audemars', name: 'Royal Oak Offshore Selfwinding Chronograph', price: 4891934, img: 'assets/watches/AP3.avif', stock: true, desc: 'Warm 18-carat pink gold tones sit in concert with a cool titanium bezel and a contemporary grey "Méga Tapisserie" dial matching the calfskin strap.' },

  // Seiko
  { id: 'sk-1', brand: 'Seiko', name: 'Seiko Lord Marvel', price: 8000, img: 'assets/watches/Seiko1.avif', stock: true, desc: 'Rugged digital watch.' },
  { id: 'sk-2', brand: 'Seiko', name: 'Seiko Presage(Enamel Dial)', price: 84000, img: 'assets/watches/Seiko2.png', stock: true, desc: 'This enamel watch dial is manufactured by firing it at a high temperature.' },
  { id: 'sk-3', brand: 'Seiko', name: 'Seiko Prospex Marinemaster(Green Dial)', price: 92800, img: 'assets/watches/Seiko3.png', stock: false, desc: 'Diver Watch.' }
];

function getQueryParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function getCart(){
  return JSON.parse(localStorage.getItem('gentry_cart') || '[]');
}
function saveCart(cart){
  localStorage.setItem('gentry_cart', JSON.stringify(cart));
  updateCartCounts();
}
function addToCart(product, qty=1){
  const cart = getCart();
  const found = cart.find(i => i.id === product.id);
  if(found){ found.qty += qty; } else { cart.push({ id: product.id, qty, price: product.price, name: product.name, img: product.img }); }
  saveCart(cart);
}
function updateCartCounts(){
  const cart = getCart();
  const count = cart.reduce((s,i)=> s + i.qty, 0);
  const elTop = document.getElementById('cartCountTop'); if(elTop) elTop.textContent = count;
  const el = document.getElementById('cartCount'); if(el) el.textContent = count;
  const elDet = document.getElementById('cartCountDetail'); if(elDet) elDet.textContent = count;
}

function renderFeatured(){
  const featured = PRODUCTS.slice(0,4);
  const grid = document.getElementById('featuredGrid');
  if(!grid) return;
  grid.innerHTML = featured.map(p => `
    <div class="bg-gray-800 p-4 rounded-lg shadow">
      <a href="product-detail.html?id=${p.id}">
        <img src="${p.img}" class="w-full h-48 object-cover rounded" />
        <h4 class="mt-3 font-semibold">${p.name}</h4>
        <div class="mt-2 flex items-center justify-between">
          <div class="text-amber-300 font-bold">₱${numberWithCommas(p.price)}</div>
          <button onclick="addToCartHandler('${p.id}')" class="bg-amber-400 text-black px-3 py-1 rounded text-sm">Add</button>
        </div>
      </a>
    </div>
  `).join('');
}

function numberWithCommas(x){ return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

function addToCartHandler(id){
  const p = PRODUCTS.find(x => x.id === id); if(!p) return alert('Product not found');
  addToCart(p,1);
  alert('Added to cart');
}

function renderProducts(){
  const brand = getQueryParam('brand');
  const grid = document.getElementById('productsGrid');
  const title = document.getElementById('brandTitle');
  const availabilitySummary = document.getElementById('availabilitySummary');
  if(title) title.textContent = brand ? `${brand} Collection` : 'All Products';

  let list = PRODUCTS.filter(p => !brand || p.brand.toLowerCase() === brand.toLowerCase());

  if(availabilitySummary) availabilitySummary.textContent = `${list.length} models found`;

  const availability = document.getElementById('availability');
  const sortBy = document.getElementById('sortBy');
  const minPrice = document.getElementById('minPrice');
  const maxPrice = document.getElementById('maxPrice');

  function apply(){
    let copy = list.slice();
    const av = availability?.value || 'any';
    if(av === 'in') copy = copy.filter(x=>x.stock);
    if(av === 'out') copy = copy.filter(x=>!x.stock);
    const min = Number(minPrice?.value || 0);
    const max = Number(maxPrice?.value || 0) || Infinity;
    copy = copy.filter(x => x.price >= min && x.price <= max);
    const s = sortBy?.value || 'alpha';
    if(s === 'alpha') copy.sort((a,b)=> a.name.localeCompare(b.name));
    if(s === 'price-asc') copy.sort((a,b)=> a.price - b.price);
    if(s === 'price-desc') copy.sort((a,b)=> b.price - a.price);

    grid.innerHTML = copy.map(p=> `
      <div class="bg-gray-800 p-4 rounded-lg">
        <a href="product-detail.html?id=${p.id}">
          <img src="${p.img}" class="w-full h-44 object-cover rounded" />
        </a>
        <h4 class="mt-3 font-semibold">${p.name}</h4>
        <p class="text-sm text-gray-400 mt-1">${p.brand}</p>
        <div class="mt-2 flex items-center justify-between">
          <div class="font-bold text-amber-300">₱${numberWithCommas(p.price)}</div>
          <div>
            <button onclick="addToCartHandler('${p.id}')" class="bg-amber-400 text-black px-3 py-1 rounded text-sm">Add to cart</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('applyFilters')?.addEventListener('click', apply);
  apply();
}

function renderProductDetail(){
  const id = getQueryParam('id');
  const root = document.getElementById('productDetail');
  if(!root) return;
  const p = PRODUCTS.find(x => x.id === id);
  if(!p){ root.innerHTML = '<p>Product not found</p>'; return; }
  root.innerHTML = `
    <div>
      <img src="${p.img}" class="rounded-lg w-full object-cover h-96" />
      <div class="mt-4 flex gap-3">
        <img src="${p.img}" class="w-24 h-24 rounded" />
        <img src="${p.img}" class="w-24 h-24 rounded" />
        <img src="${p.img}" class="w-24 h-24 rounded" />
      </div>
    </div>
    <div>
      <h2 class="text-2xl font-semibold">${p.name}</h2>
      <p class="text-sm text-gray-400 mt-2">${p.brand}</p>
      <div class="mt-4 text-amber-300 font-bold text-2xl">₱${numberWithCommas(p.price)}</div>
      <p class="mt-4 text-gray-300">${p.desc}</p>
      <div class="mt-6 flex gap-3">
        <button id="addToCartBtn" class="px-6 py-3 bg-amber-400 text-black rounded font-semibold">Add to cart</button>
        <a href="catalog.html" class="px-6 py-3 border border-gray-700 rounded">Back to catalog</a>
      </div>
    </div>
  `;
  document.getElementById('addToCartBtn').addEventListener('click', function(){ addToCart(p,1); alert('Added to cart'); });
}

function renderCartPage(){
  const container = document.getElementById('cartContainer');
  if(!container) return;
  const cart = getCart();
  if(cart.length === 0){ container.innerHTML = '<p class="text-gray-400">Your cart is empty.</p>'; return; }
  let total = 0;
  container.innerHTML = `
    <div class="space-y-4">
      ${cart.map(item=>{
        total += item.price * item.qty;
        return `
          <div class="flex items-center justify-between bg-gray-900 p-3 rounded">
            <div class="flex items-center gap-4">
              <img src="${item.img}" class="w-20 h-20 object-cover rounded" />
              <div>
                <div class="font-semibold">${item.name}</div>
                <div class="text-sm text-gray-400">₱${numberWithCommas(item.price)} x ${item.qty}</div>
              </div>
            </div>
            <div>
              <button onclick="removeFromCart('${item.id}')" class="text-sm text-red-400">Remove</button>
            </div>
          </div>
        `
      }).join('')}

      <div class="mt-4 p-4 bg-gray-900 rounded flex items-center justify-between">
        <div class="text-gray-400">Total</div>
        <div class="font-bold text-amber-300">₱${numberWithCommas(total)}</div>
      </div>

      <div class="mt-4 flex gap-3">
        <button onclick="checkout()" class="px-6 py-3 bg-amber-400 text-black rounded">Checkout</button>
        <button onclick="clearCart()" class="px-6 py-3 border border-gray-700 rounded">Clear</button>
      </div>
    </div>
  `;
}

function removeFromCart(id){
  let cart = getCart();
  cart = cart.filter(i=> i.id !== id);
  saveCart(cart);
  renderCartPage();
}
function clearCart(){ localStorage.removeItem('gentry_cart'); updateCartCounts(); renderCartPage(); }
function checkout(){ alert('Demo checkout — implement payment gateway in production.'); }

document.addEventListener('DOMContentLoaded', function(){
  updateCartCounts();
  renderFeatured();
  renderProducts();
  renderProductDetail();
  renderCartPage();
});
