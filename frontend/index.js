// index.js
  const video = document.getElementById('foregroundVideo');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('menu-overlay');
  const mainContent = document.getElementById('main-content');

  window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      // Moves video upward at half the scroll speed
      video.style.transform = `translateY(-${scrollY * 0.5}px)`;

      
    });

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('-translate-x-full');
    overlay.classList.remove('hidden');
    mainContent.classList.add('blur-sm', 'scale-[0.98]');
  });

  closeBtn.addEventListener('click', () => {
    mobileMenu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    mainContent.classList.remove('blur-sm', 'scale-[0.98]');
  });

  overlay.addEventListener('click', () => {
    mobileMenu.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    mainContent.classList.remove('blur-sm', 'scale-[0.98]');
  });