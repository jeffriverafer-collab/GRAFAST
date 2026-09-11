# Framework de Desarrollo — Proyecto GRAFAST

**Preparado como:** evaluación técnica + marco de trabajo, con criterio de ingeniería de sistemas (10 años de experiencia en desarrollo y orden de proyectos).
**Alcance revisado:** `index.html`, `productos.html`, `servicios.html`, `css/style.css`, `js/script.js`, `README.md`, estructura de carpetas y repositorio Git.
**Fecha:** 10 de septiembre de 2026.

---

## 1. Diagnóstico del estado actual

### Lo que está bien hecho (no tocar sin razón)

| Aspecto | Evaluación |
|---|---|
| Elección tecnológica | HTML/CSS/JS puro sin build es correcto para un sitio de 3 páginas. No sobre-ingenierices esto con un framework pesado. |
| Accesibilidad básica | `aria-label`, `aria-expanded`, `alt` en imágenes, `lang="es"` — presentes y consistentes. Buena señal de disciplina. |
| SEO on-page | `<meta name="description">` específico por página, `<title>` únicos. Correcto. |
| Separación de responsabilidades | HTML / CSS / JS en archivos separados, con comentarios de sección (`===== NOSOTROS =====`) que facilitan navegar el código. |
| Control de versiones | Repositorio Git ya inicializado y sincronizado con GitHub, con despliegue vía GitHub Pages. Es el camino correcto para este proyecto. |
| CDN con versión fijada | `font-awesome@6.5.1` pineado explícitamente — evita que un cambio upstream rompa el sitio sin aviso. |

Esto importa decirlo primero: el proyecto **no está desordenado por falta de criterio**, está en el punto normal de un sitio que creció por páginas sucesivas sin que nadie haya hecho todavía la pasada de consolidación. Es exactamente el momento correcto para meterle un framework, antes de que el costo de reordenar crezca.

### Hallazgos concretos (con evidencia)

1. **Tres números de contacto distintos en el mismo sitio.**
   - WhatsApp (`index.html`, `productos.html`, `servicios.html`): `+51 901 355 679`
   - Teléfono `tel:` (mismas tres páginas): `+51 927 625 524`
   - `README.md`: "Los enlaces de WhatsApp usan el número `+51 990 358 013`"
   Esto es el síntoma clásico de **falta de fuente única de verdad**: un dato de negocio (el teléfono) vive copiado en 4+ lugares y ya se desincronizó. Un cliente real puede estar llamando al número equivocado ahora mismo.

2. **Header y footer duplicados íntegramente en las 3 páginas** (~150 líneas idénticas de nav + dropdown de productos + iconos de contacto, repetidas en `index.html`, `productos.html`, `servicios.html`). Cualquier cambio de menú, teléfono o red social hay que hacerlo 3 veces a mano — el hallazgo #1 es la prueba de que ese proceso manual ya falló una vez.

3. **Imágenes sin optimizar.** `img/` contiene varios PNG de 1.2–1.9 MB (`emulsioni.png`, `emulsionl.png`, `emulsionr.png`, `mc30.png`, `membrana.png`) para un sitio que se sirve completo estático. Eso es peso muerto en cada carga de página — impacta LCP/Core Web Vitals y por lo tanto el ranking en Google.

4. **Nombres de archivo con espacios**: `"trabajo 1.jpeg"`, `"LOGO GRAFAST.jpeg"`, `"WhatsApp Image 2026-08-24 at 12.27.14.jpeg"`. Funcionan hoy porque los navegadores toleran `%20`, pero son frágiles ante scripts, `git mv`, CDNs o build tools futuros, y ensucian el historial de Git.

5. **Formularios sin backend.** El propio `README.md` ya lo advierte: contacto y boletín son solo interfaz, no llegan a ningún lado. Esto no es un defecto de código, es un pendiente de producto — pero es el pendiente de mayor impacto de negocio: hoy cada lead que llena el formulario se pierde silenciosamente, sin error visible para el usuario (`formSuccess` se muestra igual).

6. **Sin `robots.txt` ni `sitemap.xml`.** El README ya documenta el plan de publicar en GitHub Pages y hasta un dominio propio — pero sin estos dos archivos, Google indexa peor y más lento.

7. **Sin favicon** declarado en el `<head>`.

8. **Sin linting/formateo automatizado** (Prettier, Stylelint, HTMLHint) ni CI en GitHub — cualquier error de sintaxis o enlace roto se descubre recién en producción.

9. **`js/script.js` concentra 7 responsabilidades no relacionadas** en un solo archivo de ~340 líneas sin módulos (nav, scroll, contador animado, filtro de proyectos, álbum/lightbox, slider de testimonios, validación de formulario, newsletter). Hoy es manejable; en cuanto se agregue una octava funcionalidad, deja de serlo.

Ninguno de estos 9 puntos es urgente por sí solo. Juntos, son la lista de prioridades de la sección 4.

---

## 2. Principio rector del framework

> **Una sola fuente de verdad por cada dato o componente que se repite.**

El teléfono equivocado (hallazgo #1) es la evidencia de que este principio ya se violó. Todo lo que sigue en este documento es una forma concreta de aplicarlo: a datos de contacto, a markup repetido, a convenciones de código y al propio proceso de trabajo.

---

## 3. Estructura de proyecto objetivo

```
GRAFAST/
├── .github/
│   └── workflows/
│       └── check.yml          # CI: valida HTML/links antes de merge a main
├── .claude/
│   └── launch.json
├── data/
│   └── contacto.json          # teléfono, WhatsApp, email, dirección — fuente única
├── partials/                  # si se adopta templating (ver §5)
│   ├── header.html
│   └── footer.html
├── img/
│   ├── productos/
│   ├── proyectos/
│   └── logo/
├── css/
│   └── style.css
├── js/
│   ├── nav.js
│   ├── slider.js
│   ├── forms.js
│   └── album.js
├── index.html
├── productos.html
├── servicios.html
├── robots.txt
├── sitemap.xml
├── favicon.ico
├── README.md                  # cómo correr y desplegar (ya existe, mantener)
├── CONTRIBUTING.md            # convenciones de este documento, resumidas
└── CHANGELOG.md
```

No es necesario migrar todo de una vez — la sección 6 (roadmap) secuencia esto en pasos que no rompen lo que ya funciona.

---

## 4. Prioridades inmediatas (orden recomendado, de mayor a menor impacto/costo)

| # | Acción | Impacto | Esfuerzo |
|---|---|---|---|
| 1 | Unificar el número de teléfono/WhatsApp en `data/contacto.json` (o, mientras no haya templating, corregir manualmente en las 4 ubicaciones y dejar UNA anotación en el README como fuente de verdad) | Alto (pérdida de clientes real) | Bajo |
| 2 | Conectar el formulario de contacto a Formspree o EmailJS (ambos gratis hasta cierto volumen, sin backend propio) | Alto (leads que hoy se pierden) | Bajo–Medio |
| 3 | Comprimir imágenes >300 KB (Squoosh o TinyPNG) y convertir a WebP con fallback | Medio-Alto (performance/SEO) | Bajo |
| 4 | Renombrar archivos con espacios a `kebab-case` (`trabajo-1.jpeg`, `logo-grafast.jpeg`) y actualizar referencias | Medio (deuda técnica silenciosa) | Bajo |
| 5 | Agregar `robots.txt`, `sitemap.xml` y favicon | Medio (SEO/indexación) | Bajo |
| 6 | Extraer header/footer a un partial (ver §5) para eliminar la triplicación | Medio-Alto (mantenibilidad) | Medio |
| 7 | Dividir `script.js` en módulos por responsabilidad | Bajo-Medio (mantenibilidad futura) | Medio |
| 8 | Agregar linting + un workflow de GitHub Actions que valide antes de que `main` despliegue solo | Medio (previene regresiones) | Medio |

---

## 5. Cómo eliminar la duplicación sin abandonar "sitio 100% estático"

El README declara como ventaja que el sitio "no requiere backend, base de datos ni proceso de build". Esa decisión sigue siendo correcta para este tamaño de proyecto — la recomendación **no es introducir un backend**, sino separar el *momento de edición* del *momento de publicación*, con una herramienta de build minúscula que sigue produciendo archivos estáticos puros.

**Opción recomendada: Eleventy (11ty)**
- Convierte `header.html` / `footer.html` en partials que se incluyen en cada página.
- El `npm run build` genera `index.html`, `productos.html`, `servicios.html` ya "aplanados" — el resultado que se sube a GitHub Pages sigue siendo HTML estático puro, cero cambio en cómo se despliega.
- Curva de aprendizaje baja (un día), y es exactamente la herramienta que resuelve el hallazgo #1 y #2 de raíz: el teléfono se edita en un solo lugar (`data/contacto.json`) y se propaga solo a las 3 páginas en el build.

**Alternativa mínima si no se quiere ni una dependencia de Node:** un script Python de \~30 líneas que reemplace marcadores `<!-- INCLUDE:header -->` por el contenido de `partials/header.html` antes de cada commit. Menos elegante, pero cero curva de aprendizaje y sigue centralizando la fuente de verdad.

---

## 6. Roadmap por fases

**Fase 0 — Estabilización (1–2 sesiones de trabajo)**
Corregir hallazgos #1, #4, #5, #7 de la sección 1. Son arreglos puntuales, sin riesgo de romper nada, y eliminan el problema de mayor visibilidad para un cliente (datos de contacto incorrectos).

**Fase 1 — Captura de leads (1 sesión)**
Conectar formulario de contacto y boletín a Formspree/EmailJS. Verificar que llega el correo de prueba antes de dar por cerrado.

**Fase 2 — Performance y SEO (1–2 sesiones)**
Comprimir/convertir imágenes, agregar `sitemap.xml` + `robots.txt`, correr Lighthouse y corregir lo que marque en rojo (probablemente LCP por las imágenes pesadas).

**Fase 3 — Eliminar duplicación (2–3 sesiones)**
Introducir 11ty (o el script de includes), migrar header/footer a partial, centralizar datos de contacto. Este es el cambio estructural más grande — hacerlo después de que Fase 0–2 ya estabilizaron el contenido evita reescribir dos veces.

**Fase 4 — Calidad continua (recurrente)**
GitHub Action que en cada push valide HTML (p. ej. `html-validate`) y enlaces rotos, antes de que `main` autodesplegue a producción. Esto convierte "cada push rompe algo en silencio" en "el CI avisa antes de que el cliente lo vea".

---

## 7. Convenciones de trabajo (Git y código)

**Commits:** usar [Conventional Commits](https://www.conventionalcommits.org/) — `fix:`, `feat:`, `docs:`, `refactor:`, `chore:`. Ejemplo: `fix: unificar número de WhatsApp en las 3 páginas`. Esto por sí solo genera un historial legible y, más adelante, permite automatizar un `CHANGELOG.md`.

**Ramas:** como `main` autodespliega a producción vía GitHub Pages, evitar commitear directo a `main` para cambios no triviales. Trabajar en una rama (`fix/telefono-contacto`, `feat/formulario-backend`) y hacer merge cuando esté probado localmente con `python -m http.server 8091` (ya está configurado en `.claude/launch.json`).

**Definition of Done por cambio:**
- [ ] Probado localmente en servidor local, no solo abriendo el archivo con doble clic.
- [ ] Probado en móvil (viewport angosto) — el sitio tiene menú responsive, hay que verificarlo cada vez que se toque el nav.
- [ ] Si se tocó un dato de contacto, verificado en las 3 páginas (hasta que exista el partial de §5).
- [ ] Sin `console.error` en la consola del navegador.
- [ ] Commit con mensaje siguiendo la convención anterior.

**Código:**
- CSS: mantener el uso ya existente de custom properties (`--navy-950`, etc.) como fuente única de la paleta — no hardcodear colores nuevos fuera de `:root`.
- JS: al dividir `script.js` (Fase 3), un archivo = una responsabilidad, sin variables globales compartidas entre módulos salvo que sea explícito.
- Nombres de archivo: `kebab-case`, sin espacios ni mayúsculas, siempre.

---

## 8. Herramientas recomendadas (todas gratuitas)

| Necesidad | Herramienta |
|---|---|
| Compresión de imágenes | [Squoosh](https://squoosh.app) o TinyPNG |
| Formulario sin backend propio | Formspree o EmailJS |
| Validación HTML en CI | `html-validate` (GitHub Action) |
| Auditoría de performance/SEO | Lighthouse (integrado en Chrome DevTools) |
| Indexación | Google Search Console (una vez el dominio esté activo) |
| Formateo de código | Prettier |

---

## 9. Resumen ejecutivo

El proyecto tiene una base técnica sólida para su tamaño — la decisión de mantenerlo estático es correcta y no hay que revertirla. Lo que falta no es más tecnología, es **disciplina de fuente única de verdad**: el teléfono incorrecto en el README es la prueba de que copiar el mismo dato en varios archivos ya generó un error real. El framework de este documento resuelve eso con el mínimo cambio posible (Fase 0–2 son correcciones puntuales de bajo riesgo) y deja preparado el terreno para eliminar la duplicación estructural (Fase 3) cuando el contenido ya esté estable.
