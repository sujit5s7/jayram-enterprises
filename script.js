const services = [
  { title: "Balcony Safety Nets", category: "home", description: "Fall protection for balconies without changing how the space feels." },
  { title: "Balcony Invisible Grills", category: "grills", description: "Modern safety for open balconies with clear views and ventilation." },
  { title: "Pigeon Safety Nets", category: "bird", description: "Keep pigeons out of balconies, windows and open spaces." },
  { title: "Anti Bird Nets", category: "bird", description: "Bird-control netting for cleaner, more usable outdoor areas." },
  { title: "Window Invisible Grills", category: "grills", description: "Safety and a modern appearance for windows and high-rise homes." },
  { title: "Children Safety Nets", category: "home", description: "Protect openings where children play, move and explore." },
  { title: "Duct Area Safety Nets", category: "home", description: "Secure open ducts from falls, birds and debris." },
  { title: "Kids Safety Invisible Grills", category: "grills", description: "Clear-view protection designed around family spaces." },
  { title: "Bird Protection Nets", category: "bird", description: "UV-resistant bird exclusion that keeps airflow moving." },
  { title: "Building Safety Nets", category: "special", description: "Safety netting for residential and commercial building requirements." },
  { title: "Stainless Steel Invisible Grills", category: "grills", description: "High-tensile, rust-resistant cable systems for safer openings." },
  { title: "Construction Safety Nets", category: "special", description: "Fall and debris protection for safer construction environments." },
  { title: "Industrial Safety Nets", category: "special", description: "Protect people, machinery and materials in industrial spaces." },
  { title: "Staircase Safety Nets", category: "home", description: "Help protect staircase openings in homes and commercial buildings." },
  { title: "Coconut Tree Safety Nets", category: "special", description: "Help manage falling-coconut risk around properties and grounds." },
  { title: "Swimming Pool Safety Nets", category: "special", description: "A safer pool area for children, pets, homes and resorts." },
  { title: "Bird Spikes", category: "bird", description: "Discourage birds from ledges, roofs, walls and signboards." },
  { title: "Cricket Practice Nets", category: "special", description: "Durable practice netting for clubs, schools and home training spaces." }
];

const serviceGrid = document.querySelector('#service-grid');
const serviceImages = ['balconysafetynets','balconyinvisiblegrills','pigeonsafetynets','antibirdnets','windowinvisiblegrills','childrensafetynets','ductareasafetynets','kidssafetygrills','birdprotectionn','buildingsafetynets','stainlesssteelinvisiblegrills','constructionsafetynets','industrialsafetynets','staircasesafetynets','coconuttreenets','swimmingpoolsnets','birdspikes','cricketpracticenets'];
services.forEach((service, index) => { service.image = `assets/${serviceImages[index]}.png`; });
const serviceSelect = document.querySelector('#quote-service');

function renderServices(filter = 'all') {
  const displayed = services.filter(service => filter === 'all' || service.category === filter);
  serviceGrid.innerHTML = displayed.map((service, index) => `
    <article class="service-tile">
      <img class="service-photo" src="${service.image}" alt="${service.title} installation" loading="lazy" width="400" height="300" />
      <span class="tile-number">${String(index + 1).padStart(2, '0')}</span>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <button type="button" data-open-quote data-service="${service.title}">Ask about this <span>↗</span></button>
    </article>`).join('');
}

function fillServiceSelect() {
  serviceSelect.innerHTML += services.map(service => `<option value="${service.title}">${service.title}</option>`).join('');
}

renderServices();
fillServiceSelect();

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(tab => {
      tab.classList.remove('is-active');
      tab.setAttribute('aria-selected', 'false');
    });
    button.classList.add('is-active');
    button.setAttribute('aria-selected', 'true');
    renderServices(button.dataset.filter);
  });
});

const heroSlides = [...document.querySelectorAll('.hero-slide')];
const heroControls = [...document.querySelectorAll('[data-hero-control]')];
function setHeroSlide(index) {
  heroSlides.forEach((slide, slideIndex) => {
    const active = slideIndex === index;
    slide.classList.toggle('is-active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });
  heroControls.forEach((control, controlIndex) => {
    const active = controlIndex === index;
    control.classList.toggle('is-selected', active);
    control.setAttribute('aria-selected', String(active));
  });
}
heroControls.forEach(control => control.addEventListener('click', () => setHeroSlide(Number(control.dataset.heroControl))));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('is-open');
  nav.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuToggle.classList.remove('is-open');
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const modal = document.querySelector('#quote-modal');
const enquiry = document.querySelector('#enquiry-form');
function openQuote(service = '') {
  if (service) serviceSelect.value = service;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal-close').focus();
}
function closeQuote() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.addEventListener('click', event => {
  const quoteButton = event.target.closest('[data-open-quote]');
  if (quoteButton) openQuote(quoteButton.dataset.service);
  if (event.target.closest('[data-close-quote]')) closeQuote();
  if (event.target.closest('[data-focus-enquiry]')) {
    closeQuote();
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => enquiry.querySelector('input').focus(), 500);
  }
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeQuote(); });

document.querySelectorAll('.space-item').forEach(item => item.addEventListener('click', () => {
  document.querySelectorAll('.space-item').forEach(space => space.classList.remove('is-open'));
  item.classList.add('is-open');
  openQuote(`Advice for ${item.dataset.space}`);
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

window.addEventListener('scroll', () => document.querySelector('.site-header').classList.toggle('is-scrolled', window.scrollY > 12));
document.querySelector('#current-year').textContent = new Date().getFullYear();

enquiry.addEventListener('submit', event => {
  event.preventDefault();
  const name = new FormData(enquiry).get('name');
  const success = document.querySelector('#form-success');
  success.textContent = `Thanks, ${name}. Your enquiry is ready to be shared with Jayaram. Please call +91 91875 05144 or use WhatsApp to send it.`;
  success.hidden = false;
});
