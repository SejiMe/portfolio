// Serialized into the homepage before the shell content is parsed.
export function beginEntrance(splashEligible) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const historyReturn = performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
  let storage;
  try { storage = window.sessionStorage; } catch {}
  if (!splashEligible({hash:location.hash, reduced:reduced.matches, historyReturn, storage})) return;

  const overlay = document.querySelector('#entrance');
  const shell = document.querySelector('#site-shell');
  const skip = overlay.querySelector('button');
  const root = document.documentElement;
  const controller = new AbortController();
  const options = {signal:controller.signal};
  const entrance = {finish, timeline:null};
  const timer = setTimeout(finish, 3000);

  function finish(event) {
    if (overlay.entrance !== entrance) return;
    delete overlay.entrance;
    const restoreFocus = overlay.contains(document.activeElement) || event?.currentTarget === skip;
    controller.abort();
    clearTimeout(timer);
    entrance.timeline?.kill();
    overlay.hidden = true;
    shell.inert = false;
    shell.querySelector('.brand')?.style.removeProperty('opacity');
    root.classList.remove('entering');
    try { storage.setItem('sej:intro','1'); } catch {}
    if (restoreFocus) {
      const heading = document.querySelector('#intro h1');
      if (heading) heading.focus({preventScroll:true});
      else if (document.readyState === 'loading') {
        document.addEventListener('readystatechange',()=>{
          const active = document.activeElement;
          if (active === document.body || overlay.contains(active)) document.querySelector('#intro h1')?.focus({preventScroll:true});
        },{once:true});
      }
    }
  }

  overlay.entrance = entrance;
  root.classList.add('entering');
  shell.inert = true;
  overlay.hidden = false;
  skip.focus({preventScroll:true});
  skip.addEventListener('click',finish,options);
  window.addEventListener('keydown',e=>{if(e.key==='Escape')finish();},options);
  reduced.addEventListener('change',e=>{if(e.matches)finish();},options);
  window.addEventListener('pagehide',finish,options);
}
