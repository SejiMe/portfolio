const header = document.querySelector('.mast');
let timer;
function activity() {
  header.classList.add('scroll-faded');
  clearTimeout(timer);
  timer = setTimeout(() => header.classList.remove('scroll-faded'), 700);
}
document.addEventListener('scroll', activity, {capture:true, passive:true});
document.addEventListener('wheel', activity, {passive:true});
document.addEventListener('touchmove', activity, {passive:true});
window.addEventListener('pagehide', () => clearTimeout(timer));
