import { whatsappLink } from './whatsapp.js';

/* ---------- Opciones de producto (color / presentación) ---------- */
export function initOpcionesProducto() {
  const productItems = document.querySelectorAll('.product-item[data-option-label]');

  const updateQuoteLink = (item) => {
    const active = item.querySelector('.option-btn.is-active');
    const msg = `Hola, quiero cotizar: ${item.dataset.product} (${item.dataset.optionLabel}: ${active.dataset.value})`;
    item.querySelector('.product-item__cta').href = whatsappLink(msg);
  };

  productItems.forEach((item) => {
    updateQuoteLink(item);
    item.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        item.querySelectorAll('.option-btn').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        item.querySelector('.product-item__img').style.backgroundImage = `url(${btn.dataset.img})`;
        item.querySelector('[data-selected]').textContent = btn.dataset.value;
        updateQuoteLink(item);
      });
    });
  });
}
