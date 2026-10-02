(() => {
  const data = window.APP_DATA;
  const app = document.getElementById('app');
  const progressKey = 'app28d-es-progress-v1';
  const launchedKey = 'app28d-es-open-videos-v1';

  const paths = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    journey: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M8 2.5v4M16 2.5v4M3 9.5h18M8 13h3M8 16.5h7"/>',
    gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8H7.5a2.5 2.5 0 1 1 2.5-2c0 1.1.9 2 2 2Zm0 0h4.5a2.5 2.5 0 1 0-2.5-2c0 1.1-.9 2-2 2Z"/>',
    heart: '<path d="M20.8 8.8c0 5.5-8.8 11-8.8 11s-8.8-5.5-8.8-11a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z"/>',
    progress: '<path d="M4 19V5M4 19h17"/><path d="m7 15 4-4 3 2 6-7"/>',
    back: '<path d="m15 18-6-6 6-6M9 12h12"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    play: '<path d="m8 5 11 7-11 7z"/>',
    playFill: '<path d="M7 4.8a1 1 0 0 1 1.5-.86l10.3 7.2a1 1 0 0 1 0 1.72l-10.3 7.2A1 1 0 0 1 7 19.2z" fill="currentColor" stroke="none"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    lock: '<rect x="4.5" y="10" width="15" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sparkle: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm7 12 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>',
    leaf: '<path d="M20.5 3.5C11 3.5 5 6 4 12c-.8 4.5 2.5 7.5 6.5 7 6-.7 8.5-7 10-15.5Z"/><path d="M3 21c3-5 7-8 13-11"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
  };
  const icon = (name, size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`;

  const state = {
    screen: 'home',
    day: null,
    bonus: null,
    completed: readCompleted(),
    openVideos: readOpenVideos(),
  };

  function readCompleted() {
    try { return new Set(JSON.parse(localStorage.getItem(progressKey) || '[]')); }
    catch { return new Set(); }
  }
  function readOpenVideos() {
    try { return new Set(JSON.parse(sessionStorage.getItem(launchedKey) || '[]')); }
    catch { return new Set(); }
  }
  function saveCompleted() { localStorage.setItem(progressKey, JSON.stringify([...state.completed])); }
  function saveOpenVideos() { sessionStorage.setItem(launchedKey, JSON.stringify([...state.openVideos])); }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  }
  function percent() { return Math.round((state.completed.size / data.days.length) * 100); }
  function nextDay() { return data.days.find((day) => !state.completed.has(day.day)) || data.days[data.days.length - 1]; }
  function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function navigate(screen) {
    state.screen = screen;
    state.day = null;
    state.bonus = null;
    scrollTop();
    render();
  }
  function openDay(dayNumber) {
    const selected = data.days.find((item) => item.day === Number(dayNumber));
    if (!selected) return;
    state.day = selected;
    state.bonus = null;
    state.screen = 'day';
    scrollTop();
    render();
  }
  function activeScreen(id) {
    if (state.screen === 'day') return id === 'journey';
    if (state.screen === 'bonus-detail') return id === 'bonuses';
    return state.screen === id;
  }
  function navItem(id, label, iconName, className = 'nav-item') {
    const active = activeScreen(id);
    return `<button type="button" class="${className}${active ? ' is-active' : ''}" data-action="navigate" data-screen="${id}" aria-current="${active ? 'page' : 'false'}">${icon(iconName, 19)}<span>${label}</span></button>`;
  }
  function siteHeader() {
    return `<header class="site-header">
      <button type="button" class="brand-link" data-action="navigate" data-screen="home" aria-label="Ir al inicio">
        <img src="assets/logo.png" alt="" class="brand-mark" />
        <span class="brand-name">App de Botox <b>Coreano</b><small>Ritual facial · 28 días</small></span>
      </button>
      <nav class="desktop-nav" aria-label="Navegación principal">
        ${navItem('home', 'Inicio', 'home', 'desktop-link')}
        ${navItem('journey', 'La jornada', 'journey', 'desktop-link')}
        ${navItem('bonuses', 'Complementos', 'gift', 'desktop-link')}
        ${navItem('motivation', 'Inspiración', 'heart', 'desktop-link')}
        ${navItem('progress', 'Mi avance', 'progress', 'desktop-link')}
      </nav>
      <span class="open-access">${icon('sparkle', 14)} Acceso directo <b>sin cuenta</b></span>
    </header>`;
  }
  function mobileNav() {
    return `<nav class="mobile-nav" aria-label="Navegación principal">
      ${navItem('home', 'Inicio', 'home')}
      ${navItem('journey', 'Jornada', 'journey')}
      ${navItem('bonuses', 'Extras', 'gift')}
      ${navItem('motivation', 'Inspiración', 'heart')}
      ${navItem('progress', 'Mi avance', 'progress')}
    </nav>`;
  }
  function footer() {
    return `<footer class="site-footer"><span>App de Botox Coreano · 28 días</span><span>Sin registro · tu avance queda guardado en este dispositivo</span></footer>`;
  }
  function pageShell(content) {
    app.innerHTML = `<div class="site-shell">${siteHeader()}<main class="page">${content}</main>${footer()}${mobileNav()}</div>`;
  }
  function screenHead(title, backScreen = 'home', overline = '') {
    return `<header class="screen-head">
      <button type="button" class="back-button" data-action="navigate" data-screen="${backScreen}" aria-label="Volver">${icon('back', 20)}</button>
      <div>${overline ? `<p class="eyebrow">${overline}</p>` : ''}<h1>${escapeHtml(title)}</h1></div>
    </header>`;
  }

  function renderHome() {
    const pct = percent();
    const next = nextDay();
    const completed = state.completed.size;
    return `<div class="home-layout">
      <section class="home-hero">
        <div class="hero-copy">
          <p class="eyebrow eyebrow-light"><span></span> Una pausa para volver a ti</p>
          <h1>Solo con esto puedes <em>mejorar muchísimo tu cara.</em></h1>
          <p class="hero-description">Una jornada de movimientos faciales guiados para acompañar tu rutina, día a día y a tu propio ritmo.</p>
          <div class="hero-actions">
            <button type="button" class="button button-light" data-action="open-day" data-day="${next.day}">${icon('playFill', 16)} ${completed === 28 ? 'Repetir el día 28' : `Empezar el día ${next.day}`}</button>
            <button type="button" class="text-action" data-action="navigate" data-screen="journey">Explorar los 28 días ${icon('arrow', 16)}</button>
          </div>
          <div class="hero-assurance">${icon('check', 15)} No hace falta crear una cuenta</div>
        </div>
        <div class="hero-art" aria-hidden="true">
          <div class="art-orbit art-orbit-one"></div><div class="art-orbit art-orbit-two"></div>
          <div class="art-sun"></div>
          <div class="art-medallion"><img src="assets/logo.png" alt="" /><span>28 DÍAS</span></div>
          <div class="art-seal">TU MOMENTO<br />DE CUIDADO</div>
          <span class="art-side-note">RITUAL FACIAL · A TU RITMO</span>
        </div>
        <div class="hero-index"><span>01</span><i></i><span>28</span></div>
      </section>

      <section class="home-overview" aria-label="Resumen de tu jornada">
        <article class="progress-card">
          <div class="card-heading"><div><p class="eyebrow">Tu recorrido</p><h2>Un día a la vez</h2></div><span class="card-icon">${icon('progress', 18)}</span></div>
          <div class="progress-content"><div class="progress-ring" style="--progress:${pct}%"><span><b>${pct}%</b><small>avance</small></span></div><div class="progress-copy"><strong>${completed} de 28 <span>días</span></strong><p>Tu progreso se guarda únicamente en este navegador.</p></div></div>
          <div class="progress-track" role="progressbar" aria-label="Avance de la jornada" aria-valuemin="0" aria-valuemax="28" aria-valuenow="${completed}"><span style="width:${pct}%"></span></div>
        </article>
        <button type="button" class="next-card" data-action="open-day" data-day="${next.day}">
          <span class="next-card-top"><span class="eyebrow">Tu siguiente paso</span><span class="next-day-number">${String(next.day).padStart(2, '0')}</span></span>
          <span class="next-card-title">${escapeHtml(next.title)}</span>
          <span class="next-card-description">${escapeHtml(next.description)}</span>
          <span class="next-card-link">${completed === 28 ? 'Volver a practicar' : 'Continuar mi rutina'} ${icon('arrow', 16)}</span>
        </button>
      </section>

      <section class="home-facts" aria-label="Sobre la jornada">
        <div><span class="fact-number">28</span><span class="fact-label">días guiados</span></div>
        <div><span class="fact-number">04</span><span class="fact-label">movimientos por día</span></div>
        <div><span class="fact-number">0</span><span class="fact-label">cuentas por crear</span></div>
      </section>

      <section class="home-section journey-preview">
        <div class="section-heading"><div><p class="eyebrow">La secuencia completa</p><h2>Tu jornada, paso a paso</h2></div><button type="button" class="inline-link" data-action="navigate" data-screen="journey">Ver los 28 días ${icon('arrow', 16)}</button></div>
        <div class="journey-preview-grid">${data.days.slice(0, 3).map((day) => `<button type="button" class="preview-day${day.day === next.day ? ' is-next' : ''}" data-action="open-day" data-day="${day.day}"><span class="preview-day-number">${String(day.day).padStart(2, '0')}</span><span class="preview-day-copy"><b>${escapeHtml(day.title)}</b><small>${day.classes.length} movimientos guiados</small></span>${icon('arrow', 17)}</button>`).join('')}</div>
      </section>

      <section class="home-section complementary-section">
        <div class="section-heading"><div><p class="eyebrow">A tu ritmo</p><h2>Un ritual sencillo, sin complicaciones</h2></div></div>
        <div class="welcome-note"><span>${icon('leaf', 22)}</span><p>Explora la jornada, consulta la explicación de cada movimiento antes del video y vuelve cuando quieras. <strong>No necesitas iniciar sesión.</strong></p><button type="button" class="button button-dark" data-action="navigate" data-screen="bonuses">Ver material complementario ${icon('arrow', 16)}</button></div>
      </section>

      <section class="extra-section"><div class="section-heading"><div><p class="eyebrow">Material adicional</p><h2>Otros contenidos del programa</h2></div><span class="small-note">Algunos contenidos están bloqueados por ahora</span></div><div class="extra-grid">${data.extras.map((extra) => `<article class="extra-card is-locked" aria-label="${escapeHtml(extra.title)} · bloqueado por ahora"><div class="extra-image"><img src="${escapeHtml(extra.image)}" alt="" loading="lazy"><span class="extra-lock">${icon('lock', 13)}<b>Bloqueado</b></span></div><div class="extra-content"><p class="eyebrow">Contenido complementario</p><h3>${escapeHtml(extra.title)}</h3><p>${escapeHtml(extra.description)}</p><span class="extra-status">${icon('lock', 12)} Bloqueado por ahora</span></div></article>`).join('')}</div></section>
    </div>`;
  }

  function renderJourney() {
    const next = nextDay().day;
    return `<div class="journey-page">
      ${screenHead('Una jornada de 28 días', 'home', 'Plan guiado')}
      <div class="journey-intro"><p>Avanza en orden o elige cualquier día. Cada etapa incluye cuatro movimientos y una guía breve antes de cada video.</p><span>${state.completed.size} / 28 completados</span></div>
      <label class="day-search">${icon('journey', 18)}<input type="search" data-day-search placeholder="Buscar un enfoque o movimiento" aria-label="Buscar entre los 28 días"><kbd>28 días</kbd></label>
      <div class="day-list">${data.days.map((day) => {
        const done = state.completed.has(day.day);
        const active = !done && day.day === next;
        return `<button type="button" class="day-card${active ? ' is-next' : ''}${done ? ' is-done' : ''}" data-action="open-day" data-day="${day.day}">
          <span class="day-number">${done ? icon('check', 18) : String(day.day).padStart(2, '0')}</span>
          <span class="day-copy"><span class="day-kicker">DÍA ${String(day.day).padStart(2, '0')}${active ? ' · SIGUIENTE' : ''}</span><b>${escapeHtml(day.title)}</b><span class="day-description">${escapeHtml(day.description)}</span><span class="day-count">${day.classes.length} movimientos</span></span>
          <span class="card-chevron">${icon('arrow', 17)}</span>
        </button>`;
      }).join('')}</div>
      <p class="gentle-note">Realiza cada movimiento con suavidad y detente si sientes dolor o molestia.</p>
    </div>`;
  }

  function videoKey(item, group) { return `${group}:${item.provider || 'youtube'}:${item.videoId}:${item.startAt || 0}`; }
  function renderPlayer(item, group) {
    const key = videoKey(item, group);
    const start = Number(item.startAt || 0);
    const id = escapeHtml(item.videoId);
    const title = escapeHtml(item.title);
    const isVimeo = item.provider === 'vimeo';
    const vertical = item.vertical ? ' vertical' : '';
    if (state.openVideos.has(key)) {
      const url = isVimeo
        ? `https://player.vimeo.com/video/${encodeURIComponent(item.videoId)}?autoplay=1&playsinline=1${start ? `#t=${start}s` : ''}`
        : `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.videoId)}?autoplay=1&playsinline=1&rel=0&modestbranding=1&start=${start}&cc_load_policy=1&cc_lang_pref=es&hl=es`;
      return `<div class="video-shell${vertical}"><iframe src="${url}" title="${title}" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
    }
    const isMainCourse = group.startsWith('day-');
    const audioLabel = isMainCourse || isVimeo ? 'audio en español latinoamericano' : 'audio original en portugués';
    const caption = `${isMainCourse ? 'Video principal' : 'Video complementario'} · ${audioLabel}`;
    const poster = item.thumbnail || (isVimeo ? '' : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
    const posterStyle = poster ? ` style="background-image:url('${escapeHtml(poster)}')"` : '';
    return `<div class="video-shell${vertical}">
      <button type="button" class="video-poster${isVimeo ? ' is-vimeo' : ''}"${posterStyle} data-action="play-video" data-video-key="${escapeHtml(key)}" aria-label="Reproducir ${title}">
        <span class="play-disc">${icon('playFill', 23)}</span><span class="poster-caption">${caption}</span>
      </button>
    </div>
    <p class="video-meta">${icon('clock', 14)}${start ? 'La introducción se omite y el ejercicio empieza directamente.' : 'Reproducción en línea; se requiere conexión a internet.'}</p>`;
  }

  function renderLesson(day, isBonus = false) {
    const dayNumber = Number(day.day);
    const done = !isBonus && state.completed.has(dayNumber);
    const group = isBonus ? `bonus-${day.id}` : `day-${dayNumber}`;
    return `<div class="lesson-page">
      ${screenHead(day.title, isBonus ? 'bonuses' : 'journey', isBonus ? 'Material complementario' : `Día ${String(dayNumber).padStart(2, '0')} de 28`)}
      <section class="lesson-overview"><span class="overview-mark">${icon(isBonus ? 'gift' : 'sparkle', 21)}</span><div><p class="eyebrow">${isBonus ? 'Sobre este protocolo' : 'Enfoque del día'}</p><p>${escapeHtml(day.description)}</p></div><span class="overview-count">${day.classes.length}<small>${isBonus ? 'clases' : 'pasos'}</small></span></section>
      <div class="lesson-list">${day.classes.map((item, index) => `<article class="exercise-card">
        <div class="exercise-heading"><span class="exercise-number">${String(index + 1).padStart(2, '0')}</span><div><p class="eyebrow">${isBonus ? 'Clase complementaria' : `Movimiento ${index + 1}`}</p><h2>${escapeHtml(item.title)}</h2></div></div>
        <div class="exercise-guide"><div class="guide-label">${icon('leaf', 15)}<strong>Antes de reproducir</strong></div><p>${escapeHtml(item.description)}</p></div>
        ${renderPlayer(item, group)}
      </article>`).join('')}</div>
      ${isBonus ? '' : `<section class="lesson-completion"><div><p class="eyebrow">Tu avance</p><strong>${done ? 'Día completado' : '¿Terminaste esta rutina?'}</strong><small>${done ? 'Puedes volver a practicar cuando quieras.' : 'Elige marcarlo como listo. Tu avance queda guardado en este dispositivo.'}</small></div><button type="button" class="complete-button${done ? ' is-done' : ''}" data-action="toggle-day" data-day="${dayNumber}" aria-pressed="${done}">${done ? icon('check', 17) : icon('check', 17)}${done ? 'Listo' : 'Marcar como listo'}</button></section>
      <div class="lesson-stepper"><button type="button" data-action="open-day" data-day="${dayNumber - 1}" ${dayNumber <= 1 ? 'disabled' : ''}>${icon('back', 15)} Día anterior</button><span>${String(dayNumber).padStart(2, '0')} <i>/</i> 28</span><button type="button" data-action="open-day" data-day="${dayNumber + 1}" ${dayNumber >= 28 ? 'disabled' : ''}>Siguiente día ${icon('arrow', 15)}</button></div>`}
      <p class="gentle-note">Haz los movimientos con suavidad. Si algo te causa dolor o molestia, detente.</p>
    </div>`;
  }

  function renderBonuses() {
    return `<div class="bonus-page">
      ${screenHead('Contenido para acompañar tu rutina', 'home', 'Material complementario')}
      <p class="screen-intro">Consulta estas guías cuando quieras ampliar tu momento de cuidado. La jornada principal de 28 días sigue disponible desde el menú.</p>
      <div class="bonus-grid">${data.bonuses.map((bonus, index) => `<article class="bonus-card"><div class="bonus-topline"><span class="bonus-number">0${index + 1}</span><span class="bonus-mark">${icon('gift', 18)}</span></div><h2>${escapeHtml(bonus.title)}</h2><p>${escapeHtml(bonus.description)}</p><button type="button" class="button button-outline" data-action="open-bonus" data-bonus="${bonus.id}">Ver ${bonus.classes.length} ${bonus.classes.length === 1 ? 'clase' : 'clases'} ${icon('arrow', 15)}</button></article>`).join('')}</div>
      <section class="bonus-note"><span>${icon('sparkle', 18)}</span><p>El contenido complementario está separado de los 28 días principales para que puedas ir directamente a la rutina que buscas.</p></section>
    </div>`;
  }

  function renderMotivation() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24));
    const messageDay = (dayOfYear % 28) || 28;
    const message = data.motivations.find((item) => item.day === messageDay) || data.motivations[0];
    return `<div class="motivation-page">
      ${screenHead('Un momento para ti', 'home', 'Inspiración diaria')}
      <p class="screen-intro">Una pausa breve para acompañar el hábito de cuidarte con calma y constancia.</p>
      <section class="motivation-panel"><span class="quote-index">NOTA DEL DÍA · ${String(messageDay).padStart(2, '0')}</span><span class="quote-mark">“</span><blockquote>${escapeHtml(message.text)}</blockquote><span class="quote-divider"></span><p>${escapeHtml(message.support)}</p><span class="quote-flower" aria-hidden="true">✳</span></section>
      <div class="motivation-footnote">${icon('heart', 17)} Un gesto pequeño también cuenta.</div>
    </div>`;
  }

  function renderProgress() {
    const pct = percent();
    const current = Math.min(nextDay().day, 28);
    return `<div class="progress-page">
      ${screenHead('Tu avance, a tu manera', 'home', 'Mi jornada')}
      <section class="profile-panel"><p class="eyebrow">Un espacio personal, sin cuenta</p><h2>Continúa cuando te venga bien.</h2><p>Tu avance se guarda solo en este navegador. No pedimos correo ni contraseña.</p><div class="profile-meter"><span style="width:${pct}%"></span></div><small>${pct}% de la jornada completada</small></section>
      <div class="profile-stats"><article><strong>${String(current).padStart(2, '0')}</strong><span>Día actual</span></article><article><strong>${state.completed.size}</strong><span>Días listos</span></article><article><strong>${data.days.length - state.completed.size}</strong><span>Por recorrer</span></article></div>
      <h2 class="profile-section-title">Lo que tienes disponible</h2>
      <div class="access-list"><div><span>${icon('journey', 17)}Jornada guiada · 28 días</span><b>Disponible</b></div><div><span>${icon('gift', 17)}Material complementario</span><b>Disponible</b></div></div>
      <aside class="profile-reminder"><span>${icon('heart', 21)}</span><p>“Estás creando un momento de cuidado para ti.”</p><small>Continúa a tu ritmo. La constancia acompaña tu jornada.</small></aside>
      <button type="button" class="reset-button" data-action="reset-progress">Restablecer el avance guardado en este dispositivo</button>
    </div>`;
  }

  function render() {
    let content = '';
    if (state.screen === 'home') content = renderHome();
    else if (state.screen === 'journey') content = renderJourney();
    else if (state.screen === 'day' && state.day) content = renderLesson(state.day);
    else if (state.screen === 'bonuses') content = renderBonuses();
    else if (state.screen === 'bonus-detail' && state.bonus) content = renderLesson(state.bonus, true);
    else if (state.screen === 'motivation') content = renderMotivation();
    else if (state.screen === 'progress') content = renderProgress();
    else content = renderHome();
    pageShell(content);
  }

  app.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    if (action === 'navigate') navigate(button.dataset.screen);
    if (action === 'open-day') openDay(button.dataset.day);
    if (action === 'open-bonus') {
      state.bonus = data.bonuses.find((item) => item.id === Number(button.dataset.bonus));
      if (state.bonus) { state.screen = 'bonus-detail'; scrollTop(); render(); }
    }
    if (action === 'play-video') {
      state.openVideos.add(button.dataset.videoKey);
      saveOpenVideos();
      render();
    }
    if (action === 'toggle-day') {
      const day = Number(button.dataset.day);
      if (!data.days.some((item) => item.day === day)) return;
      state.completed.has(day) ? state.completed.delete(day) : state.completed.add(day);
      saveCompleted();
      render();
    }
    if (action === 'reset-progress' && window.confirm('¿Quieres restablecer el avance guardado en este dispositivo?')) {
      state.completed.clear();
      saveCompleted();
      render();
    }
  });

  app.addEventListener('input', (event) => {
    if (!event.target.matches('[data-day-search]')) return;
    const query = event.target.value.trim().toLocaleLowerCase('es');
    app.querySelectorAll('.day-card').forEach((card) => {
      card.hidden = query !== '' && !card.textContent.toLocaleLowerCase('es').includes(query);
    });
  });

  render();
})();
