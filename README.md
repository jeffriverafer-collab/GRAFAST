# Grafast — Sitio Web

Sitio estático para Grafast S.A.C. — Asfaltos y Servicios Generales. Se genera con [Eleventy (11ty)](https://www.11ty.dev/): el header, el footer y los datos (contacto, productos, servicios, proyectos) viven en un solo lugar y se insertan en las 3 páginas al compilar. El resultado sigue siendo HTML, CSS y JavaScript puro, sin backend.

## Estructura del proyecto

```
GRAFAST/
├── src/                          ← lo que se edita
│   ├── _data/
│   │   ├── contacto.json         WhatsApp, teléfono, correo, dirección, redes (fuente única)
│   │   ├── catalogo.json         Productos por categoría, con opciones de color/presentación
│   │   ├── servicios.json        Servicios por especialidad
│   │   └── proyectos.json        Proyectos realizados (filtro y álbum de fotos)
│   ├── _includes/
│   │   ├── base.njk              Layout común: <head>, header, footer, scripts
│   │   ├── header.njk            Menú de navegación (una sola vez para las 3 páginas)
│   │   ├── footer.njk            Pie de página
│   │   ├── album.njk             Visor de fotos de proyectos (solo inicio)
│   │   └── redes-flotantes.njk   Botones flotantes de redes (solo inicio)
│   ├── index.njk                 → index.html
│   ├── productos.njk             → productos.html
│   └── servicios.njk             → servicios.html
├── css/style.css                 Estilos
├── js/
│   ├── main.js                   Punto de entrada: inicia cada módulo
│   └── modules/                  Un archivo por funcionalidad (nav, productos, contacto, …)
├── img/                          logo/, productos/, proyectos/
├── favicon.ico / apple-touch-icon.png
├── robots.txt / sitemap.xml
├── eleventy.config.js            Configuración de Eleventy
├── .github/workflows/deploy.yml  Compila y publica en GitHub Pages en cada push a main
└── FRAMEWORK-DESARROLLO.md       Diagnóstico y hoja de ruta técnica
```

`_site/` (sitio generado) y `node_modules/` (dependencias) no se suben a Git.

## Tareas frecuentes

| Quiero… | Edito |
|---|---|
| Cambiar el número de WhatsApp, teléfono o correo | `src/_data/contacto.json` |
| Agregar o modificar un producto | `src/_data/catalogo.json` |
| Agregar o modificar un servicio | `src/_data/servicios.json` |
| Agregar un proyecto realizado | `src/_data/proyectos.json` |
| Cambiar el menú | `src/_includes/header.njk` |
| Cambiar textos de una página | `src/index.njk`, `src/productos.njk` o `src/servicios.njk` |

## Ver el sitio en tu computadora

Requisito: [Node.js](https://nodejs.org) versión LTS.

```bash
npm install
```

```bash
npm start
```

Luego visita `http://localhost:8080`. La página se recarga sola al guardar cambios. Para generar el sitio final en `_site/` sin servidor: `npm run build`.

> Ya no se puede abrir con doble clic: los archivos de `src/` son plantillas y el JavaScript usa módulos, que el navegador bloquea bajo `file://`.

## Publicar el sitio con GitHub Pages (gratis)

La publicación la hace el workflow `.github/workflows/deploy.yml`, que compila con Eleventy y publica `_site/`.

Configuración (una sola vez):

1. Entra a `https://github.com/jeffriverafer-collab/GRAFAST` → **Settings** → **Pages**.
2. En **Build and deployment** → "Source", selecciona **GitHub Actions**.

Desde entonces, cada `git push` a `main` actualiza el sitio en `https://jeffriverafer-collab.github.io/GRAFAST/`. El progreso se ve en la pestaña **Actions** del repositorio: ✅ verde = publicado, ❌ rojo = falló (el detalle indica por qué).

### Dominio propio (opcional)

Si más adelante compras un dominio (por ejemplo `grafast.pe`), en **Settings → Pages** puedes agregarlo en "Custom domain" y configurar los registros DNS con tu proveedor. Recuerda actualizar también las URLs de `robots.txt` y `sitemap.xml`.

## Notas

- Los formularios de contacto y boletín no envían datos a un servidor: el de contacto abre WhatsApp con el mensaje redactado; el boletín es solo de interfaz.
- El número de WhatsApp se define únicamente en `src/_data/contacto.json`; las plantillas lo usan con el filtro `whatsapp` y el JavaScript lo lee del atributo `data-whatsapp` de `<body>`.
