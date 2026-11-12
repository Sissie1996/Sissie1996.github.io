(() => {
  'use strict';
  const graphics = [...document.querySelectorAll('.interest-graphic')];
  if (!graphics.length) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const timers = new WeakMap();

  const stop = graphic => {
    clearTimeout(timers.get(graphic));
    graphic.classList.remove('is-animating');
  };
  const play = graphic => {
    if (reducedMotion.matches || document.hidden) return;
    stop(graphic);
    // Restart a finite animation when a visitor deliberately activates it again.
    void graphic.offsetWidth;
    graphic.classList.add('is-animating');
    timers.set(graphic, setTimeout(() => stop(graphic), 1800));
  };
  const syncMotionPreference = () => {
    graphics.forEach(graphic => {
      stop(graphic);
      graphic.disabled = reducedMotion.matches;
    });
  };
  graphics.forEach(graphic => {
    graphic.addEventListener('pointerenter', () => play(graphic));
    graphic.addEventListener('focus', () => play(graphic));
    graphic.addEventListener('click', () => play(graphic));
  });
  reducedMotion.addEventListener('change', syncMotionPreference);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) graphics.forEach(stop);
  });
  syncMotionPreference();
})();
