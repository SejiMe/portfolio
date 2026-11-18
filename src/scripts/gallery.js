import {gsap} from 'gsap';
import {pageSize, pageCount, clampPage, regroupPage} from '../utils/gallery.mjs';

const root = document.querySelector('[data-gallery]');
const viewport = root.querySelector('.gallery-viewport');
const rail = root.querySelector('.cards');
const entries = Array.from(rail.children);
const controls = root.querySelector('.gallery-controls');
const previous = root.querySelector('[data-previous]');
const next = root.querySelector('[data-next]');
const status = root.querySelector('[data-page-status]');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let size = pageSize(innerWidth);
let current = 0;
let pages = [];
let tween;

function display(animate = true) {
  tween?.kill();
  gsap.killTweensOf(entries);
  const distance = current * viewport.clientWidth;
  const active = pages[current];
  pages.forEach((page,i) => {page.inert = i !== current;});
  previous.disabled = current === 0;
  next.disabled = current === pages.length - 1;
  status.textContent = 'Page ' + (current + 1) + ' of ' + pages.length;
  root.dataset.page = String(current);
  root.dataset.size = String(size);
  const duration = animate && !reduced.matches ? .32 : 0;
  tween = gsap.to(rail,{x:-distance,duration,ease:'power2.out',overwrite:true});
  gsap.fromTo(active.children,{opacity:.65,y:duration ? 6 : 0},{opacity:1,y:0,duration:duration ? .18 : 0,stagger:duration ? .025 : 0,overwrite:true});
}
function regroup() {
  const newSize = pageSize(innerWidth);
  current = regroupPage(current,size,newSize,entries.length);
  size = newSize;
  pages = [];
  for(let start = 0; start < entries.length; start += size) {
    const page = document.createElement('div');
    page.className = 'gallery-page';
    page.style.setProperty('--columns',String(size));
    page.append(...entries.slice(start,start+size));
    pages.push(page);
  }
  if (!pages.length) {
    const empty = document.createElement('div');
    empty.className = 'gallery-page';
    empty.textContent = 'More work is on the way.';
    pages.push(empty);
  }
  rail.replaceChildren(...pages);
  display(false);
}
function go(delta) {
  const index = clampPage(current+delta,entries.length,size);
  if (index === current) return;
  const hadFocus = rail.contains(document.activeElement);
  current = index;
  display();
  if(hadFocus) viewport.focus({preventScroll:true});
}
function blocked() {
  return !!document.querySelector('dialog[open],.mobile-nav[open]');
}
function canRead(delta) {
  const page = pages[current];
  return delta > 0
    ? page.scrollTop + page.clientHeight < page.scrollHeight - 2
    : page.scrollTop > 1;
}
root.classList.add('gallery-enhanced');
controls.hidden = false;
regroup();
previous.onclick = () => go(-1);
next.onclick = () => go(1);
let resizeFrame;
window.addEventListener('resize',()=>{
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(() => {
    if (pageSize(innerWidth) !== size) regroup();
    else display(false);
  });
});
reduced.addEventListener('change',()=>display(false));
let lastWheel = 0;
let total = 0;
let stepped = false;
viewport.addEventListener('wheel',event=>{
  if(blocked() || event.ctrlKey) return;
  const vertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
  const delta = (vertical ? event.deltaY : event.deltaX) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientHeight : 1);
  if(vertical && canRead(delta)) return;
  event.preventDefault();
  const now = performance.now();
  if(now-lastWheel>150){total=0;stepped=false;}
  lastWheel=now;
  total+=delta;
  if(!stepped && Math.abs(total)>=18){go(Math.sign(total));stepped=true;}
},{passive:false});
viewport.addEventListener('keydown',event=>{
  if(blocked() || event.ctrlKey || event.metaKey || event.altKey || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  go(event.key==='ArrowRight'?1:-1);
});
let touch;
viewport.addEventListener('touchstart',event=>{
  const point=event.touches[0];
  touch=event.touches.length===1 && !blocked() ? {x:point.clientX,y:point.clientY,top:pages[current].scrollTop} : null;
},{passive:true});
viewport.addEventListener('touchmove',event=>{
  if(!touch || event.touches.length!==1){touch=null;return;}
  const dx=touch.x-event.touches[0].clientX;
  const dy=touch.y-event.touches[0].clientY;
  if(Math.abs(dy)>Math.abs(dx) && (canRead(dy) || Math.abs(touch.top-pages[current].scrollTop)>2)) return;
  if(Math.max(Math.abs(dx),Math.abs(dy))>5 && event.cancelable) event.preventDefault();
},{passive:false});
viewport.addEventListener('touchcancel',()=>{touch=null;});
viewport.addEventListener('touchend',event=>{
  if(!touch || blocked()) return;
  const dx=touch.x-event.changedTouches[0].clientX;
  const dy=touch.y-event.changedTouches[0].clientY;
  const reading=Math.abs(dy)>Math.abs(dx) && (canRead(dy) || Math.abs(touch.top-pages[current].scrollTop)>2);
  touch=null;
  const delta=Math.abs(dx)>Math.abs(dy)?dx:dy;
  if(!reading && Math.abs(delta)>42) go(Math.sign(delta));
});
window.addEventListener('pagehide',()=>{
  tween?.kill();
  gsap.killTweensOf(entries);
  cancelAnimationFrame(resizeFrame);
});
