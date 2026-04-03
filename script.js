const typingEl = document.querySelector('.typing');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');
const reveals = document.querySelectorAll('.reveal');

let words = [];
try {
  words = JSON.parse(typingEl.dataset.words);
} catch {
  words = ["Deep Learning", "Machine Learning", "Computer Vision"];
}

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];
  if (!deleting) {
    typingEl.textContent = currentWord.slice(0, charIndex++);
    if (charIndex > currentWord.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    typingEl.textContent = currentWord.slice(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.18 });

reveals.forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav a[href="#${id}"]`);
    if (scrollY >= top && scrollY < top + height && navLink) {
      navLinks.forEach(a => a.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
});
