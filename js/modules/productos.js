import { whatsappLink } from './whatsapp.js';

/* ---------- Opciones de producto (color / tipo / presentación) ----------
   Un producto puede tener varios grupos (.product-options). Cada grupo marca
   su opción activa; el enlace de cotización incluye la elección de todos. */
export function initOpcionesProducto() {
  const productItems = [...document.querySelectorAll('.product-item')]
    .filter((item) => item.querySelector('.product-options'));

  const updateQuoteLink = (item) => {
    const elecciones = [...item.querySelectorAll('.product-options')].map((grupo) => {
      const active = grupo.querySelector('.option-btn.is-active');
      return `${grupo.dataset.optionLabel}: ${active.dataset.value}`;
    });
    const msg = `Hola, quiero cotizar: ${item.dataset.product} (${elecciones.join(', ')})`;
    item.querySelector('.product-item__cta').href = whatsappLink(msg);
  };

  productItems.forEach((item) => {
    updateQuoteLink(item);
    item.querySelectorAll('.product-options').forEach((grupo) => {
      grupo.querySelectorAll('.option-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          grupo.querySelectorAll('.option-btn').forEach((b) => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          grupo.querySelector('[data-selected]').textContent = btn.dataset.value;
          if (btn.dataset.img) {
            item.querySelector('.product-item__img').style.backgroundImage = `url(${btn.dataset.img})`;
          }
          if (btn.dataset.desc) {
            item.querySelector('.product-item__desc').textContent = btn.dataset.desc;
          }
          updateQuoteLink(item);
        });
      });
    });
  });
}
