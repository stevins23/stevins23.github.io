const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');
const yearNode = document.getElementById('year');
const heroMain = document.querySelector('.hero-main');

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: '0px 0px -42px 0px'
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const setActiveNav = () => {
  let activeSectionId = '';
  const pivot = window.scrollY + window.innerHeight * 0.32;

  sections.forEach((section) => {
    if (pivot >= section.offsetTop) {
      activeSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${activeSectionId}`;
    link.classList.toggle('is-active', isActive);
  });
};

window.addEventListener('scroll', setActiveNav, { passive: true });
window.addEventListener('load', setActiveNav);

if (heroMain && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  heroMain.addEventListener('pointermove', (event) => {
    const rect = heroMain.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    heroMain.style.setProperty('--mx', `${x.toFixed(2)}%`);
    heroMain.style.setProperty('--my', `${y.toFixed(2)}%`);
  });

  heroMain.addEventListener('pointerleave', () => {
    heroMain.style.setProperty('--mx', '82%');
    heroMain.style.setProperty('--my', '18%');
  });
}
