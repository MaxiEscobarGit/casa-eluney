const WHATSAPP_NUMBER = '54154581980';

const ICONS = {
  wifi: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 8.5a16 16 0 0 1 20 0"></path><path d="M5.5 12.5a11 11 0 0 1 13 0"></path><path d="M9 16.5a6 6 0 0 1 6 0"></path><circle cx="12" cy="20" r="1.2" fill="currentColor" stroke="none"></circle></svg>',
  heat: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4v16M9 4v16M14 4v16M19 4v16"></path><path d="M4 9h15M4 15h15"></path></svg>',
  kitchen: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="10" width="14" height="8" rx="2"></rect><path d="M3 10a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4"></path><path d="M20 12h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1"></path></svg>',
  parking: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"></rect><path d="M9.5 16V8h3.2a2.4 2.4 0 0 1 0 4.8H9.5"></path></svg>',
  tv: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="12" rx="2"></rect><path d="M8 21h8M12 17v4"></path></svg>',
  bed: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"></path><path d="M3 18h18"></path><path d="M7 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"></path></svg>',
  bath: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3z"></path><path d="M4 12V6a2 2 0 0 1 2-2"></path></svg>',
  outdoor: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4"></path><path d="M6 9a6 6 0 0 1 12 0c0 3-2 4-2 6H8c0-2-2-3-2-6z"></path><path d="M9 21h6"></path><path d="M12 15v6"></path></svg>',
};

const HOUSES = {
  pequena: {
    name: 'Pequeña Eluney',
    eyebrow: 'CASA PRINCIPAL · 2-3 PAX',
    tagline: 'La casa principal del complejo, ideal para una estadía íntima',
    accent: 'var(--pequena)',
    accentSoft: 'var(--pequena-soft)',
    description: 'La casa principal del complejo Eluney, pensada para dos o tres personas. Tiene un dormitorio con cama matrimonial y cama de una plaza (ambas con sommier y sábanas incluidas), un baño completo y una cocina-comedor totalmente equipada con microondas. Wifi y TV en un barrio tranquilo y familiar, a menos de 5 minutos del Centro Cívico y muy cerca de los accesos a las principales rutas de excursión.',
    stats: [{ value: '1', label: 'Dormitorio' }, { value: '1', label: 'Baño' }, { value: '2-3', label: 'Huéspedes' }],
    amenities: [
      { icon: 'wifi', text: 'WiFi' },
      { icon: 'tv', text: 'TV' },
      { icon: 'kitchen', text: 'Cocina equipada' },
      { icon: 'kitchen', text: 'Microondas' },
      { icon: 'bed', text: 'Sábanas incluidas' },
      { icon: 'bath', text: 'Baño privado' },
    ],
    heroImage: 'images/pequena-cover.png',
    photos: ['images/pequena-01.png', 'images/pequena-02.png', 'images/pequena-03.png', 'images/pequena-04.png', 'images/pequena-05.png', 'images/pequena-06.png', 'images/pequena-07.png', 'images/pequena-08.png', 'images/pequena-09.png', 'images/pequena-10.png', 'images/shared-01.png', 'images/shared-07.png', 'images/shared-02.png', 'images/shared-08.png', 'images/shared-03.png'],
    reviewPlaceholder: 'Espacio para el comentario de un huésped real de Pequeña Eluney.',
    waText: 'Hola! Quiero consultar disponibilidad de Pequeña Eluney en Bariloche.',
  },
  gran: {
    name: 'Gran Eluney',
    eyebrow: 'PLANTA BAJA · HASTA 5 PAX',
    tagline: 'Ambientes amplios, con living, comedor y cocina integrados',
    accent: 'var(--gran)',
    accentSoft: 'var(--gran-soft)',
    description: 'Gran Eluney ocupa la planta baja de la casa y tiene ambientes amplios: dos dormitorios y un baño. La cocina, el comedor y el living están conectados, muy cómodos por el tamaño, y la casa está totalmente equipada con todo lo necesario para la estadía. También se puede solicitar el uso del quincho con parrilla. Cuenta con un patio amplio y un sector techado para estacionar, compartido con otro alojamiento.',
    stats: [{ value: '2', label: 'Dormitorios' }, { value: '1', label: 'Baño' }, { value: '5', label: 'Huéspedes' }],
    amenities: [
      { icon: 'wifi', text: 'WiFi' },
      { icon: 'heat', text: 'Calefacción central' },
      { icon: 'kitchen', text: 'Cocina, comedor y living integrados' },
      { icon: 'kitchen', text: 'Cocina totalmente equipada' },
      { icon: 'bed', text: 'Sábanas incluidas' },
      { icon: 'outdoor', text: 'Quincho con parrilla (a solicitar)' },
      { icon: 'outdoor', text: 'Patio amplio' },
      { icon: 'parking', text: 'Estacionamiento techado (compartido)' },
    ],
    heroImage: 'images/gran-hero.png',
    photos: ['images/gran-cover.png', 'images/gran-hero.png', 'images/gran-01.png', 'images/gran-02.png', 'images/gran-03.png', 'images/gran-04.png', 'images/gran-05.png', 'images/gran-06.png', 'images/gran-07.png', 'images/gran-08.png', 'images/shared-01.png', 'images/shared-07.png', 'images/shared-02.png', 'images/shared-08.png', 'images/shared-03.png'],
    reviewPlaceholder: 'Espacio para el comentario de un huésped real de Gran Eluney.',
    waText: 'Hola! Quiero consultar disponibilidad de Gran Eluney en Bariloche.',
  },
};

const homeWaHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Quiero consultar por las casas en Bariloche.')}`;

const viewHome = document.getElementById('view-home');
const viewHouse = document.getElementById('view-house');
let galleryIndex = 0;

function renderHouse(house) {
  viewHouse.querySelectorAll('[data-field="eyebrow"]').forEach(el => el.textContent = house.eyebrow);
  viewHouse.querySelectorAll('[data-field="name"]').forEach(el => el.textContent = house.name);
  viewHouse.querySelector('.house-hero-text > p').textContent = house.tagline;
  viewHouse.querySelector('[data-field="description"]').textContent = house.description;
  viewHouse.querySelector('[data-field="reviewPlaceholder"]').textContent = house.reviewPlaceholder;

  const heroImg = viewHouse.querySelector('[data-field="heroImage"]');
  heroImg.src = house.heroImage;
  heroImg.alt = `Foto principal de ${house.name}`;

  viewHouse.querySelector('[data-field="stats"]').innerHTML = house.stats
    .map(s => `<div><div>${s.value}</div><div>${s.label}</div></div>`).join('');

  viewHouse.querySelectorAll('.eyebrow[data-field="eyebrow"]').forEach(el => el.style.color = house.accent);
  viewHouse.querySelectorAll('.house-hero-cta, .house-cta').forEach(el => el.style.background = house.accent);
  viewHouse.querySelectorAll('.rule-dot').forEach(el => el.style.background = house.accent);

  const amenitiesEl = viewHouse.querySelector('[data-field="amenities"]');
  amenitiesEl.innerHTML = house.amenities.map(a => `
    <div class="amenity">
      <div class="amenity-icon" style="background:${house.accentSoft};color:${house.accent}">${ICONS[a.icon] || ''}</div>
      <div class="amenity-text">${a.text}</div>
    </div>
  `).join('');

  galleryIndex = 0;
  renderGallery(house);
}

function renderGallery(house) {
  const viewport = viewHouse.querySelector('[data-field="gallery"]');
  viewport.querySelectorAll('img').forEach(img => img.remove());
  house.photos.forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Foto ${i + 1} de ${house.name}`;
    if (i === galleryIndex) img.classList.add('active');
    viewport.insertBefore(img, viewport.firstChild);
  });

  const dotsEl = viewHouse.querySelector('[data-field="galleryDots"]');
  dotsEl.innerHTML = house.photos.map((_, i) =>
    `<button data-index="${i}" class="${i === galleryIndex ? 'active' : ''}" style="--dot-active:${house.accent}"></button>`
  ).join('');
  dotsEl.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      galleryIndex = Number(btn.dataset.index);
      renderGallery(house);
    });
  });
}

function currentHouseId() {
  const h = (window.location.hash || '').replace('#', '');
  return HOUSES[h] ? h : null;
}

function updateWaLinks(houseId) {
  const house = houseId ? HOUSES[houseId] : null;
  const href = house
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(house.waText)}`
    : homeWaHref;
  document.querySelectorAll('.wa-link').forEach(a => a.href = href);
}

function render() {
  const houseId = currentHouseId();

  document.querySelectorAll('.nav-house').forEach(a => a.classList.toggle('active', a.dataset.house === houseId));

  if (houseId) {
    viewHome.hidden = true;
    viewHouse.hidden = false;
    renderHouse(HOUSES[houseId]);
  } else {
    viewHome.hidden = false;
    viewHouse.hidden = true;
  }

  updateWaLinks(houseId);
  window.scrollTo(0, 0);
}

viewHouse.querySelector('.gallery-arrow.prev').addEventListener('click', () => {
  const house = HOUSES[currentHouseId()];
  if (!house) return;
  galleryIndex = (galleryIndex - 1 + house.photos.length) % house.photos.length;
  renderGallery(house);
});
viewHouse.querySelector('.gallery-arrow.next').addEventListener('click', () => {
  const house = HOUSES[currentHouseId()];
  if (!house) return;
  galleryIndex = (galleryIndex + 1) % house.photos.length;
  renderGallery(house);
});

document.querySelectorAll('[data-nav="home"]').forEach(a => a.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.hash = '';
  render();
}));

window.addEventListener('hashchange', render);
render();
