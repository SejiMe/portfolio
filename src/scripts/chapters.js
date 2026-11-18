import { chapters, chapterIndex, advance } from '../utils/portfolio.mjs';

const gallery = document.querySelector('.exhibition');
const panels = Array.from(gallery.querySelectorAll('.chapter'));
const pager = document.querySelector('.pager');
const menu = document.querySelector('.mobile-nav');
const links = document.querySelectorAll('[data-chapter]');
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
let current = Math.max(0, chapterIndex(location.hash));

function render(index, focus = false) {
  const moveFocus = focus || panels[current].contains(document.activeElement);
  current = index;
  gallery.style.setProperty('--chapter', String(current));
  panels.forEach((panel, i) => { panel.inert = i !== current; });
  for (const link of links) {
    if (link.dataset.chapter === chapters[current]) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  prev.disabled = current === 0;
  next.disabled = current === chapters.length - 1;
  document.querySelector('#position').textContent = String(current + 1).padStart(2, '0') + ' / 05';
  document.querySelector('#current-chapter').textContent = chapters[current][0].toUpperCase() + chapters[current].slice(1);
  if (moveFocus) {
    const heading = panels[current].querySelector('h1,h2');
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

function navigate(index, focus = false) {
  menu.open = false;
  if (index !== current) {
    gallery.classList.add('chapter-navigation');
    history.pushState(null, '', '#' + chapters[index]);
    render(index, focus);
  }
}
document.documentElement.classList.add('horizontal');
pager.hidden = false;
render(current);
window.scrollTo(0, 0);
document.addEventListener('click', event => {
  const link = event.target.closest('a[href]');
  if (!link || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
  const target = new URL(link.href);
  const index = chapterIndex(target.hash);
  if (target.origin === location.origin && target.pathname.replace(/\/$/,'') === location.pathname.replace(/\/$/,'') && index >= 0) {
    event.preventDefault();
    navigate(index, true);
  }
});
window.addEventListener('popstate', () => render(Math.max(0,chapterIndex(location.hash))));
window.addEventListener('hashchange', () => render(Math.max(0,chapterIndex(location.hash))));
prev.onclick = () => navigate(advance(current,-1));
next.onclick = () => navigate(advance(current,1));
function blocked() {
  return menu.open || document.querySelector('dialog[open]') || document.querySelector('#site-shell').inert;
}
document.addEventListener('keydown', event => {
  if (blocked() || event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input,textarea,select,[contenteditable]')) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    navigate(advance(current,event.key === 'ArrowRight' ? 1 : -1), true);
  }
});

function canRead(delta) {
  const panel = panels[current];
  return delta > 0 ? panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2 : panel.scrollTop > 1;
}
let lastWheel = 0;
let accumulated = 0;
let stepped = false;
gallery.addEventListener('wheel', event => {
  if (event.ctrlKey || blocked()) return;
  const vertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
  const delta = (vertical ? event.deltaY : event.deltaX) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? gallery.clientHeight : 1);
  if (vertical && canRead(delta)) return;
  event.preventDefault();
  const now = performance.now();
  if (now - lastWheel > 150) { accumulated = 0; stepped = false; }
  lastWheel = now;
  accumulated += delta;
  if (!stepped && Math.abs(accumulated) >= 18) {
    navigate(advance(current, accumulated));
    stepped = true;
  }
}, { passive: false });

let touch;
gallery.addEventListener('touchstart', event => {
  const point = event.touches[0];
  touch = event.touches.length === 1 && !blocked() ? { x: point.clientX, y: point.clientY, top: panels[current].scrollTop } : null;
}, { passive: true });
gallery.addEventListener('touchmove', event => {
  if (!touch || event.touches.length !== 1) { touch = null; return; }
  const dx = touch.x - event.touches[0].clientX;
  const dy = touch.y - event.touches[0].clientY;
  if (Math.abs(dy) > Math.abs(dx) && (canRead(dy) || Math.abs(touch.top - panels[current].scrollTop) > 2)) return;
  if (Math.max(Math.abs(dx),Math.abs(dy)) > 5 && event.cancelable) event.preventDefault();
}, { passive: false });
gallery.addEventListener('touchcancel', () => { touch = null; });
gallery.addEventListener('touchend', event => {
  if (!touch || blocked()) return;
  const dx = touch.x - event.changedTouches[0].clientX;
  const dy = touch.y - event.changedTouches[0].clientY;
  const reading = Math.abs(dy) > Math.abs(dx) && (canRead(dy) || Math.abs(touch.top - panels[current].scrollTop) > 2);
  const delta = Math.abs(dx) > Math.abs(dy) ? dx : dy;
  touch = null;
  if (!reading && Math.abs(delta) >= 42) navigate(advance(current,delta));
});
