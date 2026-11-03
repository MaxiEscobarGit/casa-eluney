// Genera las páginas estáticas a partir de index.html + js/data.js + scripts/render.js.
// Uso: node scripts/build.mjs   (correrlo después de cambiar textos, fotos o reseñas)
// Escribe: index.html (rellena los bloques <!--build:x-->), pequena-eluney/index.html,
// gran-eluney/index.html, sitemap.xml y llms.txt.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import vm from 'node:vm';

const root = new URL('..', import.meta.url).pathname;
const read = (f) => readFileSync(root + f, 'utf8');
const write = (f, s) => { writeFileSync(root + f, s); console.log('escrito', f); };

const ctx = vm.createContext({});
vm.runInContext(read('js/data.js'), ctx, { filename: 'js/data.js' });
vm.runInContext(read('scripts/render.js'), ctx, { filename: 'scripts/render.js' });
const run = (code) => vm.runInContext(code, ctx);
const HOUSES = run('HOUSES');
const SITE = run('SITE');

const fill = (html, name, content) => {
  const re = new RegExp(`<!--build:${name}-->[\\s\\S]*?<!--/build:${name}-->`);
  if (!re.test(html)) throw new Error(`falta el bloque build:${name}`);
  return html.replace(re, `<!--build:${name}-->\n${content}\n<!--/build:${name}-->`);
};
const setLinks = (html, wa) => html
  .replace(/href="[^"]*"(\s+class="[^"]*\bwa-link\b)/g, `href="${wa}"$1`)
  .replace(/href="[^"]*"(\s+class="[^"]*\big-link\b)/g, `href="${run('IG_URL')}"$1`);

// Home
let home = read('index.html');
home = fill(home, 'head', run('headHTML(null)'));
home = fill(home, 'reviews', run("reviewsHTML('oklch(48% 0.10 210)')"));
home = fill(home, 'marquee-a', run('marqueeHTML(MARQUEE_A)'));
home = fill(home, 'marquee-b', run('marqueeHTML(MARQUEE_B)'));
home = home.replace(/<body data-house="[^"]*">/, '<body data-house="">');
home = setLinks(home, run('HOME_WA'));
write('index.html', home);

// Casas
for (const house of Object.values(HOUSES)) {
  let page = fill(home, 'head', run(`headHTML(HOUSES.${house.id})`));
  page = fill(page, 'main', `  <main id="view-house">${run(`houseHTML(HOUSES.${house.id})`)}\n  </main>`);
  page = page.replace(/<body data-house="[^"]*">/, `<body data-house="${house.id}">`);
  page = page.replace(new RegExp(`(<a href="${house.path}" class="[^"]*nav-house)`, 'g'), '$1 active');
  page = setLinks(page, run(`houseWa(HOUSES.${house.id})`));
  mkdirSync(root + house.path.slice(1), { recursive: true });
  write(house.path.slice(1) + 'index.html', page);
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const urls = ['/', ...Object.values(HOUSES).map((h) => h.path)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${SITE}${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}
</urlset>
`);

// llms.txt (resumen para asistentes de IA, formato llmstxt.org)
const plain = (s) => s.replace(/<[^>]+>/g, '');
write('llms.txt', `# Casa Eluney

> Alquiler temporario en Bariloche, Argentina: dos casas totalmente equipadas (Pequeña Eluney, 2-3 personas, y Gran Eluney, hasta 5 personas) en Tronador 2084, Barrio La Cumbre, a menos de 5 minutos del Centro Cívico de San Carlos de Bariloche.

Las reservas y consultas se hacen por WhatsApp (+${run('WHATSAPP_NUMBER')}). También está publicada en Booking.com. Check-in desde las 15:00, check-out hasta las 10:00. ${run('PET_FRIENDLY') ? 'Se aceptan mascotas, previa consulta.' : 'No se aceptan mascotas.'} No se permite fumar en el interior.

## Casas

${Object.values(HOUSES).map((h) => `- [${h.name}](${SITE}${h.path}): ${plain(h.seoDescription)} Comodidades: ${h.baseAmenities.join(', ')}.`).join('\n')}

## Información

- [Inicio](${SITE}/): presentación del complejo, servicios incluidos y fotos.
- [Reseñas de huéspedes](${SITE}/#resenas): opiniones de Booking.com (puntuaciones de 8 a 10).
- [Ubicación](${SITE}/#ubicacion): Tronador 2084, Barrio La Cumbre, San Carlos de Bariloche, Río Negro.
- [Actividades cercanas](${SITE}/#actividades): Cerro Catedral, Lago Nahuel Huapi, Cerro Otto y Circuito Chico.

## Contacto

- [WhatsApp](https://wa.me/${run('WHATSAPP_NUMBER')})
- [Instagram](${run('IG_URL').split('?')[0]})
- [Booking.com](${run('BOOKING_URL').split('#')[0]})
`);
