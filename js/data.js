// Casa Eluney — datos y contenido (separado de la lógica de render)

const WHATSAPP_NUMBER = '5492944581980';
const PET_FRIENDLY = false;

const IG_URL = 'https://www.instagram.com/alquiler.bariloche.eluney?igsh=MTYwdDgweTUzbW9sdg==';
const MAP_SRC = 'https://maps.google.com/maps?q=Tronador+2084,+Barrio+La+Cumbre,+San+Carlos+de+Bariloche&output=embed';

const ICONS = {
  wifi: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 8.5a16 16 0 0 1 20 0"></path><path d="M5.5 12.5a11 11 0 0 1 13 0"></path><path d="M9 16.5a6 6 0 0 1 6 0"></path><circle cx="12" cy="20" r="1.2" fill="currentColor" stroke="none"></circle></svg>',
  heat: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4v16M9 4v16M14 4v16M19 4v16"></path><path d="M4 9h15M4 15h15"></path></svg>',
  kitchen: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="10" width="14" height="8" rx="2"></rect><path d="M3 10a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4"></path><path d="M20 12h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1"></path></svg>',
  parking: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"></rect><path d="M9.5 16V8h3.2a2.4 2.4 0 0 1 0 4.8H9.5"></path></svg>',
  tv: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="12" rx="2"></rect><path d="M8 21h8M12 17v4"></path></svg>',
  bed: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"></path><path d="M3 18h18"></path><path d="M7 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"></path></svg>',
  bath: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3z"></path><path d="M4 12V6a2 2 0 0 1 2-2"></path></svg>',
  outdoor: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4"></path><path d="M6 9a6 6 0 0 1 12 0c0 3-2 4-2 6H8c0-2-2-3-2-6z"></path><path d="M9 21h6"></path><path d="M12 15v6"></path></svg>',
  pet: '<svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="7" cy="8" r="2"></circle><circle cx="12" cy="6" r="2"></circle><circle cx="17" cy="8" r="2"></circle><path d="M12 12c-3 0-6 2.5-6 5.5A2.5 2.5 0 0 0 8.5 20c1 0 1.5-.7 3.5-.7s2.5.7 3.5.7A2.5 2.5 0 0 0 18 17.5C18 14.5 15 12 12 12z"></path></svg>',
  check: '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>',
};

const SHARED = ['/images/shared-01.webp', '/images/shared-07.webp', '/images/shared-02.webp', '/images/shared-08.webp', '/images/shared-03.webp'];

const HOUSES = {
  pequena: {
    id: 'pequena',
    path: '/pequena-eluney/',
    name: 'Pequeña Eluney',
    seoTitle: 'Pequeña Eluney · Casa para 2-3 personas en Bariloche | Casa Eluney',
    seoDescription: 'Casa para 2 o 3 personas con dormitorio, baño completo y cocina equipada en Barrio La Cumbre, a 5 minutos del Centro Cívico de Bariloche. WiFi y TV.',
    ogImage: '/images/og-pequena.jpg',
    maxGuests: 3, bedrooms: 1, bathrooms: 1,
    eyebrow: 'CASA PRINCIPAL · 2-3 PAX',
    tagline: 'La casa principal del complejo, ideal para una estadía íntima',
    accent: 'oklch(48% 0.10 210)',
    accentSoft: 'oklch(94% 0.03 210)',
    description: 'La casa principal del complejo Eluney, pensada para dos o tres personas. Tiene un dormitorio con cama matrimonial y cama de una plaza (ambas con sommier y sábanas incluidas), un baño completo y una cocina-comedor totalmente equipada con microondas. Wifi y TV en un barrio tranquilo y familiar, a menos de 5 minutos del Centro Cívico y muy cerca de los accesos a las principales rutas de excursión.',
    stats: [{ value: '1', label: 'Dormitorio' }, { value: '1', label: 'Baño' }, { value: '2-3', label: 'Huéspedes' }],
    baseAmenities: ['WiFi', 'TV', 'Cocina equipada', 'Microondas', 'Sábanas incluidas', 'Baño privado'],
    heroImage: '/images/pequena-cover.webp',
    photos: [
      '/images/pequena-01.webp', '/images/pequena-02.webp', '/images/pequena-03.webp', '/images/pequena-04.webp', '/images/pequena-05.webp',
      '/images/pequena-06.webp', '/images/pequena-07.webp', '/images/pequena-08.webp', '/images/pequena-09.webp', '/images/pequena-10.webp',
      ...SHARED,
    ],
  },
  gran: {
    id: 'gran',
    path: '/gran-eluney/',
    name: 'Gran Eluney',
    seoTitle: 'Gran Eluney · Casa para hasta 5 personas en Bariloche | Casa Eluney',
    seoDescription: 'Casa para hasta 5 personas con 2 dormitorios, living, comedor y cocina integrados, patio y quincho con parrilla, a 5 minutos del Centro Cívico de Bariloche.',
    ogImage: '/images/og-gran.jpg',
    maxGuests: 5, bedrooms: 2, bathrooms: 1,
    eyebrow: 'PLANTA BAJA · HASTA 5 PAX',
    tagline: 'Ambientes amplios, con living, comedor y cocina integrados',
    accent: 'oklch(55% 0.13 45)',
    accentSoft: 'oklch(94% 0.03 45)',
    description: 'Gran Eluney ocupa la planta baja de la casa y tiene ambientes amplios: dos dormitorios y un baño. La cocina, el comedor y el living están conectados, muy cómodos por el tamaño, y la casa está totalmente equipada con todo lo necesario para la estadía. También se puede solicitar el uso del quincho con parrilla. Cuenta con un patio amplio y un sector techado para estacionar, compartido con otro alojamiento.',
    stats: [{ value: '2', label: 'Dormitorios' }, { value: '1', label: 'Baño' }, { value: '5', label: 'Huéspedes' }],
    baseAmenities: ['WiFi', 'Calefacción central', 'Cocina, comedor y living integrados', 'Cocina totalmente equipada', 'Sábanas incluidas', 'Quincho con parrilla (a solicitar)', 'Patio amplio', 'Estacionamiento techado (compartido)'],
    heroImage: '/images/gran-hero.webp',
    photos: [
      '/images/gran-cover.webp', '/images/gran-hero.webp', '/images/gran-01.webp', '/images/gran-02.webp', '/images/gran-03.webp',
      '/images/gran-04.webp', '/images/gran-05.webp', '/images/gran-06.webp', '/images/gran-07.webp', '/images/gran-09.webp',
      '/images/gran-10.webp', '/images/gran-11.webp',
      ...SHARED,
    ],
  },
};

// Reseñas reales de Booking.com, copiadas textuales. Se muestran en la home y en las dos casas.
// Formato: { title, score, text } y opcionalmente name / country. Sin reseñas, la sección no se muestra.
const BOOKING_URL = 'https://www.booking.com/hotel/ar/eluney-casa-en-bariloche.es.html#tab-reviews';
const REVIEWS = [
  { title: "EXCELENTE CASA", score: "10", text: "La casa es muy cómoda, sus camas, tiene de todo para cocinar, muy limpia, pero por sobre todo la atención de su anfitriona es espectacular... SUPER RECOMENDABLE" },
  { title: "Un lugar amplio, cómodo y limpio!", score: "10", text: "Muy cómodo y bien calefaccionado!, además de estar todo muy limpio, tiene buen espacio y es muy linda la casa. En la noche es muy tranquilo para descansar. Además Andrea es muy agradable y dispuesta a ayudar, esperamos volver a Bariloche y a este lugar!" },
  { title: "Excepcional", score: "10", text: "La verdad todo excelente cómodo y muy buena atención de Andrea la dueña y su madre unas genias" },
  { title: "Excelente estadía!", score: "10", text: "Súper cómoda, muy amplia todo lo que necesitas lo tienen a disposición, la dueña una maravilla de persona!!! Súper recomendable!!!" },
  { title: "Excepcional", score: "10", text: "Las instalaciones y la amabilidad del personal es realmente increíble. Siempre atentos y serviciales. Recomiendo totalmente." },
  { title: "Excepcional", score: "10", text: "Super cómodo, muy limpio! Andrea la dueña una genia total!!" },
  { title: "Hermosa y amplia Casa", score: "9,0", text: "La casa es muy amplia y con muchas comodidades. Estuvimos 5 días alojados ahí super comodos. Andrea es una genia total, y su familia tambien gente muy amable, con gran respecto y predisposicion. Super recomendable." },
  { title: "Excepcional", score: "10", text: "Todo en si muy lindo. Nos sentimos como en casa. La verdad que sin dudas lo volveriamos a alquilar." },
  { title: "Excepcional", score: "10", text: "Excelente ubicación, cómodo y agradable. La atención encantadora" },
  { title: "Muy bien", score: "8,0", text: "Muy buena ubicación, la casa súper amplia y cómoda, y las anfitrionas Andrea, Herna y obvio eluney super amables!" },
];

// Texto alternativo de cada foto (accesibilidad y búsqueda de imágenes).
const ALT = {
  'pequena-cover': 'Frente de Pequeña Eluney con jardín y estacionamiento',
  'pequena-01': 'Frente de Pequeña Eluney con jardín y estacionamiento',
  'pequena-02': 'Cocina de Pequeña Eluney con anafe y bacha',
  'pequena-03': 'Comedor de Pequeña Eluney con mesa, heladera y TV',
  'pequena-04': 'Dormitorio de Pequeña Eluney con cama matrimonial',
  'pequena-05': 'Cocina equipada de Pequeña Eluney con horno',
  'pequena-06': 'Baño de Pequeña Eluney',
  'pequena-07': 'Cama de una plaza en Pequeña Eluney',
  'pequena-08': 'Baño completo de Pequeña Eluney con ducha',
  'pequena-09': 'Mesa de comedor de Pequeña Eluney',
  'pequena-10': 'Baño completo de Pequeña Eluney con ducha',
  'gran-cover': 'Frente de Gran Eluney con patio de entrada',
  'gran-hero': 'Casa Eluney con jardín y rosas',
  'gran-01': 'Cocina de Gran Eluney con heladera y horno',
  'gran-02': 'Cocina amplia de Gran Eluney con desayunador',
  'gran-03': 'Comedor de Gran Eluney',
  'gran-04': 'Dormitorio de Gran Eluney con dos camas',
  'gran-05': 'Dormitorio de Gran Eluney con camas y placard',
  'gran-06': 'Baño de Gran Eluney con bañera',
  'gran-07': 'Living de Gran Eluney con sillones y TV',
  'gran-09': 'Dormitorio matrimonial de Gran Eluney',
  'gran-10': 'Dormitorio matrimonial de Gran Eluney con mesas de luz',
  'gran-11': 'Dormitorio matrimonial de Gran Eluney con placard',
  'shared-01': 'Lirios en el jardín de Casa Eluney',
  'shared-02': 'Cantero con flores en el patio de Casa Eluney',
  'shared-03': 'Plantas y árboles del jardín de Casa Eluney',
  'shared-04': 'Casa Eluney con jardín y rosas',
  'shared-05': 'Macetas con flores en el jardín de Casa Eluney',
  'shared-06': 'Cantero con flores junto a la casa',
  'shared-07': 'Patio con sillones en el jardín de Casa Eluney',
  'shared-08': 'Jardín con sillones exteriores en Casa Eluney',
  'shared-09': 'Frente de Pequeña Eluney con jardín y estacionamiento',
  'shared-10': 'Flores junto al cerco del jardín de Casa Eluney',
  'shared-11': 'Maceta con flores en el jardín de Casa Eluney',
  'snow': 'Eluney, la perra de la casa, en la nieve',
};

const HOUSE_RULES = [
  'Check-in desde las 15:00 · Check-out hasta las 10:00',
  'No se permite fumar en el interior',
  'Respetar el descanso del barrio a partir de las 22:00',
  'Capacidad máxima según la casa reservada',
  PET_FRIENDLY ? 'Se aceptan mascotas, previa consulta' : 'No se aceptan mascotas',
];

const RATIOS = ['3/4', '1/1', '4/5', '2/3', '1/1', '5/6', '3/4', '1/1', '4/5', '1/1', '2/3', '5/6'];
const TILTS = [-2, 1.5, -1, 2, -1.5, 1];

const MARQUEE_A = ['/images/shared-01.webp', '/images/shared-02.webp', '/images/shared-03.webp', '/images/shared-04.webp', '/images/shared-05.webp', '/images/shared-06.webp'];
const MARQUEE_B = ['/images/shared-07.webp', '/images/shared-08.webp', '/images/shared-09.webp', '/images/shared-10.webp', '/images/shared-11.webp', '/images/snow.jpeg'];

const waHref = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const HOME_WA = waHref('Hola! Quiero consultar por las casas en Bariloche.');
