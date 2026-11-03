# Casa Eluney

Sitio estático (sin framework) publicado en Vercel: https://casaeluney.ar

## Páginas generadas

`index.html`, `pequena-eluney/index.html`, `gran-eluney/index.html`, `sitemap.xml` y `llms.txt` se generan con:

```bash
node scripts/build.mjs
```

Correrlo después de cambiar `js/data.js` (textos, fotos, reseñas, SEO), `scripts/render.js` (HTML de las casas, `<head>`, schema) o la estructura de `index.html`. El contenido entre `<!--build:x-->` y `<!--/build:x-->` se reescribe: editar la fuente, no esas zonas. Las páginas de las casas se arman a partir de `index.html`: no editarlas a mano.

## Fotos

- Originales en `images/`, miniaturas de 600px en `images/sm/` (mismo nombre, WebP). Al agregar una foto, crear también su miniatura y su texto alternativo en `ALT` (`js/data.js`).
- Al cambiar CSS o JS, subir el `?v=` en `index.html` y volver a generar.
