(() => {
  const opening = document.getElementById('site-opening');
  if (!opening) return;

  const holdsOpening = document.documentElement.classList.contains('site-opening-hold');
  if (!holdsOpening || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    opening.remove();
    return;
  }

  const images = [...opening.querySelectorAll('.opening-montage img')];
  const paths = [...opening.querySelectorAll('.opening-logo-paths > *')];
  const skip = opening.querySelector('.opening-skip');
  const timers = [];
  let dispatched = false;

  function schedule(callback, delay) {
    timers.push(setTimeout(callback, delay));
  }

  function dispatchHomepageIntro() {
    if (dispatched) return;
    dispatched = true;
    document.documentElement.classList.remove('site-opening-hold');
    dispatchEvent(new CustomEvent('qivenn:home-intro'));
  }

  function measurePaths() {
    paths.forEach(path => {
      const matrix = path.getScreenCTM();
      const scale = matrix ? Math.hypot(matrix.a, matrix.b) : 1;
      path.style.setProperty('--draw-length', `${Math.ceil(path.getTotalLength() * scale) + 3}`);
    });
  }

  function playOpening() {
    measurePaths();
    opening.classList.add('is-run');
    schedule(() => opening.classList.add('is-filled'), 5750);
    schedule(() => opening.classList.add('is-finished'), 9870);
    schedule(dispatchHomepageIntro, 10750);
  }

  function skipOpening() {
    timers.forEach(clearTimeout);
    opening.classList.remove('is-run', 'is-filled');
    opening.classList.add('is-skipping');
    schedule(() => opening.classList.add('is-finished'), 980);
    schedule(dispatchHomepageIntro, 1080);
  }

  function waitForAsset(image) {
    if (image.complete && image.naturalWidth) {
      return image.decode ? image.decode().catch(() => {}) : Promise.resolve();
    }
    return new Promise(resolve => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    }).then(() => image.decode ? image.decode().catch(() => {}) : undefined);
  }

  skip.addEventListener('click', skipOpening);
  const assetsReady = Promise.all(images.map(waitForAsset));
  Promise.race([assetsReady, new Promise(resolve => setTimeout(resolve, 180))])
    .then(() => requestAnimationFrame(() => requestAnimationFrame(playOpening)));
})();
