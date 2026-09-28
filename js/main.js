/* =========================================================
   GRAFAST — Punto de entrada de JavaScript
   Cada módulo de js/modules/ se encarga de una funcionalidad
   y no hace nada si su elemento no existe en la página actual.
   ========================================================= */
import { initEmail } from './modules/email.js';
import { initNav } from './modules/nav.js';
import { initReveal, initStats } from './modules/animaciones.js';
import { initFiltroProyectos, initAlbum } from './modules/proyectos.js';
import { initTestimonios } from './modules/testimonios.js';
import { initFormularioContacto } from './modules/contacto.js';
import { initFooter } from './modules/footer.js';
import { initOpcionesProducto } from './modules/productos.js';

initEmail();
initFooter();
initNav();
initReveal();
initStats();
initFiltroProyectos();
initAlbum();
initTestimonios();
initFormularioContacto();
initOpcionesProducto();
