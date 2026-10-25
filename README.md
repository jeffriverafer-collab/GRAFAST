# Grafast — Sitio Web

Sitio estático para Grafast S.A.C. — Asfaltos y Servicios Generales. Hecho con HTML, CSS y JavaScript puro: sin framework, sin instalaciones y sin backend.

## Estructura del proyecto

```
GRAFAST/
├── index.html                    Página de inicio
├── productos.html                Catálogo de productos
├── servicios.html                Servicios
├── css/style.css                 Estilos
├── js/script.js                  JavaScript (menú, animaciones, álbum, formulario, opciones de producto…)
├── img/                          logo/, productos/, proyectos/
├── favicon.ico / apple-touch-icon.png
├── robots.txt / sitemap.xml
├── .github/workflows/deploy.yml  Publica el sitio en GitHub Pages en cada push a main
└── FRAMEWORK-DESARROLLO.md       Diagnóstico y hoja de ruta técnica
```

## Tareas frecuentes

El header y el footer están repetidos en las 3 páginas: si cambias el menú, un teléfono o una red social, cámbialo en `index.html`, `productos.html` y `servicios.html`.

| Quiero… | Edito |
|---|---|
| Cambiar el número de WhatsApp | Los enlaces `wa.me/51…` y el atributo `data-whatsapp` de `<body>` en las 3 páginas (búscalo con Ctrl+Shift+F en VS Code) |
| Agregar o modificar un producto | `productos.html` |
| Agregar o modificar un servicio | `servicios.html` |
| Agregar un proyecto realizado | `index.html`, sección de proyectos |
| Cambiar estilos | `css/style.css` |

## Ver el sitio en tu computadora

Abre `index.html` con doble clic en el navegador. No necesitas instalar nada.

## Publicar el sitio con GitHub Pages (gratis)

La publicación la hace el workflow `.github/workflows/deploy.yml`, que sube los archivos tal cual (no compila nada).

Configuración (una sola vez):

1. Entra a `https://github.com/jeffriverafer-collab/GRAFAST` → **Settings** → **Pages**.
2. En **Build and deployment** → "Source", selecciona **GitHub Actions**.

Desde entonces, cada `git push` a `main` actualiza el sitio en `https://jeffriverafer-collab.github.io/GRAFAST/`. El progreso se ve en la pestaña **Actions** del repositorio: ✅ verde = publicado, ❌ rojo = falló (el detalle indica por qué).

### Dominio propio (opcional)

Si más adelante compras un dominio (por ejemplo `grafast.pe`), en **Settings → Pages** puedes agregarlo en "Custom domain" y configurar los registros DNS con tu proveedor. Recuerda actualizar también las URLs de `robots.txt` y `sitemap.xml`.

## Notas

- Los formularios de contacto y boletín no envían datos a un servidor: el de contacto abre WhatsApp con el mensaje redactado; el boletín es solo de interfaz.
- El JavaScript del formulario y de las opciones de producto toma el número de WhatsApp del atributo `data-whatsapp` de `<body>`.
