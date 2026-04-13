/**
 * main.js - v3.0
 * Loads member registry, renders iframe preview cards for members
 * with personal pages (hasPage: true in index.json), fallback avatar cards for others.
 *
 * How to add yourself:
 * 1. Create your page folder in public/pages/<your-id>/index.html
 * 2. Add your entry to public/members/index.json with "hasPage": true
 * 3. Submit a PR
 */

import './styles/index.css';

/* Build a preview card with iframe thumbnail */
function createPreviewCard(member) {
  const card = document.createElement('a');
  card.className = 'card card-preview';
  card.href = `/pages/${member.id}/index.html`;

  card.innerHTML =
    '<div class="card-iframe-wrapper">' +
      `<iframe src="/pages/${member.id}/index.html" tabindex="-1" loading="lazy"></iframe>` +
    '</div>' +
    `<p class="card-name">${member.name}</p>`;

  return card;
}

/* Build a fallback card with avatar initial (no page yet) */
function createFallbackCard(member) {
  const card = document.createElement('div');
  card.className = 'card card-fallback';

  const initial = member.name.charAt(0).toUpperCase();
  card.innerHTML =
    `<div class="card-avatar">${initial}</div>` +
    `<p class="card-name">${member.name}</p>` +
    '<p class="card-role">页面搭建中...</p>';

  return card;
}

/* Load member registry and render cards */
async function loadMembers() {
  const grid = document.getElementById('cardGrid');
  if (!grid) return;

  try {
    const res = await fetch('/members/index.json');
    const members = await res.json();

    members.forEach((member, i) => {
      const card = member.hasPage
        ? createPreviewCard(member)
        : createFallbackCard(member);

      card.style.transitionDelay = `${i * 100}ms`;
      grid.appendChild(card);
    });

    observeCards();
  } catch (err) {
    console.error('Failed to load members:', err);
  }
}

/* Intersection Observer for card entrance animations */
function observeCards() {
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  cards.forEach(card => observer.observe(card));
}

/* Navbar scroll shadow */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  });
}

/* Init */
initNavbar();
loadMembers();
