import { whatsappLink } from './whatsapp.js';

/* ---------- Validación del formulario de contacto + envío por WhatsApp ---------- */
export function initFormularioContacto() {
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (!form) return;

  const validators = {
    name: (value) => value.trim().length >= 3 ? '' : 'Ingresa tu nombre completo (mín. 3 caracteres).',
    phone: (value) => /^[\d\s+()-]{7,15}$/.test(value.trim()) ? '' : 'Ingresa un teléfono válido.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Ingresa un correo electrónico válido.',
    message: (value) => value.trim().length >= 10 ? '' : 'Cuéntanos un poco más sobre tu proyecto (mín. 10 caracteres).'
  };

  function validateField(field) {
    const validate = validators[field.name];
    if (!validate) return true;
    const errorMsg = validate(field.value);
    const errorEl = document.getElementById(`${field.name}Error`);
    const group = field.closest('.form-group');

    if (errorMsg) {
      group.classList.add('error');
      if (errorEl) errorEl.textContent = errorMsg;
      return false;
    } else {
      group.classList.remove('error');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
  }

  ['name', 'phone', 'email', 'message'].forEach(fieldName => {
    const field = form.elements[fieldName];
    if (field) {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-group').classList.contains('error')) validateField(field);
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    ['name', 'phone', 'email', 'message'].forEach(fieldName => {
      const field = form.elements[fieldName];
      if (field && !validateField(field)) isValid = false;
    });

    if (isValid) {
      const name = form.elements.name.value.trim();
      const phone = form.elements.phone.value.trim();
      const email = form.elements.email.value.trim();
      const message = form.elements.message.value.trim();
      const productField = form.elements.product;
      const productLabel = productField && productField.value
        ? productField.options[productField.selectedIndex].text
        : '';

      let texto = `Hola, soy ${name}. Mi teléfono es ${phone} y mi correo es ${email}.`;
      if (productLabel) texto += ` Estoy interesado en: ${productLabel}.`;
      texto += ` ${message}`;

      window.open(whatsappLink(texto), '_blank', 'noopener');

      formSuccess.classList.add('show');
      form.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 6000);
    } else {
      formSuccess.classList.remove('show');
      const firstError = form.querySelector('.form-group.error input, .form-group.error textarea');
      if (firstError) firstError.focus();
    }
  });
}
