// Casa Eluney — interacciones. El contenido ya viene en el HTML (lo genera scripts/build.mjs).

const HOUSE = HOUSES[document.body.dataset.house] || null;

// Enlaces viejos con hash (#pequena, #gran) → páginas nuevas.
const legacyHouse = HOUSES[window.location.hash.slice(1)];
if (legacyHouse) window.location.replace(legacyHouse.path);

document.querySelectorAll('.nav-house').forEach((a) => a.classList.toggle('active', !!HOUSE && a.dataset.house === HOUSE.id));

// Carruseles en bucle: se duplica el contenido (oculto para lectores de pantalla) para que no corte.
function loopClone(track) {
  if (!track || track.dataset.cloned) return;
  track.dataset.cloned = '1';
  [...track.children].forEach((node) => {
    const copy = node.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    copy.querySelectorAll('img').forEach((img) => { img.alt = ''; });
    track.appendChild(copy);
  });
}
loopClone(document.getElementById('marquee-a'));
loopClone(document.getElementById('marquee-b'));
document.querySelectorAll('.reviews-track').forEach(loopClone);

const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');

function positionMobileNav() {
  navMobile.style.top = (document.querySelector('header').offsetHeight + 4) + 'px';
}
positionMobileNav();
window.addEventListener('resize', positionMobileNav);

navToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  positionMobileNav();
  const open = navMobile.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

function closeMobileNav() {
  navMobile.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}
document.addEventListener('click', (e) => {
  if (!navMobile.contains(e.target)) closeMobileNav();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileNav();
});

// Visor de fotos: <dialog> nativo + scroll-snap, así el swipe usa el momentum del sistema.
const lightbox = document.getElementById('lightbox');
const lbTrack = lightbox.querySelector('.lb-track');
const lbCount = lightbox.querySelector('.lb-count');

function openLightbox(photos, index, name) {
  lbTrack.innerHTML = photos.map((src, n) => `<div class="lb-slide"><img src="${src}" alt="${(ALT[src.split('/').pop().replace(/\.\w+$/, '')] || `Foto ${n + 1} de ${name}`).replace(/"/g, '&quot;')}" loading="${Math.abs(n - index) < 2 ? 'eager' : 'lazy'}"></div>`).join('');
  lightbox.showModal();
  lbTrack.scrollLeft = index * lbTrack.clientWidth;
  updateCount();
}
function updateCount() {
  const total = lbTrack.children.length;
  const n = Math.round(lbTrack.scrollLeft / lbTrack.clientWidth) + 1;
  lbCount.textContent = `${Math.min(n, total)} / ${total}`;
}
lbTrack.addEventListener('scroll', updateCount, { passive: true });
lightbox.querySelector('.lb-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (e) => { if (e.target.classList.contains('lb-slide')) lightbox.close(); });
lightbox.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    lbTrack.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * lbTrack.clientWidth, behavior: 'smooth' });
  }
});
document.addEventListener('click', (e) => {
  const item = e.target.closest('[data-photo]');
  if (item && HOUSE) openLightbox(HOUSE.photos, Number(item.dataset.photo), HOUSE.name);
});

// Reseñas: avanza solo (derecha a izquierda) sobre un scroll nativo, así también se puede deslizar con el dedo.
// Se pausa mientras se toca o se pasa el mouse, y retoma unos segundos después. La lista está duplicada:
// al llegar a la mitad se vuelve atrás exactamente esa distancia, sin salto visible.
const REVIEWS_SPEED = 40; // px por segundo
const RESUME_AFTER = 2500; // ms
function setupReviewsCarousel(wrap) {
  if (wrap.dataset.ready) return;
  wrap.dataset.ready = '1';
  wrap._pos = wrap.scrollLeft;
  wrap._pausedUntil = 0;
  const hold = () => { wrap._pausedUntil = Infinity; };
  const release = () => { wrap._pausedUntil = performance.now() + RESUME_AFTER; };
  wrap.addEventListener('pointerdown', hold);
  wrap.addEventListener('touchstart', hold, { passive: true });
  wrap.addEventListener('mouseenter', hold);
  ['pointerup', 'pointercancel', 'touchend', 'touchcancel', 'mouseleave'].forEach((ev) => wrap.addEventListener(ev, release, { passive: true }));
  wrap.addEventListener('wheel', release, { passive: true });
}
let lastFrame = performance.now();
function tickReviews(now) {
  const dt = Math.min(now - lastFrame, 100) / 1000;
  lastFrame = now;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.reviews-wrap').forEach((wrap) => {
    setupReviewsCarousel(wrap);
    // Si el usuario lo movió (dedo, trackpad, momentum), seguimos desde donde lo dejó.
    if (Math.abs(wrap.scrollLeft - wrap._pos) > 2) { wrap._pos = wrap.scrollLeft; wrap._pausedUntil = Math.max(wrap._pausedUntil, now + RESUME_AFTER); }
    if (reduce || now < wrap._pausedUntil) return;
    const cards = wrap.querySelectorAll('.review-card');
    const half = cards[cards.length / 2].offsetLeft - cards[0].offsetLeft;
    wrap._pos += REVIEWS_SPEED * dt;
    if (wrap._pos >= half) wrap._pos -= half;
    wrap.scrollLeft = wrap._pos;
  });
  requestAnimationFrame(tickReviews);
}
requestAnimationFrame(tickReviews);
