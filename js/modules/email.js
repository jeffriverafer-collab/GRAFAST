/* ---------- Ofuscación del correo (evita cosecha por bots de spam) ---------- */
export function initEmail() {
  document.querySelectorAll('.js-email-link').forEach(link => {
    link.href = `mailto:${link.dataset.user}@${link.dataset.domain}`;
  });
  document.querySelectorAll('.js-email-text').forEach(span => {
    span.textContent = `${span.dataset.user}@${span.dataset.domain}`;
  });
}
