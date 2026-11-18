import { splashEligible } from '../utils/portfolio.mjs';
const overlay = document.querySelector('#entrance');
const shell = document.querySelector('#site-shell');
const logo = shell.querySelector('.brand');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let storage;
try { storage = window.sessionStorage; } catch {}
const historyReturn = performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
if (splashEligible({hash:location.hash, reduced:reduced.matches, historyReturn, storage})) {
  let finished = false;
  let timeline;
  const skip = overlay.querySelector('button');
  const controller = new AbortController();
  const options = { signal: controller.signal };
  const timer = setTimeout(finish, 3000);
  function finish(event) {
    if (finished) return;
    finished = true;
    const restoreFocus = overlay.contains(document.activeElement) || event?.currentTarget === skip;
    controller.abort();
    clearTimeout(timer);
    timeline?.kill();
    overlay.hidden = true;
    shell.inert = false;
    logo.style.removeProperty('opacity');
    document.documentElement.classList.remove('entering');
    try { storage.setItem('sej:intro','1'); } catch {}
    if (restoreFocus) document.querySelector('#intro h1').focus({preventScroll:true});
  }
  document.documentElement.classList.add('entering');
  logo.style.opacity = '0';
  shell.inert = true;
  overlay.hidden = false;
  skip.focus({ preventScroll:true });
  skip.addEventListener('click',finish,options);
  window.addEventListener('keydown',e=>{if(e.key==='Escape')finish();},options);
  reduced.addEventListener('change',e=>{if(e.matches)finish();},options);
  window.addEventListener('pagehide',finish,options);
  import('./ribbon-motion.js').then(({animateEntrance})=>{
    if (!finished) {
      timeline = animateEntrance(overlay,logo,finish);
      overlay.dataset.state = 'playing';
    }
  }).catch(finish);
}
