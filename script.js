const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('#primary-menu');
const searchPanel = document.querySelector('#searchPanel');
const toast = document.querySelector('#toast');
const cartCount = document.querySelector('#cartCount');
let count = 0;
let toastTimer;

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
};

const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  navMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
};

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navMenu.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.querySelectorAll('[data-add-cart]').forEach((button) => {
  button.addEventListener('click', () => {
    count += 1;
    cartCount.textContent = count;
    closeMenu();
    showToast('Added to your Dhamer ritual bag');
  });
});

document.querySelectorAll('[data-open-search]').forEach((button) => {
  button.addEventListener('click', () => {
    closeMenu();
    searchPanel.classList.add('open');
    searchPanel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('search-open');
    searchPanel.querySelector('input').focus();
  });
});

const closeSearch = () => {
  searchPanel.classList.remove('open');
  searchPanel.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('search-open');
};

document.querySelector('[data-close-search]').addEventListener('click', closeSearch);
searchPanel.addEventListener('click', (event) => {
  if (event.target === searchPanel) closeSearch();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (searchPanel.classList.contains('open')) closeSearch();
    closeMenu();
  }
});

document.querySelector('[data-open-science]').addEventListener('click', () => {
  document.querySelector('#science').scrollIntoView({ behavior: 'smooth', block: 'center' });
  showToast('Discover the OSM science in every formula');
});

document.querySelector('#newsletterForm').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  showToast('Welcome to the glow list');
});
