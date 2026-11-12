(() => {
  const hobbies = document.getElementById('ab-hobby-grid');
  const toggle = document.getElementById('ab-motion-toggle');
  if (!hobbies || !toggle) return;

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let userChoice = null;
  let playing = !preference.matches;

  const render = () => {
    // Keep the user’s play/pause choice when switching tabs; pause in the background.
    hobbies.dataset.motion = playing && !document.hidden ? 'running' : 'paused';
    hobbies.dataset.autoMotion = String(userChoice === null);
    toggle.textContent = playing ? 'Pause animations' : 'Play animations';
  };
  const syncPreference = () => {
    if (userChoice === null) playing = !preference.matches;
    render();
  };
  toggle.addEventListener('click', () => {
    playing = !playing;
    userChoice = playing;
    render();
  });
  preference.addEventListener('change', syncPreference);
  document.addEventListener('visibilitychange', render);
  toggle.hidden = false;
  syncPreference();
})();
