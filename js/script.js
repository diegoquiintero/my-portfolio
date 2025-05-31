// 👇 Este bloque va antes de cualquier otra cosa
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
root.setAttribute('data-theme', initialTheme);

// Todo lo demás dentro de DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const navLinks    = document.querySelectorAll('.nav-link');

  applyTheme(root.getAttribute('data-theme'));

  themeToggle.addEventListener('click', () => {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  function applyTheme(mode) {
    root.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
    themeToggle.textContent = mode === 'dark' ? '☀' : '☾';
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
});

// — Carousel
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-carousel-layered .carousel-slide');
  let currentIndex = 0;
  let interval;

  function updateSlides() {
    slides.forEach((slide, i) => {
      slide.classList.remove('left', 'center', 'right');

      if (i === currentIndex) {
        slide.classList.add('center');
      } else if (i === (currentIndex + 1) % slides.length) {
        slide.classList.add('right');
      } else if (i === (currentIndex - 1 + slides.length) % slides.length) {
        slide.classList.add('left');
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
  }

  function startCarousel() {
    interval = setInterval(nextSlide, 5000);
  }

  function stopCarousel() {
    clearInterval(interval);
  }

  updateSlides();
  startCarousel();

  const container = document.querySelector('.hero-carousel-layered');
  container.addEventListener('mouseenter', stopCarousel);
  container.addEventListener('mouseleave', startCarousel);

  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certModalImg");
  const certImages = document.querySelectorAll("#certified img");

  certImages.forEach(img => {
    img.addEventListener("click", () => {
      modal.classList.add("show");
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    });
  });

  modal.addEventListener("click", () => {
    modal.classList.add("fading-out");
    modalImg.classList.add("zoom-out");

    setTimeout(() => {
      modal.classList.remove("show", "fading-out");
      modalImg.classList.remove("zoom-out");
      modalImg.src = "";
    }, 300);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.add("fading-out");
      modalImg.classList.add("zoom-out");

      setTimeout(() => {
        modal.classList.remove("show", "fading-out");
        modalImg.classList.remove("zoom-out");
        modalImg.src = "";
      }, 300);
    }
  });
});