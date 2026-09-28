/* ---------- Slider de testimonios ---------- */
export function initTestimonios() {
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  const slides = track ? Array.from(track.children) : [];
  if (!track || !slides.length) return;

  let currentSlide = 0;
  let sliderInterval;

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dotsWrap.querySelectorAll('span').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });

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
