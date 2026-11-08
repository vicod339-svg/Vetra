// ============================================
// EFECTOS VISUALES PREMIUM
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Scroll Reveal (Aparición suave)
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  window.aplicarAnimacionesScroll = () => {
    const elementos = document.querySelectorAll('.card-categoria, .card-producto, .titulo-seccion');
    elementos.forEach(el => {
      el.classList.add('scroll-reveal');
      observer.observe(el);
    });
  };
  window.aplicarAnimacionesScroll();

  // 2. Efecto 3D Tilt en tarjetas (Solo PC)
  if (window.matchMedia("(hover: hover)").matches) {
    document.body.addEventListener('mousemove', (e) => {
      const card = e.target.closest('.card-producto');
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      }
    });

    document.body.addEventListener('mouseout', (e) => {
      const card = e.target.closest('.card-producto');
      if (card) {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      }
    });
  }

  // 3. Efecto Parallax en el Hero
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrollY / 600);
      }
    });
  }

  // 4. Efecto "Latido" en el botón de Favoritos
  document.body.addEventListener('click', (e) => {
    const btnFav = e.target.closest('.btn-favorito');
    if (btnFav) {
      btnFav.classList.add('latido');
      setTimeout(() => btnFav.classList.remove('latido'), 300);
    }
  });
});