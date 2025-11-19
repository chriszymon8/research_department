


// 1. PRODUCTS from backend
let PRODUCTS = [];

// Fetch initial products from backend
function fetchProducts() {
  fetch("https://research-department.onrender.com/api/products")
    .then(res => res.json())
    .then(data => {
      PRODUCTS = data;
      renderFeatured();
      renderProducts();
      renderProductDetail();
    })
    .catch(err => console.log(err));
}

function renderProducts(list) {
 
}





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
function addToCart(product, qty = 1) {
    const user = getCurrentUser();

    if (!user) {
        
        const pending = { ...product, qty };
        localStorage.setItem('gentry_pending_item', JSON.stringify(pending));

        
        window.location.href = './login.html';
        return;
    }

    if (!product || !product.id) return;

    const cart = getCart();
    const found = cart.find(i => i.id === product.id);
    if (found) found.qty += qty;
    else cart.push({ id: product.id, qty, price: product.price, name: product.name, img: product.img });

    saveCart(cart);
    updateCartCounts();
    showToast('Added to cart', 'success');
}




function addToCartHandler(id){
    const user = getCurrentUser();
    if(!user){
        
        showToast('Please register or sign in first', 'error');
        setTimeout(() => {
            window.location.href = 'register.html';
        }, 1000);
        return;
    }

    const p = PRODUCTS.find(x => x.id === id);
    if(!p){
        showToast('Product not found','error');
        return;
    }

    addToCart(p,1);
    showToast('Added to cart','success');
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
    btn.addEventListener('click', (e) => {
    e.preventDefault();
    addToCartHandler(p.id);
});

    bottom.appendChild(price); bottom.appendChild(btn);
    anchor.appendChild(bottom);
    card.appendChild(anchor);
    grid.appendChild(card);
  });
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


function renderProductDetail() {
    const id = getQueryParam('id');
    const root = document.getElementById('productDetail');
    if (!root) return;

    while (root.firstChild) root.removeChild(root.firstChild);
    if (!id) { 
        const p = document.createElement('p');
        p.textContent = 'No product selected.';
        root.appendChild(p);
        return; 
    }

    // Fetch product directly from server
    fetch("https://research-department.onrender.com/api/products")
        .then(res => res.json())
        .then(products => {
            const p = products.find(x => x.id === id);
            if (!p) {
                const notFound = document.createElement('p');
                notFound.textContent = `Product with ID "${id}" not found.`;
                root.appendChild(notFound);
                return;
            }

            let images = Array.isArray(p.images) && p.images.length ? p.images.slice() : [p.img || 'assets/watches/placeholder.avif'];
            while (images.length < 3) images.push(images[0]);

            // LEFT: main image + thumbnails
            const left = document.createElement('div'); left.className = 'space-y-4';
            const mainWrap = document.createElement('div'); mainWrap.className = 'bg-gray-800 rounded-lg overflow-hidden';
            const mainImg = document.createElement('img'); mainImg.id = 'productMainImage'; mainImg.src = images[0]; mainImg.alt = p.name; mainImg.className = 'w-full object-cover h-96';
            mainWrap.appendChild(mainImg); left.appendChild(mainWrap);

            const thumbsDiv = document.createElement('div'); thumbsDiv.className = 'flex gap-3 mt-2';
            images.forEach((imgSrc,i)=>{
                const btn = document.createElement('button'); 
                btn.className = `thumb-btn rounded overflow-hidden ${i===0 ? 'border border-amber-400':'border border-transparent'}`;
                btn.setAttribute('data-idx',i);
                const thumbImg = document.createElement('img'); 
                thumbImg.src=imgSrc; thumbImg.alt=`thumb-${i}`; thumbImg.className='w-24 h-24 object-cover';
                btn.appendChild(thumbImg);

                btn.addEventListener('click', () => {
                    mainImg.src = imgSrc;
                    thumbsDiv.querySelectorAll('button').forEach(b=>b.classList.remove('border-amber-400'));
                    btn.classList.add('border-amber-400');
                });

                thumbsDiv.appendChild(btn);
            });
            left.appendChild(thumbsDiv);

            // RIGHT: product info + controls
            const right = document.createElement('div');
            const nameEl = document.createElement('h2'); nameEl.className='text-2xl font-semibold'; nameEl.textContent=p.name;
            const brandEl = document.createElement('p'); brandEl.className='text-sm text-gray-400 mt-2'; brandEl.textContent=p.brand;
            const priceEl = document.createElement('div'); priceEl.className='mt-4 text-amber-300 font-bold text-2xl'; priceEl.textContent=`₱${numberWithCommas(p.price)}`;
            const descEl = document.createElement('p'); descEl.className='mt-4 text-gray-300'; descEl.textContent=p.desc||'No description available.';
            const availEl = document.createElement('div'); availEl.className='mt-4 text-sm text-gray-400';
            const availSpan = document.createElement('span'); availSpan.className=`${p.stock?'text-green-400':'text-red-400'} font-semibold`; availSpan.textContent=p.stock?'In Stock':'Out of Stock';
            availEl.appendChild(document.createTextNode('Availability: ')); availEl.appendChild(availSpan);

            const controls = document.createElement('div'); controls.className='mt-6 flex gap-3';
            const addBtn = document.createElement('button'); 
            addBtn.className=`px-6 py-3 ${p.stock?'bg-amber-400 text-black':'bg-gray-700 text-gray-400 cursor-not-allowed'} rounded font-semibold`; 
            addBtn.textContent=p.stock?'Add to cart':'Out of stock';
            if(!p.stock) addBtn.disabled=true;
            addBtn.addEventListener('click',()=>{ 
                if(p.stock){ 
                    addToCart(p,1); 
                    updateCartCounts(); 
                    const orig=addBtn.textContent; 
                    addBtn.textContent='Added ✅'; 
                    addBtn.disabled=true; 
                    setTimeout(()=>{
                        addBtn.textContent=orig; 
                        if(p.stock) addBtn.disabled=false; 
                    },1200); 
                }
            });
            const backA = document.createElement('a'); backA.href='catalog.html'; backA.className='px-6 py-3 border border-gray-700 rounded'; backA.textContent='Back to catalog';
            controls.appendChild(addBtn); controls.appendChild(backA);

            right.appendChild(nameEl); 
            right.appendChild(brandEl); 
            right.appendChild(priceEl); 
            right.appendChild(descEl); 
            right.appendChild(availEl); 
            right.appendChild(controls);

            root.appendChild(left); 
            root.appendChild(right);

            renderProductSuggestions(p);
        })
        .catch(err => {
            console.error(err);
            const errEl = document.createElement('p');
            errEl.textContent = 'Failed to load product data.';
            root.appendChild(errEl);
        });
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
// ---------------- CART FUNCTIONS ----------------

// Remove a product from cart by ID
function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
    updateCartCounts();
    renderCartPage();
    showToast('Item removed from cart', 'success');
}

// Clear the entire cart
function clearCart() {
    localStorage.removeItem('gentry_cart');
    updateCartCounts();
    renderCartPage();
    showToast('Cart cleared', 'success');
}

// Checkout function
// ----------------- Checkout function (updated) -----------------
function checkout() {
    const user = getCurrentUser();
    if (!user) {
        showToast('Please sign in to checkout.', 'error');
        setTimeout(() => window.location.href = 'login.html', 1000);
        return;
    }

    const cart = getCart();
    if (!cart.length) {
        showToast('Cart is empty', 'error');
        return;
    }

    // Create order object
    const order = {
        userEmail: user.email || "guest@example.com",
        items: cart.map(item => ({ name: item.name, id: item.id, qty: item.qty, price: item.price })),
        total: cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0),
        date: new Date().toISOString()
    };

    // Send order to backend
    fetch("https://research-department.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
    })
    .then(res => {
        if (!res.ok) return Promise.reject('Failed to place order');
        return res.json();
    })
    .then(data => {
        // For each item in cart, reduce stock in backend
        cart.forEach(item => {
            // Calculate new quantity
            fetch(`https://research-department.onrender.com/api/products/${item.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantityChange: -item.qty }) // send negative value to reduce stock
            });
        });

        // Clear cart after successful order
        clearCart();
        showToast(`Order placed! Order ID: ${data.order?.id || "N/A"}`, 'success');
    })
    .catch(err => {
        console.error(err);
        showToast('Failed to place order', 'error');
    });
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

// ---------- ADMIN (client-side demo) ----------
const ADMIN_CREDENTIALS = { username: 'admin', password: 'gentry123' }; 
function adminLogin(username, password){
  if(username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password){
    localStorage.setItem('gentry_admin', JSON.stringify({ username }));
    return true;
  }
  return 'Invalid username or password';
}
function adminLogout(){
  localStorage.removeItem('gentry_admin');
}
function isAdminLoggedIn(){
  try { return !!JSON.parse(localStorage.getItem('gentry_admin')); } catch(e){ return false; }
}

// ----- Users management -----
function getUsers(){
  try { return JSON.parse(localStorage.getItem('gentry_users')) || []; } catch(e){ return []; }
}
function saveUsers(list){ localStorage.setItem('gentry_users', JSON.stringify(list)); }

function blockUser(userId, block=true){
  const users = getUsers();
  const u = users.find(x=>x.id === userId || x.email === userId);
  if(!u) return false;
  u.blocked = !!block;
  saveUsers(users);
  return true;
}

// ----- Products CRUD for admin -----
function getProducts(){
  try { return Array.isArray(window.PRODUCTS) ? PRODUCTS : (JSON.parse(localStorage.getItem('gentry_products')) || []);} catch(e){ return []; }
}
function saveProducts(list){
  // update global PRODUCTS if present and persist to localStorage for admin usage
  if(Array.isArray(window.PRODUCTS)) window.PRODUCTS = list;
  localStorage.setItem('gentry_products', JSON.stringify(list));
}
function addProduct(prod){
  const list = getProducts();
  if(list.find(p=>p.id === prod.id)) { alert('Product id already exists'); return false; }
  list.push(prod);
  saveProducts(list);
  return true;
}
function deleteProduct(id){
  let list = getProducts();
  list = list.filter(p=>p.id !== id);
  saveProducts(list);
}

// ----- Admin rendering & analytics -----
function renderAdminDashboard(){
  renderAdminUsers();
  renderAdminProducts();
  renderAnalytics();
}

function renderAdminUsers(){
  const wrap = document.getElementById('adminUsersList');
  if(!wrap) return;
  while(wrap.firstChild) wrap.removeChild(wrap.firstChild);
  const users = getUsers();
  if(!users.length){ wrap.textContent = 'No registered users.'; return; }
  users.forEach(u=>{
    const row = document.createElement('div'); row.className = 'flex items-center justify-between bg-gray-900 p-2 rounded';
    const left = document.createElement('div');
    left.innerHTML = `<div class="font-semibold text-sm">${u.name || u.email}</div><div class="text-xs text-gray-400">${u.email}</div>`;
    const right = document.createElement('div');
    const blockBtn = document.createElement('button'); blockBtn.className = u.blocked ? 'px-2 py-1 bg-green-600 rounded text-xs' : 'px-2 py-1 bg-red-600 rounded text-xs';
    blockBtn.textContent = u.blocked ? 'Unblock' : 'Block';
    blockBtn.addEventListener('click', ()=> { blockUser(u.id || u.email, !u.blocked); renderAdminUsers(); });
    right.appendChild(blockBtn);
    row.appendChild(left); row.appendChild(right);
    wrap.appendChild(row);
  });
}

function renderAdminProducts(){
  const wrap = document.getElementById('adminProductsList');
  if(!wrap) return;
  while(wrap.firstChild) wrap.removeChild(wrap.firstChild);
  const prods = getProducts();
  if(!prods.length){ wrap.textContent = 'No products.'; return; }
  prods.forEach(p=>{
    const card = document.createElement('div'); card.className='bg-gray-900 p-3 rounded flex items-start gap-3';
    const img = document.createElement('img'); img.src = p.img || 'assets/watches/placeholder.avif'; img.className='w-16 h-16 object-cover rounded';
    const info = document.createElement('div'); info.className='flex-1';
    info.innerHTML = `<div class="font-semibold">${p.name}</div><div class="text-xs text-gray-400">₱${numberWithCommas(p.price)}</div>`;
    const actions = document.createElement('div');
    const del = document.createElement('button'); del.className='px-2 py-1 bg-red-600 rounded text-xs'; del.textContent='Delete';
    del.addEventListener('click', ()=> { if(confirm('Delete product?')){ deleteProduct(p.id); renderAdminProducts(); } });
    actions.appendChild(del);
    card.appendChild(img); card.appendChild(info); card.appendChild(actions); wrap.appendChild(card);
  });
}

// ----- Analytics: chart of purchases per product -----
function renderAnalytics(){
  const ordersRaw = localStorage.getItem('gentry_orders');
  let orders = [];
  try { orders = ordersRaw ? JSON.parse(ordersRaw) : []; } catch(e){ orders = []; }
  // aggregate count per product id
  const counts = {};
  orders.forEach(o=>{
    (o.items || []).forEach(it=>{
      counts[it.id] = (counts[it.id] || 0) + (it.qty || 1);
    });
  });
  const labels = Object.keys(counts);
  const data = labels.map(l => counts[l]);

  // fallback: show top 5 products by count or show empty
  const ctx = document.getElementById('salesChart');
  if(!ctx) return;
  // destroy previous chart if exists
  if(window._adminSalesChart){ window._adminSalesChart.destroy(); window._adminSalesChart = null; }
  window._adminSalesChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.length ? labels : ['No sales'],
      datasets: [{
        label: 'Units sold',
        data: labels.length ? data : [0]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}


// ----------------- DOM Ready -----------------
document.addEventListener('DOMContentLoaded', () => {
  updateCartCounts();
  updateAuthUI();
  initMobileMenu();

  // fetch products first
  fetch("https://research-department.onrender.com/api/products")
    .then(res => res.json())
    .then(data => {
      PRODUCTS = data;
      renderFeatured();
      renderProducts();
      renderProductDetail();
    })
    .catch(err => console.log(err));

  renderCartPage();
});

