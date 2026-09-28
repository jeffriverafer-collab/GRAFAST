/* ---------- Filtro de proyectos ---------- */
export function initFiltroProyectos() {
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
}

/* ---------- Álbum de fotos de proyectos ---------- */
export function initAlbum() {
  const album = document.getElementById('album');
  const imagenAlbum = document.getElementById('imagenAlbum');
  const albumTitulo = document.getElementById('albumTitulo');
  const albumMiniaturas = document.getElementById('albumMiniaturas');
  if (!album || !imagenAlbum) return;

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

  document.querySelectorAll('.project-card').forEach(card => {
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
