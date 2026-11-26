const overlay = document.querySelector('#entrance');
const entrance = overlay.entrance;
if (entrance) {
  import('./ribbon-motion.js').then(({animateEntrance})=>{
    if (overlay.entrance !== entrance) return;
    entrance.timeline = animateEntrance(overlay,document.querySelector('#site-shell .brand'),entrance.finish);
    overlay.dataset.state = 'playing';
  }).catch(entrance.finish);
}
