# Grafast — Sitio Web

Sitio estático (HTML, CSS y JavaScript puro) para Grafast S.A.C. — Asfaltos y Servicios Generales.

## Estructura del proyecto

```
GRAFAST/
├── index.html            Página principal
├── productos.html        Catálogo de productos
├── servicios.html        Catálogo de servicios
├── css/style.css         Estilos
├── js/script.js          Interactividad (menú, slider, formulario, etc.)
├── img/
│   ├── logo/             Logo de Grafast
│   ├── productos/        Fotos de productos (mantos, emulsiones, asfaltos)
│   ├── proyectos/        Fotos de obras y proyectos realizados
│   └── Fondo.jpeg        Imagen de fondo del hero
├── favicon.ico / apple-touch-icon.png   Ícono del sitio
├── robots.txt / sitemap.xml             SEO/indexación
└── FRAMEWORK-DESARROLLO.md              Diagnóstico y hoja de ruta técnica
```

No requiere backend, base de datos ni proceso de build: son archivos estáticos que cualquier navegador puede abrir directamente.

## Ver el sitio en tu computadora

Abre `index.html` con doble clic, o levanta un servidor local (recomendado para que las rutas relativas funcionen bien):

```bash
python -m http.server 8091
```

Luego visita `http://localhost:8091` en tu navegador.

## Publicar el sitio con GitHub Pages (gratis)

Como el repositorio ya está en GitHub, la forma más simple de publicarlo es con **GitHub Pages**:

1. Entra a tu repositorio: `https://github.com/jeffriverafer-collab/GRAFAST`
2. Ve a **Settings** (Configuración) → **Pages** (en el menú izquierdo).
3. En **Build and deployment**, en "Source" selecciona **Deploy from a branch**.
4. En "Branch" elige **main** y la carpeta **/ (root)**. Guarda con **Save**.
5. Espera 1-2 minutos. GitHub mostrará la URL pública, con este formato:

   ```
   https://jeffriverafer-collab.github.io/GRAFAST/
   ```

6. Cada vez que hagas `git push` a `main`, el sitio se actualiza automáticamente en esa URL.

### Dominio propio (opcional)

Si más adelante compras un dominio (por ejemplo `grafast.pe`), en la misma sección **Settings → Pages** puedes agregarlo en "Custom domain" y seguir las instrucciones para configurar los registros DNS con tu proveedor de dominio.

## Notas

- Los formularios de contacto y boletín son solo de interfaz (frontend): no envían datos a ningún servidor todavía. Si necesitas que las solicitudes lleguen a un correo o CRM, hay que conectarlos a un servicio como Formspree, EmailJS o un backend propio.
- Los enlaces de WhatsApp usan el número `+51 901 355 679` y el enlace de llamada (`tel:`) usa `+51 927 625 524`; ambos se repiten en `index.html`, `productos.html` y `servicios.html` — si cambia alguno, actualízalo en las 3 páginas.
