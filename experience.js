(() => {
  const viewer = document.getElementById('project-image-viewer');
  if (!viewer || typeof viewer.showModal !== 'function') return;
  const image = document.getElementById('xp-dialog-image');
  const title = document.getElementById('xp-dialog-title');
  const caption = document.getElementById('xp-dialog-caption');
  const original = document.getElementById('xp-original-link');
  let trigger = null;

  document.querySelectorAll('[data-project-image]').forEach(link => {
    link.addEventListener('click', event => {
      // Preserve native link behavior for opening an image in a new tab.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = link;
      const preview = link.querySelector('img');
      title.textContent = link.closest('article').querySelector('h3').textContent;
      caption.textContent = preview.alt;
      image.alt = preview.alt;
      image.src = link.href;
      original.href = link.dataset.original || link.href;
      viewer.showModal();
      document.body.classList.add('xp-viewer-open');
    });
  });
  viewer.querySelector('.xp-dialog-close').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    const rect = viewer.getBoundingClientRect();
    if (event.target === viewer && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) viewer.close();
  });
  viewer.addEventListener('close', () => {
    document.body.classList.remove('xp-viewer-open');
    if (trigger?.isConnected) trigger.focus({preventScroll:true});
  });
})();
