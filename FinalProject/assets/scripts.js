/* assets/scripts.js*/

// ----------------- Product data (fallback embedded) -----------------
let PRODUCTS = [
  { id: 'rx-1', brand: 'Rolex', name: 'Rolex Submariner 124060', price: 2650000, img: 'assets/watches/m124060.avif', images: ['assets/watches/m124060.avif','assets/watches/rolex/r1/r2.avif','assets/watches/rolex/r1/r3.webp'], stock: true, desc: 'Iconic diver watch, 40mm Oystersteel case, unidirectional bezel.' },
  { id: 'rx-2', brand: 'Rolex', name: 'Rolex Daytona 116500LN', price: 6599000, img: 'assets/watches/m116500ln.avif', images: ['assets/watches/m116500ln.avif','assets/watches/daytona.jpg','assets/watches/Rolex-Daytona-116500LN.jpg'], stock: true, desc: 'Legendary racing chronograph with Cerachrom bezel and Oyster bracelet.' },
  { id: 'rx-3', brand: 'Rolex', name: 'Rolex Datejust 126334', price: 1850000, img: 'assets/watches/m126334.avif', images: ['assets/watches/m126334.avif', 'assets/watches/rolex/DJ/r2.webp', 'assets/watches/rolex/DJ/r3.webp'  ], stock: false, desc: 'Timeless Datejust in steel with fluted bezel and jubilee bracelet.' },
  { id: 'rx-4', brand: 'Rolex', name: 'Rolex GMT-Master II 126710BLRO', price: 4125000, img: 'assets/watches/m126710blro.avif', images: ['assets/watches/m126710blro.avif', 'assets/watches/rolex/gmt/r3.jpg', 'assets/watches/rolex/gmt/r2.jpg'], stock: true, desc: 'Dual time zone travel watch — iconic "Pepsi" bezel.' },
  { id: 'rx-5', brand: 'Rolex', name: 'Rolex Yacht-Master 126622', price: 2750000, img: 'assets/watches/m126622.avif', images: ['assets/watches/m126622.avif', 'assets/watches/rolex/YM/r2.webp', 'assets/watches/rolex/YM/r3.jpg'], stock: true, desc: 'Sport-luxury model with comfortable Oysterflex bracelet option.' },
  { id: 'rx-6', brand: 'Rolex', name: 'Rolex Explorer 124270', price: 480000, img: 'assets/watches/m124270.avif', images: ['assets/watches/m124270.avif','assets/watches/rolex/RE/r2.JPG', 'assets/watches/rolex/RE/r3.jpg'], stock: true, desc: 'Compact 36mm sports watch built for exploration and durability.' },
  { id: 'rx-7', brand: 'Rolex', name: 'Rolex Milgauss 116400GV', price: 620000, img: 'assets/watches/116400GV.jpg', images: ['assets/watches/116400GV.jpg', 'assets/watches/rolex/RM/r2.JPG', 'assets/watches/rolex/RM/r3.WEBP'], stock: false, desc: 'Engineered for scientists, anti-magnetic performance.' },
  { id: 'rx-8', brand: 'Rolex', name: 'Rolex Sea-Dweller 126600', price: 3550000, img: 'assets/watches/m126600.avif', images: ['assets/watches/m126600.avif', 'assets/watches/rolex/SD/r2.avif', 'assets/watches/rolex/SD/r3.jpg'], stock: true, desc: 'Professional diver rated to 1220 meters, helium escape valve.' },
  { id: 'rx-9', brand: 'Rolex', name: 'Rolex Sky-Dweller 326934', price: 5200000, img: 'assets/watches/m326934.avif', images: ['assets/watches/m326934.avif', 'assets/watches/rolex/sky/r2.JPG', 'assets/watches/rolex/sky/r3.WEBP'], stock: true, desc: 'Annual calendar and dual time — complex yet intuitive.' },
  { id: 'rx-10', brand: 'Rolex', name: 'Rolex Cellini Time 50509', price: 3200000, img: 'assets/watches/50509.jpg', images: ['assets/watches/50509.jpg', 'assets/watches/rolex/rc/r2.JPG', 'assets/watches/rolex/rc/r3.WEBP'], stock: true, desc: 'Refined dress watch with polished case and classic leather strap.' },
  { id: 'rx-11', brand: 'Rolex', name: 'Rolex Oyster Perpetual 41 124300', price: 3000000, img: 'assets/watches/m124300.avif', images: ['assets/watches/m124300.avif', 'assets/watches/rolex/oys/r2.JPG', 'assets/watches/rolex/oys/r3.WEBP'], stock: true, desc: 'Modern entry-level Rolex with colourful dials and reliable movement.' },
  { id: 'rx-12', brand: 'Rolex', name: 'Rolex Day-Date 40 228238', price: 12500000, img: 'assets/watches/m228238.avif', images: ['assets/watches/m228238.avif', 'assets/watches/rolex/DD/r2.JPG', 'assets/watches/rolex/DD/23.WEBP'], stock: false, desc: "The President's watch: 18k yellow gold with day and date apertures." },

  { id: 'ct-1', brand: 'Cartier', name: 'Cartier Santos De Cartier Automatic', price: 446299, img: 'assets/watches/cartier1.avif', images: ['assets/watches/cartier1.avif', 'assets/watches/cartier/santos/r2.webp', 'assets/watches/cartier/santos/r3.jpg'], stock: true, desc: 'Classic square case with refined finishing.' },
  { id: 'ct-2', brand: 'Cartier', name: 'Santos de Cartier watch (Yellow Gold)', price: 1991135, img: 'assets/watches/cartier2.avif', images: ['assets/watches/cartier2.avif', 'assets/watches/cartier/gold/r2.webp', 'assets/watches/cartier/gold/r3.jpg'], stock: true, desc: 'Santos de Cartier watch, small model, quartz movement.' },
  { id: 'ct-3', brand: 'Cartier', name: 'Santos de Cartier watch (Two Tone)', price: 688315, img: 'assets/watches/cartier3.avif', images: ['assets/watches/cartier3.avif', 'assets/watches/cartier/2tone/r2.webp', 'assets/watches/cartier/2tone/r3.webp'], stock: true, desc: 'Manufacture mechanical movement with automatic winding.' },
  { id: 'ct-4', brand: 'Cartier', name: 'Tank Must de Cartier watch', price: 222605, img: 'assets/watches/cartier4.avif', images: ['assets/watches/cartier4.avif', 'assets/watches/cartier/tank/r2.jpg', 'assets/watches/cartier/tank/r3.jpg'], stock: false, desc: 'Tank Must watch, large model, SolarBeat™ movement.' },

  { id: 'pp-1', brand: 'Patek', name: 'Patek Philippe Nautilus (White Gold)', price: 4523000, img: 'assets/watches/PatekPhilippe1.avif', images: ['assets/watches/PatekPhilippe1.avif','assets/watches/Patek Philippe/Patek Philippe Nautilus (White Gold)1.jpg','assets/watches/Patek Philippe/Patek Philippe Nautilus (White Gold)2.jpg'], stock: true, desc: 'White gold case and bracelet.' },
  { id: 'pp-2', brand: 'Patek', name: 'Patek Philippe Nautilus (Rose Gold)', price: 5383000, img: 'assets/watches/PatekPhilippe2.avif', images: ['assets/watches/PatekPhilippe2.avif','assets/watches/Patek Philippe/Patek Philippe Nautilus (Rose Gold)1.jpg','assets/watches/Patek Philippe/Patek Philippe Nautilus (Rose Gold)2.jpg'], stock: true, desc: 'Rose gold with sunburst brown dial.' },
  { id: 'pp-3', brand: 'Patek', name: 'Patek Philippe Nautilus (Steel)', price: 3462000, img: 'assets/watches/PatekPhilippe3.avif', images: ['assets/watches/PatekPhilippe3.avif','assets/watches/Patek Philippe/Patek Philippe Nautilus (Steel)1.jpg','assets/watches/Patek Philippe/Patek Philippe Nautilus (Steel)2.jpg'], stock: false, desc: 'Steel version with embossed dial.' },
  { id: 'pp-4', brand: 'Patek', name: 'Patek Philippe Aquanaut (Rose Gold)', price: 4903000, img: 'assets/watches/PatekPhilippe4.avif', images: ['assets/watches/PatekPhilippe4.avif','assets/watches/Patek Philippe/Patek Philippe Aquanaut (Rose Gold)1.jpg','assets/watches/Patek Philippe/Patek Philippe Aquanaut (Rose Gold)2.jpg'], stock: true, desc: 'Aquanaut pattern with rose-gold case.' },

  { id: 'om-1', brand: 'Omega', name: 'Omega Seamaster Diver 300M', price: 420000, img: 'assets/watches/omega1.avif', images: ['assets/watches/omega1.avif','assets/watches/Omega/Omega Seamaster Diver 300M (1).jpg','assets/watches/Omega/Omega Seamaster Diver 300M (2).jpg'], stock: true, desc: 'Diver watch with co-axial escapement.' },
  { id: 'om-2', brand: 'Omega', name: 'Omega Speedmaster Professional', price: 380000, img: 'assets/watches/omega2.avif', images: ['assets/watches/omega2.avif','assets/watches/Omega/Omega Speedmaster Professional(1).jpg','assets/watches/Omega/Omega Speedmaster Professional(2).jpg'], stock: true, desc: 'The Moonwatch — legendary chronograph.' },
  { id: 'om-3', brand: 'Omega', name: 'Omega Constellation', price: 275000, img: 'assets/watches/omega3.avif', images: ['assets/watches/omega3.avif','assets/watches/Omega/Omega Constellation(1).jpg','assets/watches/Omega/Omega Constellation(2).jpg'], stock: false, desc: 'Elegant integrated bracelet design.' },
  { id: 'om-4', brand: 'Omega', name: 'Omega De Ville', price: 240000, img: 'assets/watches/omega4.avif', images: ['assets/watches/omega4.avif','assets/watches/Omega/Omega De Ville(1).jpg','assets/watches/Omega/Omega De Ville(2).jpg'], stock: true, desc: 'Classic dress collection.' },

  { id: 'ap-1', brand: 'Audemars', name: 'Royal Oak Mini Frosted Quartz', price: 6310224, img: 'assets/watches/AP1.avif', images: ['assets/watches/AP1.avif','assets/watches/AP/RoyalOakSilver1.webp','assets/watches/AP/RoyalOakSilver2.webp'], stock: true, desc: 'Hammered 18-carat white gold case.' },
  { id: 'ap-2', brand: 'Audemars', name: 'Royal Oak Mini Frosted Gold Quartz', price: 5528958, img: 'assets/watches/AP2.avif', images: ['assets/watches/AP2.avif','assets/watches/AP/RoyalOakGold1.webp','assets/watches/AP/RoyalOakGold2.webp'], stock: false, desc: 'Hammered 18-carat yellow gold case.' },
  { id: 'ap-3', brand: 'Audemars', name: 'Royal Oak Offshore Selfwinding Chronograph', price: 4891934, img: 'assets/watches/AP3.avif', images: ['assets/watches/AP3.avif','assets/watches/AP/RoyalOakOffshore1.jpg','assets/watches/AP/RoyalOakOffshore2.jpg'], stock: true, desc: 'Warm 18-carat pink gold with titanium bezel.' },

  { id: 'sk-1', brand: 'Seiko', name: 'Seiko Lord Marvel', price: 8000, img: 'assets/watches/Seiko1.avif', images: ['assets/watches/Seiko1.avif','assets/watches/Seiko/LordMarvel1.webp','assets/watches/Seiko/LordMarvel2.webp'], stock: true, desc: 'Rugged digital watch.' },
  { id: 'sk-2', brand: 'Seiko', name: 'Seiko Presage (Enamel Dial)', price: 84000, img: 'assets/watches/Seiko2.png', images: ['assets/watches/Seiko2.png','assets/watches/Seiko/Seiko_Presage1.webp','assets/watches/Seiko/Seiko_Presage2.webp'], stock: true, desc: 'Enamel dial manufactured by firing at high temperature.' },
  { id: 'sk-3', brand: 'Seiko', name: 'Seiko Prospex Marinemaster (Green Dial)', price: 92800, img: 'assets/watches/Seiko3.png', images: ['assets/watches/Seiko3.png','assets/watches/Seiko/ProspexMarineMaster1.webp','assets/watches/Seiko/ProspexMarineMaster2.webp'], stock: false, desc: 'Professional diver watch.' }
];

// ----------------- Utilities & Cart -----------------
function getQueryParam(name){
  const params = new URLSearchParams(window.location.search || '');
  return params.get(name);
}

function getCart(){
  const raw = localStorage.getItem('gentry_cart');
  if (!raw) return [];
  const parsed = JSON.parse(raw || '[]');
  return Array.isArray(parsed) ? parsed : [];
}
function saveCart(cart){
  localStorage.setItem('gentry_cart', JSON.stringify(cart));
  updateCartCounts();
}
function addToCart(product, qty=1){
  if (!product || !product.id) return;
  const cart = getCart();
  const found = cart.find(i => i.id === product.id);
  if(found) found.qty += qty; else cart.push({ id: product.id, qty, price: product.price, name: product.name, img: product.img });
  saveCart(cart);
}
function updateCartCounts(){
  const cart = getCart();
  const count = cart.reduce((s,i)=> s + (i.qty||0), 0);
  const elTop = document.getElementById('cartCountTop'); if(elTop) elTop.textContent = count;
  const el = document.getElementById('cartCount'); if(el) el.textContent = count;
  const elDet = document.getElementById('cartCountDetail'); if(elDet) elDet.textContent = count;
}
function numberWithCommas(x){ return (x||0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

// ----------------- Rendering (DOM only) -----------------
function renderFeatured(){
  const grid = document.getElementById('featuredGrid');
  if(!grid) return;
  while(grid.firstChild) grid.removeChild(grid.firstChild);
  const featured = PRODUCTS.slice(0,4);
  featured.forEach(p => {
    const card = document.createElement('div'); card.className = 'bg-gray-800 p-4 rounded-lg shadow';
    const anchor = document.createElement('a'); anchor.href = `product-detail.html?id=${encodeURIComponent(p.id)}`;
    const img = document.createElement('img'); img.src = p.img; img.alt = p.name; img.className = 'w-full h-48 object-cover rounded';
    anchor.appendChild(img);
    const h4 = document.createElement('h4'); h4.className = 'mt-3 font-semibold'; h4.textContent = p.name;
    anchor.appendChild(h4);
    const bottom = document.createElement('div'); bottom.className = 'mt-2 flex items-center justify-between';
    const price = document.createElement('div'); price.className = 'text-amber-300 font-bold'; price.textContent = `₱${numberWithCommas(p.price)}`;
    const btn = document.createElement('button'); btn.className = 'bg-amber-400 text-black px-3 py-1 rounded text-sm'; btn.textContent = 'Add';
    btn.addEventListener('click', (e) => { e.preventDefault(); addToCartHandler(p.id); });
    bottom.appendChild(price); bottom.appendChild(btn);
    anchor.appendChild(bottom);
    card.appendChild(anchor);
    grid.appendChild(card);
  });
}
function addToCartHandler(id){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return alert('Product not found');
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
    if(!grid) return;
    while(grid.firstChild) grid.removeChild(grid.firstChild);
    let copy = list.slice();
    const av = availability?.value || 'any';
    if(av==='in') copy = copy.filter(x=>x.stock);
    if(av==='out') copy = copy.filter(x=>!x.stock);
    const min = Number(minPrice?.value || 0);
    const max = Number(maxPrice?.value || 0) || Infinity;
    copy = copy.filter(x => x.price >= min && x.price <= max);
    const s = sortBy?.value || 'alpha';
    if(s==='alpha') copy.sort((a,b)=> a.name.localeCompare(b.name));
    if(s==='price-asc') copy.sort((a,b)=> a.price - b.price);
    if(s==='price-desc') copy.sort((a,b)=> b.price - a.price);

    copy.forEach(p => {
      const card = document.createElement('div'); card.className = 'bg-gray-800 p-4 rounded-lg';
      const anchor = document.createElement('a'); anchor.href = `product-detail.html?id=${encodeURIComponent(p.id)}`;
      const img = document.createElement('img'); img.src = p.img; img.alt = p.name; img.className = 'w-full h-44 object-cover rounded';
      anchor.appendChild(img);
      card.appendChild(anchor);
      const h4 = document.createElement('h4'); h4.className = 'mt-3 font-semibold'; h4.textContent = p.name;
      card.appendChild(h4);
      const brandP = document.createElement('p'); brandP.className = 'text-sm text-gray-400 mt-1'; brandP.textContent = p.brand;
      card.appendChild(brandP);
      const bottom = document.createElement('div'); bottom.className = 'mt-2 flex items-center justify-between';
      const price = document.createElement('div'); price.className = 'font-bold text-amber-300'; price.textContent = `₱${numberWithCommas(p.price)}`;
      const btn = document.createElement('button'); btn.className = 'bg-amber-400 text-black px-3 py-1 rounded text-sm'; btn.textContent = 'Add to cart';
      btn.addEventListener('click', (e)=> { e.preventDefault(); addToCartHandler(p.id); });
      bottom.appendChild(price); bottom.appendChild(btn);
      card.appendChild(bottom);
      grid.appendChild(card);
    });
  }
  document.getElementById('applyFilters')?.addEventListener('click', apply);
  apply();
}

// ----------------- Product detail -----------------
function renderProductDetail(){
  const id = getQueryParam('id');
  const root = document.getElementById('productDetail');
  if(!root) return;
  while(root.firstChild) root.removeChild(root.firstChild);
  if(!id){ showNoProduct(root); return; }
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p){ showNotFound(root,id); return; }

  let images = Array.isArray(p.images) && p.images.length ? p.images.slice() : [p.img || 'assets/watches/placeholder.avif'];
  while(images.length < 3) images.push(images[0]);

  const left = document.createElement('div'); left.className = 'space-y-4';
  const mainWrap = document.createElement('div'); mainWrap.className = 'bg-gray-800 rounded-lg overflow-hidden';
  const mainImg = document.createElement('img'); mainImg.id = 'productMainImage'; mainImg.src = images[0]; mainImg.alt = p.name; mainImg.className = 'w-full object-cover h-96';
  mainWrap.appendChild(mainImg); left.appendChild(mainWrap);

  const thumbsDiv = document.createElement('div'); thumbsDiv.className = 'flex gap-3 mt-2';
  images.forEach((imgSrc,i)=>{
    const btn = document.createElement('button'); btn.className = `thumb-btn rounded overflow-hidden ${i===0 ? 'border border-amber-400':'border border-transparent'}`;
    btn.setAttribute('data-idx',i);
    const thumbImg = document.createElement('img'); thumbImg.src=imgSrc; thumbImg.alt=`thumb-${i}`; thumbImg.className='w-24 h-24 object-cover';
    btn.appendChild(thumbImg);
    btn.addEventListener('click',()=>{ mainImg.src=imgSrc; thumbsDiv.querySelectorAll('.thumb-btn').forEach(t=>t.classList.remove('border-amber-400')); btn.classList.add('border-amber-400'); });
    thumbsDiv.appendChild(btn);
  });
  left.appendChild(thumbsDiv);

  const right = document.createElement('div');
  const nameEl = document.createElement('h2'); nameEl.className='text-2xl font-semibold'; nameEl.textContent=p.name;
  const brandEl = document.createElement('p'); brandEl.className='text-sm text-gray-400 mt-2'; brandEl.textContent=p.brand;
  const priceEl = document.createElement('div'); priceEl.className='mt-4 text-amber-300 font-bold text-2xl'; priceEl.textContent=`₱${numberWithCommas(p.price)}`;
  const descEl = document.createElement('p'); descEl.className='mt-4 text-gray-300'; descEl.textContent=p.desc||'No description available.';
  const availEl = document.createElement('div'); availEl.className='mt-4 text-sm text-gray-400';
  const availSpan = document.createElement('span'); availSpan.className=`${p.stock?'text-green-400':'text-red-400'} font-semibold`; availSpan.textContent=p.stock?'In Stock':'Out of Stock';
  availEl.appendChild(document.createTextNode('Availability: ')); availEl.appendChild(availSpan);

  const controls = document.createElement('div'); controls.className='mt-6 flex gap-3';
  const addBtn = document.createElement('button'); addBtn.className=`px-6 py-3 ${p.stock?'bg-amber-400 text-black':'bg-gray-700 text-gray-400 cursor-not-allowed'} rounded font-semibold`; addBtn.textContent=p.stock?'Add to cart':'Out of stock';
  if(!p.stock) addBtn.disabled=true;
  addBtn.addEventListener('click',()=>{ addToCart(p,1); updateCartCounts(); const orig=addBtn.textContent; addBtn.textContent='Added ✅'; addBtn.disabled=true; setTimeout(()=>{ addBtn.textContent=orig; if(p.stock) addBtn.disabled=false; },1200); });
  const backA = document.createElement('a'); backA.href='catalog.html'; backA.className='px-6 py-3 border border-gray-700 rounded'; backA.textContent='Back to catalog';
  controls.appendChild(addBtn); controls.appendChild(backA);

  right.appendChild(nameEl); right.appendChild(brandEl); right.appendChild(priceEl); right.appendChild(descEl); right.appendChild(availEl); right.appendChild(controls);

  root.appendChild(left); root.appendChild(right);

  renderProductSuggestions(p);
}

// ----------------- Cart page -----------------
function renderCartPage(){
  const container = document.getElementById('cartContainer'); if(!container) return;
  const cart = getCart();
  while(container.firstChild) container.removeChild(container.firstChild);
  if(!cart || !cart.length){ const p = document.createElement('p'); p.className='text-gray-400'; p.textContent='Your cart is empty.'; container.appendChild(p); return; }
  let total=0;
  const wrapper = document.createElement('div'); wrapper.className='space-y-4';
  cart.forEach(item=>{ total+=(item.price||0)*(item.qty||0);
    const row = document.createElement('div'); row.className='flex items-center justify-between bg-gray-900 p-3 rounded';
    const left = document.createElement('div'); left.className='flex items-center gap-4';
    const img = document.createElement('img'); img.src=item.img||'assets/watches/placeholder.avif'; img.className='w-20 h-20 object-cover rounded';
    const info = document.createElement('div'); const title=document.createElement('div'); title.className='font-semibold'; title.textContent=item.name;
    const qty=document.createElement('div'); qty.className='text-sm text-gray-400'; qty.textContent=`₱${numberWithCommas(item.price)} x ${item.qty}`;
    info.appendChild(title); info.appendChild(qty); left.appendChild(img); left.appendChild(info);
    const right=document.createElement('div'); const removeBtn=document.createElement('button'); removeBtn.className='text-sm text-red-400'; removeBtn.textContent='Remove';
    removeBtn.addEventListener('click',()=>removeFromCart(item.id)); right.appendChild(removeBtn);
    row.appendChild(left); row.appendChild(right); wrapper.appendChild(row);
  });
  const totalDiv=document.createElement('div'); totalDiv.className='mt-4 p-4 bg-gray-900 rounded flex items-center justify-between';
  const label=document.createElement('div'); label.className='text-gray-400'; label.textContent='Total';
  const amount=document.createElement('div'); amount.className='font-bold text-amber-300'; amount.textContent=`₱${numberWithCommas(total)}`;
  totalDiv.appendChild(label); totalDiv.appendChild(amount);
  const controls=document.createElement('div'); controls.className='mt-4 flex gap-3';
  const checkoutBtn=document.createElement('button'); checkoutBtn.className='px-6 py-3 bg-amber-400 text-black rounded'; checkoutBtn.textContent='Checkout'; checkoutBtn.addEventListener('click',checkout);
  const clearBtn=document.createElement('button'); clearBtn.className='px-6 py-3 border border-gray-700 rounded'; clearBtn.textContent='Clear'; clearBtn.addEventListener('click',clearCart);
  controls.appendChild(checkoutBtn); controls.appendChild(clearBtn);
  wrapper.appendChild(totalDiv); wrapper.appendChild(controls);
  container.appendChild(wrapper);
}
function removeFromCart(id){ let cart=getCart(); cart=cart.filter(i=>i.id!==id); saveCart(cart); renderCartPage(); }
function clearCart(){ localStorage.removeItem('gentry_cart'); updateCartCounts(); renderCartPage(); }
function checkout(){
  const user=getCurrentUser(); if(!user){ alert('Please sign in to checkout.'); window.location.href='login.html'; return; }
  const cart=getCart(); if(!cart.length){ alert('Cart is empty'); return; }
  let orders=[]; try{ orders=localStorage.getItem('gentry_orders')?JSON.parse(localStorage.getItem('gentry_orders')):[]; } catch(e){ orders=[]; }
  const id='ord-'+Date.now().toString(36); const total=cart.reduce((s,i)=>s+(i.price||0)*(i.qty||0),0);
  orders.push({id,userId:user.id,date:new Date().toISOString(),items:cart,total});
  localStorage.setItem('gentry_orders',JSON.stringify(orders));
  clearCart(); alert('Order placed! Order ID: '+id);
}

// ----------------- Mobile menu -----------------
function initMobileMenu(){
  const btn=document.getElementById('mobileMenuBtn'); if(!btn) return;
  let mobileMenu=document.getElementById('mobileSiteMenu');
  if(!mobileMenu){
    mobileMenu=document.createElement('div'); mobileMenu.id='mobileSiteMenu'; mobileMenu.className='fixed inset-0 z-50 bg-black/70 hidden';
    const panel=document.createElement('div'); panel.className='absolute right-0 top-0 w-3/4 max-w-xs h-full bg-gray-900 p-6 shadow-lg overflow-auto';
    const header=document.createElement('div'); header.className='flex items-center justify-between mb-6';
    const headerLeft=document.createElement('div'); headerLeft.className='flex items-center gap-3';
    const logo=document.createElement('div'); logo.className='w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center font-bold text-black'; logo.textContent='GT';
    const textWrap=document.createElement('div'); const title=document.createElement('div'); title.className='font-semibold'; title.textContent='The Gentry';
    const subtitle=document.createElement('div'); subtitle.className='text-xs text-gray-400'; subtitle.textContent='Luxury timepieces';
    textWrap.appendChild(title); textWrap.appendChild(subtitle); headerLeft.appendChild(logo); headerLeft.appendChild(textWrap);
    const closeBtn=document.createElement('button'); closeBtn.id='mobileCloseBtn'; closeBtn.setAttribute('aria-label','Close menu'); closeBtn.className='text-gray-300 text-2xl'; closeBtn.textContent='✕'; closeBtn.addEventListener('click',()=>toggleMobileMenu(false));
    header.appendChild(headerLeft); header.appendChild(closeBtn); panel.appendChild(header);
    const nav=panel.appendChild(document.createElement('nav')); nav.className='space-y-3'; ['Home','Catalog','Featured','Cart'].forEach(item=>{
      const a=document.createElement('a'); a.href=item==='Home'?'index.html':item.toLowerCase()+'.html'; a.className='block py-2 px-3 hover:bg-gray-800 rounded'; a.textContent=item; nav.appendChild(a);
    });
    mobileMenu.appendChild(panel); document.body.appendChild(mobileMenu);
  }
  btn.addEventListener('click',()=>toggleMobileMenu());
}
function toggleMobileMenu(show){
  const menu=document.getElementById('mobileSiteMenu'); if(!menu) return;
  const isHidden=menu.classList.contains('hidden');
  if(show===true || (show===undefined && isHidden)) menu.classList.remove('hidden'); else menu.classList.add('hidden');
}

// ----------------- Auth -----------------
function getCurrentUser(){ 
  try { return JSON.parse(localStorage.getItem('gentry_user')) || null; } catch(e){ return null; } 
}
function logoutUser(){ localStorage.removeItem('gentry_user'); updateAuthUI(); window.location.href='index.html'; }

function initialsFromName(name){ if(!name) return '?'; return name.split(' ').map(s=>s[0].toUpperCase()).join('').slice(0,2); }
function shortName(name){ if(!name) return ''; const parts=name.split(' '); return parts[0]+(parts.length>1? ' '+parts[1][0]+'.':''); }

function toggleAccountMenu(){
  const menu=document.getElementById('accountMenu'); if(!menu) return;
  menu.classList.toggle('hidden');
}

function renderProductSuggestions(currentProduct){
  const section = document.getElementById('productSuggestionsSection');
  const container = document.getElementById('productSuggestions');
  if(!section || !container) return;

  // Clear previous suggestions
  while(container.firstChild) container.removeChild(container.firstChild);

  // Filter recommended: same brand but not the current product
  const recommendations = PRODUCTS.filter(p => p.brand === currentProduct.brand && p.id !== currentProduct.id).slice(0,4);

  if(recommendations.length === 0){
    section.classList.add('hidden');
    return;
  }
  section.classList.remove('hidden');

  recommendations.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'bg-gray-800 p-4 rounded-lg shadow';

    const anchor = document.createElement('a');
    anchor.href = `product-detail.html?id=${encodeURIComponent(p.id)}`;

    const img = document.createElement('img');
    img.src = p.img;
    img.alt = p.name;
    img.className = 'w-full h-44 object-cover rounded';
    anchor.appendChild(img);

    const nameEl = document.createElement('h4');
    nameEl.className = 'mt-3 font-semibold';
    nameEl.textContent = p.name;
    anchor.appendChild(nameEl);

    const priceEl = document.createElement('div');
    priceEl.className = 'mt-2 font-bold text-amber-300';
    priceEl.textContent = `₱${numberWithCommas(p.price)}`;
    anchor.appendChild(priceEl);

    card.appendChild(anchor);
    container.appendChild(card);
  });
}


function updateAuthUI(){
  const area=document.getElementById('accountArea'); if(!area) return;
  const current=getCurrentUser();
  let btn=document.getElementById('accountBtn');
  let signIn=document.getElementById('signInBtn');
  let menu=document.getElementById('accountMenu');
  if(!menu){ menu=document.createElement('div'); menu.id='accountMenu'; menu.className='absolute right-0 mt-2 w-64 bg-gray-900 text-gray-200 rounded shadow-lg hidden'; area.appendChild(menu); }

  area.querySelectorAll('#accountBtn,#signInBtn').forEach(el=>el.remove());

  if(!current){
    signIn=document.createElement('a'); signIn.id='signInBtn'; signIn.href='login.html'; signIn.className='ml-4 px-4 py-2 border border-gray-700 rounded-md'; signIn.textContent='Sign in';
    area.appendChild(signIn);
    menu.classList.add('hidden');
    return;
  }

  btn=document.createElement('button'); btn.id='accountBtn'; btn.className='ml-4 flex items-center gap-2 rounded-md px-3 py-1 bg-gray-800';
  const avatar=document.createElement('span'); avatar.id='accountAvatar'; avatar.className='w-8 h-8 rounded-full flex items-center justify-center bg-amber-400 text-black font-semibold'; avatar.textContent=initialsFromName(current.name||current.email);
  const nameSpan=document.createElement('span'); nameSpan.id='accountNameShort'; nameSpan.className='hidden md:inline-block text-sm text-gray-200'; nameSpan.textContent=shortName(current.name||current.email);
  btn.appendChild(avatar); btn.appendChild(nameSpan); area.appendChild(btn);

  btn.addEventListener('click',e=>{ e.stopPropagation(); toggleAccountMenu(); });
  document.addEventListener('click',evt=>{ if(!menu.contains(evt.target) && !btn.contains(evt.target)) menu.classList.add('hidden'); });

  // populate menu
  while(menu.firstChild) menu.removeChild(menu.firstChild);
  const topWrap=document.createElement('div'); topWrap.className='flex items-center gap-3 p-3 border-b border-gray-700';
  const avatarDiv=document.createElement('div'); avatarDiv.className='w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center font-semibold text-black'; avatarDiv.textContent=initialsFromName(current.name||current.email);
  const infoDiv=document.createElement('div'); const nameDiv=document.createElement('div'); nameDiv.className='font-semibold'; nameDiv.textContent=current.name||current.email; const emailDiv=document.createElement('div'); emailDiv.className='text-xs text-gray-400'; emailDiv.textContent=current.email;
  infoDiv.appendChild(nameDiv); infoDiv.appendChild(emailDiv); topWrap.appendChild(avatarDiv); topWrap.appendChild(infoDiv); menu.appendChild(topWrap);

  const actions=document.createElement('div'); actions.className='mt-3 border-t border-gray-700 pt-3 space-y-2';
  const accLink=document.createElement('a'); accLink.href='account.html'; accLink.className='block py-2 px-2 rounded hover:bg-gray-900'; accLink.textContent='Account details';
  const ordersLink=document.createElement('a'); ordersLink.href='orders.html'; ordersLink.className='block py-2 px-2 rounded hover:bg-gray-900'; ordersLink.textContent='Orders';
  const signOutBtn=document.createElement('button'); signOutBtn.id='signOutBtn'; signOutBtn.className='w-full mt-2 py-2 bg-red-600 text-white rounded'; signOutBtn.textContent='Sign out';
  signOutBtn.addEventListener('click',()=>logoutUser());
  actions.appendChild(accLink); actions.appendChild(ordersLink); actions.appendChild(signOutBtn); menu.appendChild(actions);
}



// ----------------- DOM Ready -----------------
document.addEventListener('DOMContentLoaded',()=>{
  updateCartCounts();
  renderFeatured();
  renderProducts();
  renderProductDetail();
  renderCartPage();
  updateAuthUI();
  initMobileMenu();
});
