(() => {
  'use strict';
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const verifiedLinks = {
    0: 'https://doi.org/10.1016/j.ergon.2026.104018',
    1: 'https://doi.org/10.1007/s12193-025-00455-2',
    2: 'https://www.mdpi.com/2079-9292/14/10/2052',
    3: 'https://www.mdpi.com/1424-8220/25/6/1760',
    4: 'https://doi.org/10.1007/978-3-031-05409-9_3',
    5: 'https://doi.org/10.54941/ahfe100950',
    6: 'https://doi.org/10.3390/s24154809',
    7: 'https://doi.org/10.1002/hfm.20979',
    8: 'https://doi.org/10.1007/978-3-031-61351-7_16',
    9: 'https://doi.org/10.1007/978-3-031-61351-7_15',
    12: 'https://doi.org/10.54941/ahfe100948',
    13: 'https://doi.org/10.1080/00140139.2026.2685314',
    14: 'https://doi.org/10.1093/iwc/iwaf053',
    15: 'https://doi.org/10.1016/j.aei.2025.103223',
    16: 'https://doi.org/10.1007/s10055-022-00674-y',
    17: 'https://doi.org/10.1109/IEEM58616.2023.10406981',
    18: 'https://doi.org/10.1088/1742-6596/1748/6/062010',
    19: 'https://doi.org/10.1080/10447318.2024.2362486',
    20: 'https://doi.org/10.3390/ijerph192114477',
    21: 'https://doi.org/10.1109/ISCAIT64916.2025.11010651',
    22: 'https://doi.org/10.1007/978-3-030-80091-8_120',
    23: 'https://www.mdpi.com/2220-9964/11/11/574'
  };
  const referenceLinks = {
    10: {url: 'https://www.proceedings.com/content/072/072579webtoc.pdf#page=6', label: 'Proceedings index'},
    11: {url: 'https://www.proceedings.com/content/072/072579webtoc.pdf#page=5', label: 'Proceedings index'},
    24: {url: 'https://me.seu.edu.cn/2020/1231/c31182a358531/pagem2.htm', label: 'Publication record'}
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
    figureDialog.style.setProperty('--figure-aspect', String(figure.width / figure.height));
    figureDialog.style.removeProperty('--figure-native-width');
    const image = figureDialog.querySelector('img');
    image.onload = () => figureDialog.style.setProperty('--figure-native-width', `${image.naturalWidth}px`);
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
    const compact = filter === 'all' && !isCV;
    const showDetails = filter !== 'all';
    const visible = papers.filter(p => filter === 'selected' ? p.selected : filter === 'first' ? p.first : true).sort((a, b) => Number(b.year) - Number(a.year) || a.id - b.id);
    list.innerHTML = visible.map(p => {
      const authors = escape(p.authors)
        .replace(/Xiaoxi Du|杜晓茜/g, '<strong>$&</strong>')
        .replace(/\*/g, compact ? '<sup class="publication-corresponding"><abbr title="Corresponding author">*</abbr></sup>' : '');
      const paperUrl = verifiedLinks[p.id];
      const title = paperUrl ? `<a href="${escape(paperUrl)}" target="_blank" rel="noopener noreferrer">${escape(p.title)} <span aria-hidden="true">↗</span></a>` : escape(p.title);
      if (compact) {
        const reference = referenceLinks[p.id];
        const referenceLink = reference ? `<a class="publication-reference" href="${escape(reference.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(reference.label)} for ${escape(p.title)}">${escape(reference.label)} <span aria-hidden="true">↗</span></a>` : '';
        return `<article class="publication-item publication-item-compact"><time class="publication-year" datetime="${escape(p.year)}">${escape(p.year)}</time><div class="publication-copy"><h3>${title}</h3><p class="publication-authors">${authors}</p>${referenceLink}</div></article>`;
      }
      const figure = showDetails ? figures[p.id] : undefined;
      const summary = showDetails && p.summary ? `<p class="publication-summary">${escape(p.summary)}</p>` : '';
      const figureLayout = figure ? ` style="--figure-aspect:${figure.width / figure.height}"` : '';
      const illustration = figure ? `<figure class="publication-figure"><button type="button" class="publication-figure-button" data-paper-figure="${p.id}" aria-label="Enlarge Figure ${figure.number}: ${escape(p.title)}"><img src="${escape(figure.thumbnail)}" width="${figure.width}" height="${figure.height}" alt="${escape(figure.caption)}" loading="lazy" decoding="async"><span class="figure-expand" aria-hidden="true">↗</span></button><figcaption>FIG. ${figure.number} <span aria-hidden="true">/</span> <a href="${escape(figure.source)}" target="_blank" rel="noopener noreferrer">PAPER ↗</a></figcaption></figure>` : '';
      return `<article class="publication-item"><span class="publication-year">${escape(p.year)}</span><div class="publication-content${figure ? ' with-figure' : ''}"${figureLayout}>${illustration}<div class="publication-copy"><h3>${title}</h3><p class="publication-authors">${authors}</p><p class="publication-venue">${escape(p.details)}</p>${summary}</div></div><span class="publication-tag">${p.first ? 'FIRST AUTHOR' : 'COLLABORATION'}</span></article>`;
    }).join('');
    const count = document.getElementById('publication-count');
    if (count) count.textContent = `${visible.length} PAPERS`;
    const correspondingNote = document.getElementById('publication-corresponding-note');
    if (correspondingNote) correspondingNote.hidden = !compact;
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
  const svg = document.getElementById('intent-svg');
  const target = document.getElementById('intent-target');
  const gaze = document.getElementById('gaze-line');
  const handLine = document.getElementById('hand-line');
  const handFigure = document.getElementById('hand-figure');
  const pupil = document.getElementById('pupil');
  const label = document.getElementById('target-label');
  const coordinate = document.getElementById('coordinate');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fingertip = {x: 264, y: 252};
  const wrist = {x: 175, y: 397};
  const fingerHeading = Math.atan2(-48, 57);
  const restPose = {x: 0, y: 0, angle: 0};
  const handBounds = handFigure.getBBox();
  const handCorners = [
    [handBounds.x, handBounds.y],
    [handBounds.x + handBounds.width, handBounds.y],
    [handBounds.x, handBounds.y + handBounds.height],
    [handBounds.x + handBounds.width, handBounds.y + handBounds.height]
  ];
  const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
  const angleDifference = (from, to) => Math.atan2(Math.sin(to - from), Math.cos(to - from));
  let current = {x: 358, y: 222};
  let destination = {...current};
  let handPose = {...restPose};
  let interacting = false;
  let lastInputTime = 0;
  let lastFrameTime = 0;
  let frame = 0;

  // Fit the rotated hand within the drawing, including while it turns or retracts.
  function fitHand(pose) {
    const cosine = Math.cos(pose.angle);
    const sine = Math.sin(pose.angle);
    const corners = handCorners.map(([x, y]) => ({
      x: fingertip.x + (x - fingertip.x) * cosine - (y - fingertip.y) * sine,
      y: fingertip.y + (x - fingertip.x) * sine + (y - fingertip.y) * cosine
    }));
    return {
      x: clamp(pose.x, 20 - Math.min(...corners.map(point => point.x)), 500 - Math.max(...corners.map(point => point.x))),
      y: clamp(pose.y, 20 - Math.min(...corners.map(point => point.y)), 466 - Math.max(...corners.map(point => point.y))),
      angle: pose.angle
    };
  }

  function reachPose() {
    const direction = Math.atan2(destination.y - wrist.y, destination.x - wrist.x);
    return fitHand({
      x: destination.x - Math.cos(direction) * 44 - fingertip.x,
      y: destination.y - Math.sin(direction) * 44 - fingertip.y,
      angle: direction - fingerHeading
    });
  }

  function draw() {
    target.setAttribute('transform', `translate(${current.x.toFixed(2)} ${current.y.toFixed(2)})`);
    const angle = Math.atan2(current.y - 155, current.x - 227);
    gaze.setAttribute('d', `M${227 + Math.cos(angle) * 17} ${155 + Math.sin(angle) * 17}L${current.x} ${current.y}`);
    pupil.setAttribute('cx', (227 + Math.cos(angle) * 6).toFixed(2));
    pupil.setAttribute('cy', (155 + Math.sin(angle) * 6).toFixed(2));
    handFigure.setAttribute('transform', `translate(${handPose.x.toFixed(2)} ${handPose.y.toFixed(2)}) rotate(${(handPose.angle * 180 / Math.PI).toFixed(2)} ${fingertip.x} ${fingertip.y})`);
    const tipX = fingertip.x + handPose.x;
    const tipY = fingertip.y + handPose.y;
    const deltaX = current.x - tipX;
    const deltaY = current.y - tipY;
    const distance = Math.hypot(deltaX, deltaY);
    const bend = Math.min(28, distance * .18) / Math.max(1, distance);
    handLine.setAttribute('d', `M${tipX} ${tipY}Q${(tipX + current.x) / 2 + deltaY * bend} ${(tipY + current.y) / 2 - deltaX * bend} ${current.x} ${current.y}`);
    label.setAttribute('x', current.x);
    label.setAttribute('y', Math.min(448, current.y + 57));
    coordinate.textContent = `x ${(current.x / 520).toFixed(2)} / y ${(current.y / 490).toFixed(2)}`;
  }

  function animate(time) {
    frame = 0;
    const elapsed = Math.min(50, time - lastFrameTime);
    lastFrameTime = time;
    const waiting = interacting && time - lastInputTime < 250;
    const goal = interacting && !waiting ? reachPose() : restPose;
    const targetEase = 1 - Math.exp(-elapsed / 70);
    const handEase = 1 - Math.exp(-elapsed / 150);
    current.x += (destination.x - current.x) * targetEase;
    current.y += (destination.y - current.y) * targetEase;
    handPose = fitHand({
      x: handPose.x + (goal.x - handPose.x) * handEase,
      y: handPose.y + (goal.y - handPose.y) * handEase,
      angle: handPose.angle + angleDifference(handPose.angle, goal.angle) * handEase
    });
    const targetError = Math.hypot(destination.x - current.x, destination.y - current.y);
    const handError = Math.hypot(goal.x - handPose.x, goal.y - handPose.y);
    const rotationError = Math.abs(angleDifference(handPose.angle, goal.angle));
    const moving = targetError > .05 || handError > .05 || rotationError > .0005;
    if (!waiting && !moving) {
      current = {...destination};
      handPose = {...goal};
    }
    draw();
    if (waiting || moving) frame = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (reducedMotion.matches) {
      cancelAnimationFrame(frame);
      frame = 0;
      current = {...destination};
      handPose = {...restPose};
      draw();
    } else if (!frame) {
      lastFrameTime = performance.now();
      frame = requestAnimationFrame(animate);
    }
  }

  function move(x, y) {
    destination = {x: clamp(x, 60, 460), y: clamp(y, 65, 405)};
    interacting = true;
    lastInputTime = performance.now();
    startAnimation();
  }

  function relaxHand() {
    interacting = false;
    startAnimation();
  }

  function fromPointer(event) {
    if (!event.isPrimary) return;
    const rect = svg.getBoundingClientRect();
    move((event.clientX - rect.left) / rect.width * 520, (event.clientY - rect.top) / rect.height * 490);
  }

  svg.addEventListener('pointermove', event => {if (event.pointerType !== 'touch') fromPointer(event);});
  svg.addEventListener('pointerdown', fromPointer);
  svg.addEventListener('pointerleave', event => {if (event.pointerType !== 'touch') relaxHand();});
  svg.addEventListener('pointercancel', relaxHand);
  stage.addEventListener('blur', relaxHand);
  reducedMotion.addEventListener('change', startAnimation);
  document.addEventListener('visibilitychange', () => {if (document.hidden) relaxHand();});
  stage.addEventListener('keydown', event => {
    const directions = {ArrowLeft: [-18, 0], ArrowRight: [18, 0], ArrowUp: [0, -18], ArrowDown: [0, 18]};
    if (!directions[event.key]) return;
    event.preventDefault();
    const [dx, dy] = directions[event.key];
    move(destination.x + dx, destination.y + dy);
  });
  draw();
})();
