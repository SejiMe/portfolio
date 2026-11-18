import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
gsap.registerPlugin(MorphSVGPlugin);
export function animateEntrance(overlay, logo, finish) {
  const pieces = Array.from(overlay.querySelectorAll('[data-ribbon]'));
  const timeline = gsap.timeline({ onComplete: finish });
  timeline.to(pieces, { x: i => [-16,-6,8,16][i], duration: .25, ease: 'power2.out' }, .30);
  for (const piece of pieces) {
    timeline.to(piece, { x: 0, morphSVG: overlay.querySelector('#letter-' + piece.dataset.ribbon), duration: .65, ease: 'power2.inOut' }, .55);
  }
  timeline.to(overlay,{opacity:0,duration:.25},1.4);
  timeline.to(logo,{opacity:1,duration:.2},1.65);
  return timeline;
}
