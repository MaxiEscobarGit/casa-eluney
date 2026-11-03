// Casa Eluney — generación de HTML (sin DOM). Lo usa scripts/build.mjs para escribir las páginas estáticas.
// Necesita las constantes de js/data.js cargadas en el mismo contexto.

const SITE = 'https://casaeluney.ar';
const abs = (path) => SITE + path;
const altFor = (src, fallback) => ALT[src.split('/').pop().replace(/\.\w+$/, '')] || fallback;
const houseWa = (house) => waHref(`Hola! Quiero consultar disponibilidad de ${house.name} en Bariloche.`);

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

// Miniatura (600px) generada en images/sm/ para grillas y carruseles; la original queda para el visor.
const thumb = (src) => src.replace('images/', 'images/sm/').replace(/\.jpe?g$/, '.webp');

const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Carrusel de reseñas (una sola copia; main.js la duplica en el navegador para el bucle).
function reviewsHTML(accent) {
  if (!REVIEWS.length) return '';
  const card = (r) => `
        <figure class="review-card glass">
          <div style="display:flex;gap:10px;align-items:center">
            <div class="review-score" style="background:${accent}" aria-label="Puntuación ${esc(r.score)} de 10">${esc(r.score)}</div>
            ${r.title ? `<strong class="review-title">${esc(r.title)}</strong>` : ''}
          </div>
          <blockquote>${esc(r.text)}</blockquote>
          <figcaption>${r.name ? `<strong>${esc(r.name)}</strong>${r.country ? ` · ${esc(r.country)}` : ''}` : 'Huésped en Booking.com'}</figcaption>
        </figure>`;
  return `
    <section class="reviews" style="padding:clamp(56px,8vw,88px) 0 0">
      <div style="max-width:1120px;margin:0 auto 22px;padding:0 24px;display:flex;justify-content:space-between;align-items:end;gap:12px;flex-wrap:wrap">
        <h2 style="font-family:'Sora',sans-serif;font-size:clamp(24px,3.2vw,32px);font-weight:700;letter-spacing:-0.03em;margin:0">Lo que dicen nuestros huéspedes</h2>
        <a href="${BOOKING_URL}" target="_blank" rel="noopener" style="font-size:13.5px;font-weight:600;color:${accent}">Ver todas en Booking.com →</a>
      </div>
      <div class="reviews-wrap">
        <div class="reviews-track">${REVIEWS.map(card).join('')}</div>
      </div>
    </section>`;
}

function houseHTML(house) {
  const amenities = (PET_FRIENDLY ? [...house.baseAmenities, 'Apto para mascotas'] : house.baseAmenities)
    .map((a) => `
      <div class="list-row">
        <div class="list-icon" style="background:${house.accentSoft};color:${house.accent}">${ICONS[iconFor(a)]}</div>
        <div class="list-label">${a}</div>
      </div>`).join('');

  const stats = house.stats.map((s) => `
      <div class="stat glass">
        <div style="font-family:'Sora',sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.02em">${s.value}</div>
        <div style="font-size:12.5px;color:oklch(50% 0.01 75);margin-top:2px">${s.label}</div>
      </div>`).join('');

  const gallery = house.photos.map((src, n) => `
      <button type="button" class="gallery-item reveal-photo h-photo press" data-photo="${n}" aria-label="Ampliar foto ${n + 1} de ${house.name}" style="--tilt:${TILTS[n % TILTS.length]}deg;break-inside:avoid;margin-bottom:10px;border-radius:14px;overflow:hidden;box-shadow:0 10px 24px oklch(30% 0.02 75 / 0.14);aspect-ratio:${RATIOS[n % RATIOS.length]};transition:transform .35s ease">
        <img class="fill" loading="lazy" decoding="async" src="${thumb(src)}" alt="${altFor(src, `Foto ${n + 1} de ${house.name}`)}">
      </button>`).join('');

  const rules = HOUSE_RULES.map((rule) => `
        <div class="list-row">
          <span class="list-dot" style="background:${house.accent}"></span><span class="list-label" style="color:oklch(40% 0.01 75)">${rule}</span>
        </div>`).join('');

  return `
    <div class="nav-below-header-lg" style="max-width:1120px;margin:0 auto;padding:96px 24px 0">
      <a href="/" style="font-size:13.5px;font-weight:500;color:oklch(48% 0.01 75)">← Volver al inicio</a>
    </div>

    <section class="grid-split" style="max-width:1120px;margin:0 auto;padding:28px 24px clamp(56px,8vw,88px)">
      <div style="animation:fadeUp .6s ease both">
        <div style="font-size:12.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${house.accent}">${house.eyebrow}</div>
        <h1 style="font-family:'Sora',sans-serif;font-size:clamp(32px,5.2vw,54px);line-height:1.05;font-weight:700;letter-spacing:-0.035em;margin:12px 0 12px">${house.name}</h1>
        <p style="font-size:clamp(16px,2.2vw,18.5px);line-height:1.6;color:oklch(45% 0.01 75);margin:0 0 22px;max-width:480px">${house.tagline}</p>
        <div class="stats">${stats}</div>
        <a href="${houseWa(house)}" class="wa-link h-lift btn-cta" target="_blank" rel="noopener" style="font-size:15px;font-weight:600;background:${house.accent};color:oklch(99% 0.005 75);padding:15px 28px;border-radius:100px;transition:transform .2s ease">Consultar disponibilidad</a>
      </div>
      <div>
        <div style="border-radius:24px;overflow:hidden;aspect-ratio:4/3;box-shadow:0 22px 55px oklch(30% 0.02 75 / 0.16)"><img class="fill" fetchpriority="high" src="${house.heroImage}" srcset="${thumb(house.heroImage)} 600w, ${house.heroImage} 1600w" sizes="(min-width:769px) 540px, 92vw" alt="${altFor(house.heroImage, `Foto principal de ${house.name}`)}"></div>
      </div>
    </section>

    <section style="max-width:820px;margin:0 auto;padding:0 24px clamp(56px,8vw,88px)">
      <h2 style="font-family:'Sora',sans-serif;font-size:clamp(24px,3.2vw,32px);font-weight:700;letter-spacing:-0.03em;margin:0 0 16px">Sobre esta casa</h2>
      <p style="font-size:clamp(16px,2vw,17px);line-height:1.7;color:oklch(42% 0.01 75);margin:0">${house.description}</p>
    </section>

    <section style="padding:clamp(56px,8vw,88px) 24px;background:oklch(95% 0.014 70 / 0.7)">
      <div style="max-width:1000px;margin:0 auto">
        <h2 style="font-family:'Sora',sans-serif;font-size:clamp(24px,3.2vw,32px);font-weight:700;letter-spacing:-0.03em;margin:0 0 10px">Comodidades</h2>
        <p style="font-size:16px;color:oklch(48% 0.01 75);margin:0 0 22px">Todo lo que necesitás para sentirte como en casa.</p>
        <div class="list-group cols-2 glass">${amenities}</div>
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
          <div class="map-frame">
            <iframe title="Mapa de la ubicación de ${house.name} en Bariloche" loading="lazy" style="width:100%;height:100%;border:0;display:block" src="${MAP_SRC}"></iframe>
          </div>
        </div>
      </div>
    </section>

    ${reviewsHTML(house.accent)}

    <section style="max-width:1000px;margin:0 auto;padding:clamp(56px,8vw,88px) 24px 0">
      <h2 style="font-family:'Sora',sans-serif;font-size:clamp(24px,3.2vw,32px);font-weight:700;letter-spacing:-0.03em;margin:0 0 20px">Reglas de la casa</h2>
      <div class="list-group glass">${rules}</div>
    </section>

    ${otherHouseHTML(house)}

    <section style="padding:clamp(64px,9vw,110px) 24px">
      <div style="max-width:860px;margin:0 auto;text-align:center;padding:clamp(32px,6vw,72px) clamp(20px,5vw,32px);background:oklch(100% 0 0 / 0.6);backdrop-filter:blur(22px) saturate(170%);-webkit-backdrop-filter:blur(22px) saturate(170%);border:1px solid oklch(100% 0 0 / 0.75);border-radius:32px;box-shadow:0 24px 60px oklch(30% 0.02 75 / 0.14)">
        <h2 style="font-family:'Sora',sans-serif;font-size:clamp(25px,3.4vw,36px);font-weight:700;letter-spacing:-0.03em;margin:0 0 14px">¿Reservamos tu estadía en ${house.name}?</h2>
        <p style="font-size:16.5px;line-height:1.6;color:oklch(45% 0.01 75);margin:0 0 24px">Contanos las fechas y cuántos son — te respondemos por WhatsApp.</p>
        <a href="${houseWa(house)}" class="wa-link h-lift btn-cta" target="_blank" rel="noopener" style="font-size:15px;font-weight:600;background:${house.accent};color:oklch(99% 0.005 75);padding:15px 30px;border-radius:100px;transition:transform .2s ease">Escribir por WhatsApp</a>
      </div>
    </section>`;
}

function marqueeHTML(list) {
  return list.map((src) => `<div class="marquee-tile"><img class="fill" loading="lazy" decoding="async" src="${thumb(src)}" alt="${altFor(src, '')}"></div>`).join('');
}

function otherHouseHTML(house) {
  const other = Object.values(HOUSES).find((h) => h.id !== house.id);
  return `
    <section style="max-width:1000px;margin:0 auto;padding:clamp(56px,8vw,88px) 24px 0">
      <h2 style="font-family:'Sora',sans-serif;font-size:clamp(22px,3vw,28px);font-weight:700;letter-spacing:-0.03em;margin:0 0 16px">Conocé también ${other.name}</h2>
      <a href="${other.path}" class="glass press" style="display:flex;gap:14px;align-items:center;border-radius:22px;padding:10px;color:inherit">
        <img src="${thumb(other.heroImage)}" alt="${altFor(other.heroImage, other.name)}" loading="lazy" decoding="async" style="width:96px;height:96px;object-fit:cover;border-radius:14px;flex:none">
        <span style="display:block">
          <span style="display:block;font-family:'Sora',sans-serif;font-weight:700;font-size:17px;color:${other.accent}">${other.name}</span>
          <span style="display:block;font-size:14px;line-height:1.45;color:oklch(45% 0.01 75);margin-top:2px">${other.tagline}</span>
        </span>
      </a>
    </section>`;
}

// ── SEO: <head> por página ──
const HOME_SEO = {
  path: '/',
  title: 'Casa Eluney · Alquiler temporario en Bariloche',
  description: 'Pequeña Eluney y Gran Eluney: dos casas equipadas para 3 y hasta 5 personas en Barrio La Cumbre, a menos de 5 minutos del Centro Cívico de Bariloche.',
  ogImage: '/images/hero-desktop.jpeg',
};

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Tronador 2084',
  addressLocality: 'San Carlos de Bariloche',
  addressRegion: 'Río Negro',
  postalCode: '8400',
  addressCountry: 'AR',
};

function lodgingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': abs('/#lodging'),
    name: 'Casa Eluney',
    description: 'Dos casas de alquiler temporario en Barrio La Cumbre, Bariloche: Pequeña Eluney (hasta 3 personas) y Gran Eluney (hasta 5 personas), totalmente equipadas y a 5 minutos del Centro Cívico.',
    url: abs('/'),
    image: [abs('/images/hero-desktop.jpeg'), abs(HOUSES.pequena.ogImage), abs(HOUSES.gran.ogImage)],
    telephone: '+' + WHATSAPP_NUMBER,
    address: ADDRESS,
    checkinTime: '15:00',
    checkoutTime: '10:00',
    petsAllowed: PET_FRIENDLY,
    smokingAllowed: false,
    sameAs: [IG_URL.split('?')[0], BOOKING_URL.split('#')[0]],
    containsPlace: Object.values(HOUSES).map((h) => ({ '@id': abs(h.path + '#house') })),
  };
}

function houseSchema(house) {
  return [{
    '@context': 'https://schema.org',
    '@type': 'House',
    '@id': abs(house.path + '#house'),
    name: house.name,
    description: house.description,
    url: abs(house.path),
    image: [abs(house.ogImage), ...house.photos.slice(0, 6).map(abs)],
    numberOfRooms: house.bedrooms,
    numberOfBedrooms: house.bedrooms,
    numberOfBathroomsTotal: house.bathrooms,
    occupancy: { '@type': 'QuantitativeValue', maxValue: house.maxGuests, unitText: 'personas' },
    amenityFeature: house.baseAmenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })),
    petsAllowed: PET_FRIENDLY,
    address: ADDRESS,
    containedInPlace: { '@id': abs('/#lodging') },
  }, {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Casa Eluney', item: abs('/') },
      { '@type': 'ListItem', position: 2, name: house.name, item: abs(house.path) },
    ],
  }];
}

function headHTML(house) {
  const seo = house
    ? { path: house.path, title: house.seoTitle, description: house.seoDescription, ogImage: house.ogImage }
    : HOME_SEO;
  const schema = house ? [lodgingSchema(), ...houseSchema(house)] : [lodgingSchema()];
  const preload = house
    ? `<link rel="preload" as="image" href="${house.heroImage}" imagesrcset="${thumb(house.heroImage)} 600w, ${house.heroImage} 1600w" imagesizes="(min-width:769px) 540px, 92vw" fetchpriority="high">`
    : `<link rel="preload" as="image" href="/images/hero-desktop.webp" media="(min-width:769px)" fetchpriority="high">
<link rel="preload" as="image" href="/images/hero-mobile.webp" media="(max-width:768px)" fetchpriority="high">`;
  return `<title>${esc(seo.title)}</title>
<meta name="description" content="${esc(seo.description)}">
<link rel="canonical" href="${abs(seo.path)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${abs(seo.path)}">
<meta property="og:title" content="${esc(seo.title)}">
<meta property="og:description" content="${esc(seo.description)}">
<meta property="og:image" content="${abs(seo.ogImage)}">
<meta property="og:locale" content="es_AR">
<meta property="og:site_name" content="Casa Eluney">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(seo.title)}">
<meta name="twitter:description" content="${esc(seo.description)}">
<meta name="twitter:image" content="${abs(seo.ogImage)}">
${preload}
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}`;
}
