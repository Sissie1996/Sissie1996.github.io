(() => {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const verifiedLinks = {
    0: 'https://doi.org/10.1016/j.ergon.2026.104018',
    1: 'https://doi.org/10.1007/s12193-025-00455-2',
    2: 'https://www.mdpi.com/2079-9292/14/10/2052',
    3: 'https://www.mdpi.com/1424-8220/25/6/1760',
    5: 'https://doi.org/10.54941/ahfe100950',
    15: 'https://doi.org/10.1016/j.aei.2025.103223',
    16: 'https://doi.org/10.1007/s10055-022-00674-y'
  };
  const list = document.getElementById('publication-list');
  const papers = window.PUBLICATIONS || [];
  const isCV = document.body.dataset.page === 'cv';
  const figures = isCV ? {} : (window.PUBLICATION_FIGURES || {});
  let figureDialog;
  function showFigure(paperId) {
    const figure = figures[paperId];
    const paper = papers.find(p => p.id === Number(paperId));
    if (!figure || !paper) return;
    if (!figureDialog) {
      figureDialog = document.createElement('dialog');
      figureDialog.className = 'paper-figure-dialog';
      figureDialog.setAttribute('aria-labelledby', 'paper-figure-title');
      figureDialog.innerHTML = '<div class="figure-dialog-content"><header class="figure-dialog-header"><span class="eyebrow">FROM THE PAPER</span><button class="figure-dialog-close" type="button" aria-label="Close figure">Close <span aria-hidden="true">×</span></button></header><h2 id="paper-figure-title"></h2><div class="figure-dialog-image"><img alt=""></div><p class="figure-dialog-caption"></p><div class="figure-dialog-links"><a class="figure-original" target="_blank" rel="noopener noreferrer">Open full-resolution image ↗</a><a class="figure-source" target="_blank" rel="noopener noreferrer">View paper ↗</a></div></div>';
      document.body.append(figureDialog);
      figureDialog.querySelector('.figure-dialog-close').addEventListener('click', () => figureDialog.close());
      figureDialog.addEventListener('close', () => document.body.classList.remove('figure-open'));
      figureDialog.addEventListener('click', event => {
        if (event.target !== figureDialog) return;
        const bounds = figureDialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) figureDialog.close();
      });
    }
    figureDialog.querySelector('#paper-figure-title').textContent = paper.title;
    const image = figureDialog.querySelector('img');
    image.src = figure.full;
    image.alt = figure.caption;
    figureDialog.querySelector('.figure-dialog-caption').textContent = `Figure ${figure.number}. ${figure.caption}`;
    figureDialog.querySelector('.figure-original').href = figure.full;
    figureDialog.querySelector('.figure-source').href = figure.source;
    figureDialog.showModal();
    document.body.classList.add('figure-open');
  }
  if (list) list.addEventListener('click', event => {
    const button = event.target.closest('[data-paper-figure]');
    if (button) showFigure(button.dataset.paperFigure);
  });
  function renderPublications(filter) {
    if (!list) return;
    const visible = papers.filter(p => filter === 'selected' ? p.selected : filter === 'first' ? p.first : true).sort((a, b) => Number(b.year) - Number(a.year) || a.id - b.id);
    list.innerHTML = visible.map(p => {
      const authors = escape(p.authors.replace(/\*/g, '')).replace(/Xiaoxi Du|杜晓茜/g, '<strong>$&</strong>');
      const title = verifiedLinks[p.id] ? `<a href="${verifiedLinks[p.id]}" target="_blank" rel="noopener noreferrer">${escape(p.title)} <span aria-hidden="true">↗</span></a>` : escape(p.title);
      const figure = figures[p.id];
      const illustration = figure ? `<figure class="publication-figure"><button type="button" class="publication-figure-button" data-paper-figure="${p.id}" aria-label="Enlarge Figure ${figure.number}: ${escape(p.title)}"><img src="${escape(figure.thumbnail)}" width="${figure.width}" height="${figure.height}" alt="${escape(figure.caption)}" loading="lazy" decoding="async"><span class="figure-expand" aria-hidden="true">↗</span></button><figcaption>FIG. ${figure.number} <span aria-hidden="true">/</span> <a href="${escape(figure.source)}" target="_blank" rel="noopener noreferrer">PAPER ↗</a></figcaption></figure>` : '';
      return `<article class="publication-item"><span class="publication-year">${escape(p.year)}</span><div class="publication-content${figure ? ' with-figure' : ''}">${illustration}<div class="publication-copy"><h3>${title}</h3><p class="publication-authors">${authors}</p><p class="publication-venue">${escape(p.details)}</p></div></div><span class="publication-tag">${p.first ? 'FIRST AUTHOR' : 'COLLABORATION'}</span></article>`;
    }).join('');
    const count = document.getElementById('publication-count');
    if (count) count.textContent = `${visible.length} PAPERS`;
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(other => {
      const active = other === button;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    renderPublications(button.dataset.filter);
  }));
  renderPublications(isCV ? 'all' : 'selected');
  const printButton = document.getElementById('print-cv');
  if (printButton) printButton.addEventListener('click', () => window.print());

  const stage = document.getElementById('intent-stage');
  if (!stage) return;
  const target = document.getElementById('intent-target');
  const gaze = document.getElementById('gaze-line');
  const hand = document.getElementById('hand-line');
  const pupil = document.getElementById('pupil');
  const label = document.getElementById('target-label');
  const coordinate = document.getElementById('coordinate');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = {x: 358, y: 222};
  let destination = {...current};
  let frame = 0;
  function draw() {
    target.setAttribute('transform', `translate(${current.x.toFixed(2)} ${current.y.toFixed(2)})`);
    gaze.setAttribute('d', `M248 161L${current.x} ${current.y}`);
    hand.setAttribute('d', `M225 287Q${(225 + current.x) / 2} ${current.y - 48} ${current.x} ${current.y}`);
    const angle = Math.atan2(current.y - 155, current.x - 227);
    pupil.setAttribute('cx', (227 + Math.cos(angle) * 6).toFixed(2));
    pupil.setAttribute('cy', (155 + Math.sin(angle) * 6).toFixed(2));
    label.setAttribute('x', Math.min(445, current.x - 12));
    label.setAttribute('y', Math.min(448, current.y + 57));
    coordinate.textContent = `x ${(current.x / 520).toFixed(2)} / y ${(current.y / 490).toFixed(2)}`;
  }
  function animate() {
    frame = 0;
    current.x += (destination.x - current.x) * .14;
    current.y += (destination.y - current.y) * .14;
    draw();
    if (Math.abs(destination.x - current.x) + Math.abs(destination.y - current.y) > .2) frame = requestAnimationFrame(animate);
  }
  function move(x, y) {
    destination = {x: Math.max(60, Math.min(460, x)), y: Math.max(65, Math.min(405, y))};
    if (reducedMotion.matches) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      current = {...destination};
      draw();
    } else if (!frame) frame = requestAnimationFrame(animate);
  }
  function fromPointer(event) {
    const rect = document.getElementById('intent-svg').getBoundingClientRect();
    move((event.clientX - rect.left) / rect.width * 520, (event.clientY - rect.top) / rect.height * 490);
  }
  stage.addEventListener('pointermove', event => {if (event.pointerType !== 'touch') fromPointer(event);});
  stage.addEventListener('pointerdown', fromPointer);
  stage.addEventListener('keydown', event => {
    const directions = {ArrowLeft: [-18, 0], ArrowRight: [18, 0], ArrowUp: [0, -18], ArrowDown: [0, 18]};
    if (!directions[event.key]) return;
    event.preventDefault();
    const [dx, dy] = directions[event.key];
    move(destination.x + dx, destination.y + dy);
  });
})();
