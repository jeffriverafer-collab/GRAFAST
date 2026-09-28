/* ---------- Año dinámico y boletín del footer ---------- */
export function initFooter() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value.trim()) {
        input.value = '';
        input.placeholder = '¡Gracias por suscribirte!';
        setTimeout(() => { input.placeholder = 'Tu correo electrónico'; }, 4000);
      }
    });
  }
}
