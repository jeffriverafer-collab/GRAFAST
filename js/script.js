/* =========================================================
   GRAFAST — JavaScript externo
   Menú móvil, header al hacer scroll, animaciones,
   contador de estadísticas, filtro de proyectos,
   slider de testimonios, validación de formulario,
   chat widget y botón "volver arriba".
   ========================================================= */
 
document.addEventListener('DOMContentLoaded', () => {
 
  /* ---------- Año dinámico en el footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
 
  /* ---------- Header: sombra + estado al hacer scroll ---------- */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  /* ---------- Resalta el enlace activo del menú según la sección visible ---------- */
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

  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('show', window.scrollY > 500);
    setActiveNavLink();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
 
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
 
  /* ---------- Menú móvil ---------- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
 
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
 
  /* ---------- Animación al hacer scroll (Intersection Observer) ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
 
  revealEls.forEach(el => revealObserver.observe(el));
 
  /* ---------- Contador animado de estadísticas ---------- */
  const statNumbers = document.querySelectorAll('.stat__number');
 
  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1800;
    const startTime = performance.now();
 
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString('es-PE');
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString('es-PE');
      }
    }
    requestAnimationFrame(tick);
  }
 
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
 
  statNumbers.forEach(el => statsObserver.observe(el));
 
  /* ---------- Filtro de proyectos ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
 
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
 
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('hide', !match);
      });
    });
  });
 
  /* ---------- Álbum de fotos de proyectos ---------- */
  const album = document.getElementById('album');
  const imagenAlbum = document.getElementById('imagenAlbum');
  const albumTitulo = document.getElementById('albumTitulo');
  const albumMiniaturas = document.getElementById('albumMiniaturas');

  if (album && imagenAlbum) {
    let fotosProyecto = [];
    let fotoActual = 0;

    function mostrarFoto() {
      imagenAlbum.src = fotosProyecto[fotoActual];
      albumMiniaturas.querySelectorAll('img').forEach((img, i) => {
        img.classList.toggle('activa', i === fotoActual);
      });
    }

    function cambiarFoto(direccion) {
      fotoActual = (fotoActual + direccion + fotosProyecto.length) % fotosProyecto.length;
      mostrarFoto();
    }

    function abrirAlbum(card) {
      fotosProyecto = JSON.parse(card.getAttribute('data-fotos') || '[]');
      if (!fotosProyecto.length) return;

      fotoActual = 0;
      albumTitulo.textContent = card.getAttribute('data-titulo') || '';

      albumMiniaturas.innerHTML = '';
      fotosProyecto.forEach((src, i) => {
        const thumb = document.createElement('img');
        thumb.src = src;
        thumb.addEventListener('click', () => { fotoActual = i; mostrarFoto(); });
        albumMiniaturas.appendChild(thumb);
      });

      mostrarFoto();
      album.style.display = 'flex';
    }

    function cerrarAlbum() {
      album.style.display = 'none';
    }

    projectCards.forEach(card => {
      if (card.hasAttribute('data-fotos')) {
        card.addEventListener('click', () => abrirAlbum(card));
      }
    });

    document.getElementById('albumCerrar').addEventListener('click', cerrarAlbum);
    document.getElementById('albumAnterior').addEventListener('click', () => cambiarFoto(-1));
    document.getElementById('albumSiguiente').addEventListener('click', () => cambiarFoto(1));

    album.addEventListener('click', (e) => {
      if (e.target === album) cerrarAlbum();
    });

    document.addEventListener('keydown', (e) => {
      if (album.style.display !== 'flex') return;
      if (e.key === 'Escape') cerrarAlbum();
      if (e.key === 'ArrowRight') cambiarFoto(1);
      if (e.key === 'ArrowLeft') cambiarFoto(-1);
    });
  }

  /* ---------- Slider de testimonios ---------- */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  const slides = track ? Array.from(track.children) : [];
  let currentSlide = 0;
  let sliderInterval;
 
  if (track && slides.length) {
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });
 
    function goToSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dotsWrap.querySelectorAll('span').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }
 
    function startAutoSlide() {
      sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5500);
    }
 
    function stopAutoSlide() {
      clearInterval(sliderInterval);
    }
 
    startAutoSlide();
    track.parentElement.addEventListener('mouseenter', stopAutoSlide);
    track.parentElement.addEventListener('mouseleave', startAutoSlide);
  }
 
  /* ---------- Validación del formulario de contacto ---------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
 
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
 
  if (form) {
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
 
  /* ---------- Newsletter del footer ---------- */
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
 
});
