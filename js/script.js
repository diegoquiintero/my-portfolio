// 👇 Este bloque va antes de cualquier otra cosa
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
root.setAttribute('data-theme', initialTheme);

let themeColorMeta = document.querySelector('meta[name="theme-color"]');
if (!themeColorMeta) {
  themeColorMeta = document.createElement('meta');
  themeColorMeta.name = 'theme-color';
  document.head.appendChild(themeColorMeta);
}
function updateThemeColor() {
  if (themeColorMeta) {
    const theme = root.getAttribute('data-theme');
    themeColorMeta.setAttribute('content', theme === 'dark' ? '#ffffff' : '#000000');
  }
}

// Todo lo demás dentro de DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const navLinks    = document.querySelectorAll('.nav-link');

  applyTheme(root.getAttribute('data-theme'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      setTimeout(updateThemeColor, 50);
    });
  }

  function applyTheme(mode) {
    root.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
    if (themeToggle) {
      if (mode === 'dark') {
        themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>';
      } else {
        themeToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/></svg>';
      }
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Scroll behavior handles active class
    });
  });
  // --- Scroll-based active nav link highlighting
  // Ensure certified section is included (already covered by selector)
  const sections = document.querySelectorAll('section[id]');
  function updateActiveSection() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (currentLink) currentLink.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection();

  // — Carousel
  const slides = document.querySelectorAll('.hero-carousel-layered .carousel-slide');
  if (slides.length) {
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
    if (container) {
      container.addEventListener('mouseenter', stopCarousel);
      container.addEventListener('mouseleave', startCarousel);
    }
  }

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
    modal.classList.remove("show");
    modalImg.src = "";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
      modalImg.src = "";
    }
  });

  // --- Project modal logic
  const projectModal = document.getElementById("projectModal");
  const closeProjectModal = document.querySelector(".modal-close");
  const projectCards = document.querySelectorAll(".project-card");
  const modalTitle = projectModal.querySelector(".modal-title");
  const modalImages = projectModal.querySelectorAll(".modal-images img");
  const modalDescription = projectModal.querySelector(".modal-description");

  const projectData = [
    {
      title: "Cobots Assembly Line for Fiber Extrusion Device",
      description: "Designed a pneumatic gripper for the xArm6 and custom fixtures aligned with machine vision. Presented to MIT, the system ensured operator safety, efficient storage, and seamless integration with the assembly flow.",
      images: [
        "assets/projects/project1.jpeg",
        "assets/projects/project1b.jpeg",
        "assets/projects/project1c.jpeg"
      ]
    },
    {
      title: "Automation of CNC for Robotic Assembly Line",
      description: "Designed and fabricated a fixture using steel and manual milling equipment. Followed GD&T drawings to enable pneumatic pick-and-place integration with a HAAS CNC, improving accuracy and repeatability.",
      images: [
        "assets/projects/project2.png",
        "assets/projects/project2b.png",
        "assets/projects/project2c.png"
      ]
    },
    {
      title: "Dip Coating Research Machine Prototype",
      description: "Built a low-cost dip coating machine using 3D-printed components. Designed for lab use, allowing controlled immersion processes while maintaining repeatability, affordability, and ease of operation.",
      images: [
        "assets/projects/project3.jpeg",
        "assets/projects/project3b.jpeg",
        "assets/projects/project3c.jpeg"
      ]
    },
    {
      title: "Automated Industrial Welding Cell",
      description: "Developed a digital twin and clamp-based fixture concept for ABB’s robotic welding cell. Focused on automotive chassis welding while ensuring compliance with industrial safety and automation standards.",
      images: [
        "assets/projects/project4.png",
        "assets/projects/project4b.png",
        "assets/projects/project4c.png"
      ]
    },
    {
      title: "Low-Cost Electrospinning Machine",
      description: "This is a detailed description of the fifth project.",
      images: [
        "assets/projects/project1.jpeg",
        "assets/projects/project1b.jpeg",
        "assets/projects/project1c.jpeg"
      ]
    },
    {
      title: "Line Follower Robot",
      description: "Designed a 3D-printed chassis for a line follower robot. Built for educational purposes, enabling quick assembly and introducing robotics to middle and high school students through hands-on learning.",
      images: [
        "assets/projects/project2.png",
        "assets/projects/project2b.png",
        "assets/projects/project2c.png"
      ]
    }
  ];

  projectCards.forEach((card, index) => {
    card.addEventListener("click", () => {
      const data = projectData[index];
      modalTitle.textContent = data.title;
      modalDescription.textContent = data.description;
      modalImages.forEach((img, i) => {
        img.src = data.images[i];
        img.alt = `${data.title} image ${i + 1}`;
      });

      // Reset dynamic content (in case it was shown before)
      const subdescElem = document.getElementById('modalSubdesc');
      if (subdescElem) subdescElem.textContent = '';
      const galleryElem = document.getElementById('modalGallery');
      if (galleryElem) galleryElem.innerHTML = '';
      const projectVideoSource = document.querySelector('.project-video source');
      const projectVideo = document.querySelector('.project-video');
      const videoTitle = document.querySelector('.video-title');
      if (projectVideoSource) projectVideoSource.src = '';
      if (projectVideo) projectVideo.load();
      if (projectVideo) projectVideo.style.display = 'none';
      if (videoTitle) videoTitle.style.display = 'none';

      // Special layout for project 3
      if (index === 2) {
        const galleryData = [
          { src: "../assets/Project3/P3_0.png", caption: "Initial CAD concept" },
          { src: "../assets/Project3/P3_1.png", caption: "Prototype version 1" },
          { src: "../assets/Project3/P3_2.png", caption: "Refined CAD model" },
          { src: "../assets/Project3/P3_3.png", caption: "Prototype version 2" },
          { src: "../assets/Project3/P3_4.png", caption: "Exploded view" }
        ];

        if (galleryElem) {
          galleryElem.innerHTML = '';

          const oldProgress = galleryElem.parentElement.querySelector('.carousel-progress');
          if (oldProgress) oldProgress.remove();

          galleryData.forEach(({ src, caption }) => {
            const fig = document.createElement('figure');
            fig.innerHTML = `<img src="${src}" alt="${caption}"><figcaption>${caption}</figcaption>`;
            galleryElem.appendChild(fig);
          });

          let current = 0;
          let updateGallery = () => {
            const figures = galleryElem.querySelectorAll('figure');
            figures.forEach((fig, i) => {
              fig.classList.remove('left', 'center', 'right');
              if (i === current) {
                fig.classList.add('center');
              } else if (i === (current + 1) % figures.length) {
                fig.classList.add('right');
              } else if (i === (current - 1 + figures.length) % figures.length) {
                fig.classList.add('left');
              }
            });
          };
          updateGallery();
          galleryElem.addEventListener('click', () => {
            current = (current + 1) % galleryData.length;
            updateGallery();
          });

          // Visual arrow navigation support (removed)
          // const navLeft = document.createElement('button');
          // const navRight = document.createElement('button');
          // navLeft.textContent = '←';
          // navRight.textContent = '→';
          // navLeft.className = 'carousel-nav left';
          // navRight.className = 'carousel-nav right';
          // galleryElem.parentElement.appendChild(navLeft);
          // galleryElem.parentElement.appendChild(navRight);
          //
          // navLeft.addEventListener('click', (e) => {
          //   e.stopPropagation();
          //   current = (current - 1 + galleryData.length) % galleryData.length;
          //   updateGallery();
          // });
          // navRight.addEventListener('click', (e) => {
          //   e.stopPropagation();
          //   current = (current + 1) % galleryData.length;
          //   updateGallery();
          // });

          // Enable arrow key navigation
          document.addEventListener('keydown', (e) => {
            if (!projectModal.classList.contains("show")) return;
            if (e.key === "ArrowRight") {
              current = (current + 1) % galleryData.length;
              updateGallery();
            } else if (e.key === "ArrowLeft") {
              current = (current - 1 + galleryData.length) % galleryData.length;
              updateGallery();
            }
          });

          // Enable swipe support
          let startX = 0;
          galleryElem.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
          });

          galleryElem.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const deltaX = endX - startX;
            if (Math.abs(deltaX) > 40) {
              if (deltaX < 0) {
                current = (current + 1) % galleryData.length;
              } else {
                current = (current - 1 + galleryData.length) % galleryData.length;
              }
              updateGallery();
            }
          });

          // Create and append progress indicator (arrows removed)
          const progress = document.createElement('div');
          progress.className = 'carousel-progress';

          const dots = [];

          galleryData.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dots.push(dot);
            progress.appendChild(dot);
          });

          galleryElem.parentElement.appendChild(progress);

          // Update dot indicator
          const updateProgress = () => {
            dots.forEach((dot, i) => {
              dot.classList.toggle('active', i === current);
            });
          };

          const originalUpdateGallery = updateGallery;
          function updateGalleryWithProgress() {
            originalUpdateGallery();
            updateProgress();
          }
          updateGallery = updateGalleryWithProgress;
          updateProgress();
        }

        // Video display for project 3 removed
      }

      // Special layout for project 4
      if (index === 3) {
        const galleryData = [
          { src: "../assets/Project4/P4-0.png", caption: "Welding cell CAD overview" },
          { src: "../assets/Project4/P4-1.png", caption: "Top view of welding cell CAD" },
          { src: "../assets/Project4/P4-2.png", caption: "Fixture design for welding components" },
          { src: "../assets/Project4/P4-3.png", caption: "Clamp mounting proposal on fixture" },
          { src: "../assets/Project4/P4-4.png", caption: "Inspection orientation test #1" },
          { src: "../assets/Project4/P4-5.png", caption: "Inspection orientation test #2" }
        ];

        if (galleryElem) {
          galleryElem.innerHTML = '';

          const oldProgress = galleryElem.parentElement.querySelector('.carousel-progress');
          if (oldProgress) oldProgress.remove();

          galleryData.forEach(({ src, caption }) => {
            const fig = document.createElement('figure');
            fig.innerHTML = `<img src="${src}" alt="${caption}"><figcaption>${caption}</figcaption>`;
            galleryElem.appendChild(fig);
          });

          let current = 0;
          let updateGallery = () => {
            const figures = galleryElem.querySelectorAll('figure');
            figures.forEach((fig, i) => {
              fig.classList.remove('left', 'center', 'right');
              if (i === current) {
                fig.classList.add('center');
              } else if (i === (current + 1) % figures.length) {
                fig.classList.add('right');
              } else if (i === (current - 1 + figures.length) % figures.length) {
                fig.classList.add('left');
              }
            });
          };
          updateGallery();
          galleryElem.addEventListener('click', () => {
            current = (current + 1) % galleryData.length;
            updateGallery();
          });

          document.addEventListener('keydown', (e) => {
            if (!projectModal.classList.contains("show")) return;
            if (e.key === "ArrowRight") {
              current = (current + 1) % galleryData.length;
              updateGallery();
            } else if (e.key === "ArrowLeft") {
              current = (current - 1 + galleryData.length) % galleryData.length;
              updateGallery();
            }
          });

          let startX = 0;
          galleryElem.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
          });

          galleryElem.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const deltaX = endX - startX;
            if (Math.abs(deltaX) > 40) {
              if (deltaX < 0) {
                current = (current + 1) % galleryData.length;
              } else {
                current = (current - 1 + galleryData.length) % galleryData.length;
              }
              updateGallery();
            }
          });

          const progress = document.createElement('div');
          progress.className = 'carousel-progress';

          const dots = [];

          galleryData.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dots.push(dot);
            progress.appendChild(dot);
          });

          galleryElem.parentElement.appendChild(progress);

          const updateProgress = () => {
            dots.forEach((dot, i) => {
              dot.classList.toggle('active', i === current);
            });
          };

          const originalUpdateGallery = updateGallery;
          function updateGalleryWithProgress() {
            originalUpdateGallery();
            updateProgress();
          }
          updateGallery = updateGalleryWithProgress;
          updateProgress();
        }
      }

      projectModal.classList.add("show", "animate");
      setTimeout(() => {
        projectModal.classList.remove("animate");
      }, 350);
    });
  });

  function closeProjectModalWithAnimation() {
    projectModal.classList.remove("show");
  }

  if (closeProjectModal && projectModal) {
    closeProjectModal.addEventListener("click", closeProjectModalWithAnimation);

    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        closeProjectModalWithAnimation();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && projectModal.classList.contains("show")) {
        closeProjectModalWithAnimation();
      }
    });
  }

});