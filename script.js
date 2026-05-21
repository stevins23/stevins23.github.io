const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const revealItems = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const yearNode = document.getElementById('year');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
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
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: '0px 0px -40px 0px' }
);

revealItems.forEach((item) => revealObserver.observe(item));

const setActiveNav = () => {
  let activeSectionId = '';
  const scrollY = window.scrollY + window.innerHeight * 0.32;

  sections.forEach((section) => {
    if (scrollY >= section.offsetTop) {
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
