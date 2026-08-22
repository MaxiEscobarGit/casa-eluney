// Casa Eluney — lógica de render y ruteo por hash

function iconFor(a) {
  const s = a.toLowerCase();
  if (s.includes('wifi')) return 'wifi';
  if (s.includes('calefac')) return 'heat';
  if (s.includes('cocina') || s.includes('microondas')) return 'kitchen';
  if (s.includes('estacion')) return 'parking';
  if (s === 'tv' || s.includes(' tv')) return 'tv';
  if (s.includes('sábana') || s.includes('sabana') || s.includes('cama')) return 'bed';
  if (s.includes('baño')) return 'bath';
  if (s.includes('patio') || s.includes('quincho') || s.includes('parrilla')) return 'outdoor';
  if (s.includes('mascota')) return 'pet';
  return 'check';
}

// La cinta de fotos se duplica para que el bucle de la animación no corte.
function renderMarquee(el, list) {
  el.innerHTML = [...list, ...list]
    .map((src) => `<div style="width:230px;aspect-ratio:1;flex:none;border-radius:20px;overflow:hidden"><img class="fill" loading="lazy" src="${src}" alt=""></div>`)
    .join('');
}

function houseHTML(house) {
  const amenities = (PET_FRIENDLY ? [...house.baseAmenities, 'Apto para mascotas'] : house.baseAmenities)
    .map((a) => `
      <div class="h-tile" style="background:oklch(100% 0 0 / 0.62);backdrop-filter:blur(18px) saturate(160%);-webkit-backdrop-filter:blur(18px) saturate(160%);border:1px solid oklch(100% 0 0 / 0.75);border-radius:22px;padding:24px 22px;display:flex;flex-direction:column;gap:14px;box-shadow:0 12px 34px oklch(30% 0.02 75 / 0.08);transition:transform .3s ease,box-shadow .3s ease">
        <div style="width:42px;height:42px;border-radius:13px;background:${house.accentSoft};display:flex;align-items:center;justify-content:center;color:${house.accent};flex:none">${ICONS[iconFor(a)]}</div>
        <div style="font-size:15px;font-weight:500;color:oklch(32% 0.01 75);line-height:1.45">${a}</div>
      </div>`).join('');

  const stats = house.stats.map((s) => `
      <div style="padding:14px 20px;background:oklch(100% 0 0 / 0.6);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid oklch(100% 0 0 / 0.75);border-radius:18px;box-shadow:0 10px 26px oklch(30% 0.02 75 / 0.08)">
        <div style="font-family:'Sora',sans-serif;font-size:24px;font-weight:700;letter-spacing:-0.02em">${s.value}</div>
        <div style="font-size:12.5px;color:oklch(50% 0.01 75);margin-top:2px">${s.label}</div>
      </div>`).join('');

  const gallery = house.photos.map((src, n) => `
      <div class="reveal-photo h-photo" style="--tilt:${TILTS[n % TILTS.length]}deg;break-inside:avoid;margin-bottom:10px;border-radius:14px;overflow:hidden;box-shadow:0 10px 24px oklch(30% 0.02 75 / 0.14);aspect-ratio:${RATIOS[n % RATIOS.length]};transition:transform .35s ease">
        <img class="fill" loading="lazy" src="${src}" alt="Foto ${n + 1} de ${house.name}">
      </div>`).join('');

  const rules = HOUSE_RULES.map((rule) => `
        <div style="font-size:15.5px;color:oklch(40% 0.01 75);display:flex;gap:12px;align-items:baseline;padding:16px 20px;background:oklch(100% 0 0 / 0.5);border:1px solid oklch(100% 0 0 / 0.65);border-radius:16px">
          <span style="width:6px;height:6px;border-radius:50%;background:${house.accent};display:inline-block;flex:none"></span>${rule}
        </div>`).join('');

  const review = (text) => `
        <div style="background:oklch(100% 0 0 / 0.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid oklch(100% 0 0 / 0.7);border-radius:22px;padding:24px;box-shadow:0 12px 32px oklch(30% 0.02 75 / 0.08)">
          <div style="font-size:13px;color:oklch(55% 0.01 75);letter-spacing:.12em;margin-bottom:10px">☆ ☆ ☆ ☆ ☆</div>
          <p style="font-size:15px;line-height:1.6;color:oklch(45% 0.01 75);margin:0 0 12px">${text}</p>
          <div style="font-size:13px;font-weight:600;color:oklch(45% 0.01 75)">Nombre del huésped</div>
        </div>`;

  return `
    <div class="nav-below-header-lg" style="max-width:1120px;margin:0 auto;padding:96px 24px 0">
      <a href="#" data-nav="home" style="font-size:13.5px;font-weight:500;color:oklch(48% 0.01 75)">← Volver al inicio</a>
    </div>

    <section class="grid-split" style="max-width:1120px;margin:0 auto;padding:28px 24px clamp(56px,8vw,88px)">
      <div style="animation:fadeUp .6s ease both">
        <div style="font-size:12.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${house.accent}">${house.eyebrow}</div>
        <h1 style="font-family:'Sora',sans-serif;font-size:clamp(34px,5.2vw,54px);line-height:1.05;font-weight:700;letter-spacing:-0.035em;margin:16px 0 18px">${house.name}</h1>
        <p style="font-size:clamp(16px,2.2vw,18.5px);line-height:1.6;color:oklch(45% 0.01 75);margin:0 0 28px;max-width:480px">${house.tagline}</p>
        <div style="display:flex;gap:10px;margin-bottom:32px;flex-wrap:wrap">${stats}</div>
        <a href="#" class="wa-link h-lift" target="_blank" rel="noopener" style="display:inline-block;font-size:15px;font-weight:600;background:${house.accent};color:oklch(99% 0.005 75);padding:15px 28px;border-radius:100px;transition:transform .2s ease">Consultar disponibilidad</a>
      </div>
      <div>
        <div style="border-radius:24px;overflow:hidden;aspect-ratio:4/3;box-shadow:0 22px 55px oklch(30% 0.02 75 / 0.16)"><img class="fill" src="${house.heroImage}" alt="Foto principal de ${house.name}"></div>
      </div>
    </section>

    <section style="max-width:820px;margin:0 auto;padding:0 24px clamp(56px,8vw,88px)">
      <h2 style="font-family:'Sora',sans-serif;font-size:clamp(24px,3.2vw,32px);font-weight:700;letter-spacing:-0.03em;margin:0 0 16px">Sobre esta casa</h2>
      <p style="font-size:17px;line-height:1.75;color:oklch(42% 0.01 75);margin:0">${house.description}</p>
    </section>

    <section style="padding:clamp(56px,8vw,88px) 24px;background:oklch(95% 0.014 70 / 0.7)">
      <div style="max-width:1000px;margin:0 auto">
        <h2 style="font-family:'Sora',sans-serif;font-size:clamp(24px,3.2vw,32px);font-weight:700;letter-spacing:-0.03em;margin:0 0 10px">Comodidades</h2>
        <p style="font-size:16px;color:oklch(48% 0.01 75);margin:0 0 34px">Todo lo que necesitás para sentirte como en casa.</p>
        <div class="grid-tiles">${amenities}</div>
      </div>
    </section>

    <section style="max-width:1120px;margin:0 auto;padding:clamp(56px,8vw,88px) 24px 0">
      <h2 style="font-family:'Sora',sans-serif;font-size:clamp(24px,3.2vw,32px);font-weight:700;letter-spacing:-0.03em;margin:0 0 24px;text-align:center">Galería</h2>
      <div class="photo-masonry" style="column-count:2;column-gap:10px;max-width:840px;margin:0 auto">${gallery}</div>
    </section>

    <section style="padding:clamp(56px,8vw,88px) 24px;margin-top:clamp(56px,8vw,88px);background:oklch(95% 0.014 70 / 0.7)">
      <div class="grid-split" style="max-width:1120px;margin:0 auto">
        <div>
          <h2 style="font-family:'Sora',sans-serif;font-size:clamp(24px,3.2vw,32px);font-weight:700;letter-spacing:-0.03em;margin:0 0 16px">Cómo llegar</h2>
          <p style="font-size:16.5px;line-height:1.7;color:oklch(45% 0.01 75);margin:0">${house.name} está en Tronador 2084, Barrio La Cumbre — a menos de 5 minutos del Centro Cívico de Bariloche y con salida directa hacia los accesos de ruta que llevan a las excursiones.</p>
        </div>
        <div>
          <div style="border-radius:18px;overflow:hidden;height:300px;box-shadow:0 18px 46px oklch(30% 0.02 75 / 0.12)">
            <iframe title="Mapa Bariloche" loading="lazy" style="width:100%;height:100%;border:0;display:block" src="${MAP_SRC}"></iframe>
          </div>
        </div>
      </div>
    </section>

    <section style="max-width:1000px;margin:0 auto;padding:clamp(56px,8vw,88px) 24px 0">
      <h2 style="font-family:'Sora',sans-serif;font-size:clamp(24px,3.2vw,32px);font-weight:700;letter-spacing:-0.03em;margin:0 0 24px">Reseñas de huéspedes</h2>
      <div class="grid-cards">
        ${review(`Espacio para el comentario de un huésped real de ${house.name}.`)}
        ${review('Espacio para otro comentario de huésped.')}
      </div>
    </section>

    <section style="max-width:1000px;margin:0 auto;padding:clamp(56px,8vw,88px) 24px 0">
      <h2 style="font-family:'Sora',sans-serif;font-size:clamp(24px,3.2vw,32px);font-weight:700;letter-spacing:-0.03em;margin:0 0 24px">Reglas de la casa</h2>
      <div style="display:grid;gap:12px">${rules}</div>
    </section>

    <section style="padding:clamp(64px,9vw,110px) 24px">
      <div style="max-width:860px;margin:0 auto;text-align:center;padding:clamp(44px,6vw,72px) 32px;background:oklch(100% 0 0 / 0.6);backdrop-filter:blur(22px) saturate(170%);-webkit-backdrop-filter:blur(22px) saturate(170%);border:1px solid oklch(100% 0 0 / 0.75);border-radius:32px;box-shadow:0 24px 60px oklch(30% 0.02 75 / 0.14)">
        <h2 style="font-family:'Sora',sans-serif;font-size:clamp(25px,3.4vw,36px);font-weight:700;letter-spacing:-0.03em;margin:0 0 14px">¿Reservamos tu estadía en ${house.name}?</h2>
        <p style="font-size:16.5px;line-height:1.6;color:oklch(45% 0.01 75);margin:0 0 30px">Contanos las fechas y cuántos son — te respondemos por WhatsApp.</p>
        <a href="#" class="wa-link h-lift" target="_blank" rel="noopener" style="display:inline-block;font-size:15px;font-weight:600;background:${house.accent};color:oklch(99% 0.005 75);padding:15px 30px;border-radius:100px;transition:transform .2s ease">Escribir por WhatsApp</a>
      </div>
    </section>`;
}

function currentHouseId() {
  const h = (window.location.hash || '').replace('#', '');
  return HOUSES[h] ? h : null;
}

function render() {
  if (typeof navMobile !== 'undefined') navMobile.classList.remove('open');
  const houseId = currentHouseId();
  const house = houseId ? HOUSES[houseId] : null;

  document.querySelectorAll('.nav-house').forEach((a) => a.classList.toggle('active', a.dataset.house === houseId));

  if (house) {
    viewHouse.innerHTML = houseHTML(house);
    viewHome.hidden = true;
    viewHouse.hidden = false;
  } else {
    viewHouse.hidden = true;
    viewHouse.innerHTML = '';
    viewHome.hidden = false;
  }

  const href = house ? waHref(`Hola! Quiero consultar disponibilidad de ${house.name} en Bariloche.`) : HOME_WA;
  document.querySelectorAll('.wa-link').forEach((a) => { a.href = href; });
  document.querySelectorAll('.ig-link').forEach((a) => { a.href = IG_URL; });

  window.scrollTo(0, 0);
}

// Los enlaces "volver al inicio" viven tanto en el header como dentro de la vista de casa.
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-nav="home"]');
  if (!link) return;
  e.preventDefault();
  if (window.location.hash) window.location.hash = '';
  else render();
});

window.addEventListener('hashchange', render);

const viewHome = document.getElementById('view-home');
const viewHouse = document.getElementById('view-house');
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

document.addEventListener('click', (e) => {
  if (!navMobile.contains(e.target)) navMobile.classList.remove('open');
});

renderMarquee(document.getElementById('marquee-a'), MARQUEE_A);
renderMarquee(document.getElementById('marquee-b'), MARQUEE_B);
render();
document.getElementById('home-map').src = MAP_SRC;
