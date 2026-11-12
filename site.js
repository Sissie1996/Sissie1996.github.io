(() => {
  'use strict';
  document.querySelectorAll('[data-year]').forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // Keep links to the former one-page homepage useful after the page split.
  if (document.body.dataset.page !== 'research') return;
  const previousSections = {
    '#publications': './publications.html',
    '#experience': './experience.html',
    '#about': './about.html',
    '#contact': './about.html#contact'
  };
  const followPreviousLink = () => {
    const destination = previousSections[window.location.hash.toLowerCase()];
    if (destination) window.location.replace(new URL(destination, window.location.href).href);
  };
  followPreviousLink();
  window.addEventListener('hashchange', followPreviousLink);
})();
