/* ---------- Header, menú móvil y botón "volver arriba" ---------- */
export function initNav() {
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  if (!header || !nav || !navToggle) return;

  /* Resalta el enlace activo del menú según la sección visible */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function setActiveNavLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }

  /* Header: sombra + estado al hacer scroll */
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 500);
    setActiveNavLink();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Menú móvil */
  const dropdownParent = document.querySelector('.has-dropdown');

  function closeNav() {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('active');
    document.body.classList.remove('nav-open');
    if (dropdownParent) dropdownParent.classList.remove('open');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.classList.toggle('active', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
    if (!isOpen && dropdownParent) dropdownParent.classList.remove('open');
  });

  // Dropdown de productos en móvil (toca para abrir/cerrar)
  let dropdownLink = null;
  if (dropdownParent) {
    dropdownLink = dropdownParent.querySelector('.nav__link');
    dropdownLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 860) {
        e.preventDefault();
        dropdownParent.classList.toggle('open');
      }
    });
  }

  // Cierra el menú móvil al hacer click en un enlace
  document.querySelectorAll('.nav__link, .dropdown a').forEach(link => {
    if (link === dropdownLink) return; // el enlace "Productos" solo abre/cierra su submenú
    link.addEventListener('click', () => {
      if (window.innerWidth <= 860) closeNav();
    });
  });

  // Cierra el menú móvil al tocar fuera de él
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 860 && nav.classList.contains('open') &&
        !nav.contains(e.target) && !navToggle.contains(e.target)) {
      closeNav();
    }
  });
}
