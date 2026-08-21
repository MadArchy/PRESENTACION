/**
 * 3i BAIRD LAB · EXECUTIVE VENTURE SELECTION HUB PLATFORM
 * Manages:
 * - Executive Hub Landing Menu (Exact design with AI EdTech, FoodTech QSR, Web3 & IoT pills)
 * - 3 Curated 15-Slide Executive Decks:
 *   1. Expert Multi-Agent Tutor (15 Slides)
 *   2. Smart Fast-Food Franchise (15 Slides)
 *   3. Arcana: Trust by Construction (15 Slides)
 * - Real-time bilingual translation (ES/EN), dark/light theme, keyboard navigation & Lightbox.
 */

let activeDeck = 'hub'; // 'hub', 'tutor', 'fastfood', 'arcana', 'comparativo'
let currentSlide = 1;
const DECK_SLIDE_COUNTS = { tutor: 15, fastfood: 15, arcana: 15, restaurante: 10, comparativo: 10 };

function totalSlides() {
  return DECK_SLIDE_COUNTS[activeDeck] || 15;
}
let currentLang = 'es'; // default Spanish
let currentTheme = 'dark';
let isOverviewOpen = false;

// DOM Elements
const progressBar = document.getElementById('progressBar');
const slideCounter = document.getElementById('slideCounter');
const deckProgressWrapper = document.getElementById('deckProgressWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const hubReturnBtn = document.getElementById('hubReturnBtn');
const gridToggleBtn = document.getElementById('gridToggleBtn');
const overviewDrawer = document.getElementById('overviewDrawer');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const themeIcon = document.getElementById('themeIcon');
const fsIcon = document.getElementById('fsIcon');
const deckCurrentTitle = document.getElementById('deckCurrentTitle');
const deckIcon = document.getElementById('deckIcon');
const deckKicker = document.getElementById('deckKicker');

// Deck Meta Info
const DECK_CONFIG = {
  hub: {
    title_es: 'Selección Ejecutiva',
    title_en: 'Executive Selection',
    kicker_es: 'Briefing confidencial',
    kicker_en: 'Confidential briefing',
    icon: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>'
  },
  tutor: {
    title_es: 'Tutor Multi-Agente',
    title_en: 'Multi-Agent Tutor',
    kicker_es: 'AI EdTech · Pitch inversor',
    kicker_en: 'AI EdTech · Investor pitch',
    icon: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/><path d="M7 10h10"/><path d="M7 14h10"/></svg>'
  },
  fastfood: {
    title_es: 'Franquicia Smart QSR',
    title_en: 'Smart Fast-Food',
    kicker_es: 'FoodTech QSR · Pitch piloto',
    kicker_en: 'FoodTech QSR · Pilot pitch',
    icon: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M18 11h.01"/><path d="M12 15h.01"/><path d="M16 16h.01"/><path d="M2 19h20"/><path d="M20 15a8 8 0 0 0-16 0"/><path d="M12 4v3"/></svg>'
  },
  arcana: {
    title_es: 'Arcana Trust Network',
    title_en: 'Arcana Trust Network',
    kicker_es: 'Web3 & IoT · Pitch inversor',
    kicker_en: 'Web3 & IoT · Investor pitch',
    icon: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="m21 16-9 5-9-5V8l9-5 9 5v8Z"/><path d="m3.27 6.96 8.73 4.88 8.73-4.88"/><path d="M12 22.08V12"/></svg>'
  },
  restaurante: {
    title_es: 'Arcana Restaurantes',
    title_en: 'Arcana Restaurant Ops',
    kicker_es: 'Arcana · Dueños de Restaurante',
    kicker_en: 'Arcana · Restaurant Owners',
    icon: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>'
  },
  comparativo: {
    title_es: 'Infraestructura IA',
    title_en: 'AI Infrastructure',
    kicker_es: 'Estrategia Ejecutiva · 3i BAIRD LAB',
    kicker_en: 'Executive Strategy · 3i BAIRD LAB',
    icon: '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>'
  }
};

function updateChromeMeta() {
  const meta = DECK_CONFIG[activeDeck] || DECK_CONFIG.hub;
  if (deckCurrentTitle) {
    deckCurrentTitle.textContent = currentLang === 'es' ? meta.title_es : meta.title_en;
  }
  if (deckKicker) {
    deckKicker.textContent = currentLang === 'es' ? meta.kicker_es : meta.kicker_en;
  }
  if (deckIcon) deckIcon.innerHTML = meta.icon;
}

const SLIDE_BACKGROUNDS = {
  hub: { default: 'backgrounds/bg-hub.jpg' },
  tutor: {
    default: 'backgrounds/bg-tutor-neural.jpg',
    1: 'backgrounds/bg-tutor-lumi.jpg',
    2: 'backgrounds/bg-tutor-study.jpg',
    3: 'backgrounds/bg-tutor-ai.jpg',
    9: 'backgrounds/bg-tutor-ai.jpg',
    11: 'backgrounds/bg-closing.jpg',
    13: 'backgrounds/bg-closing.jpg',
    14: 'backgrounds/bg-tutor-study.jpg',
    15: 'backgrounds/bg-closing.jpg'
  },
  fastfood: {
    default: 'backgrounds/bg-fastfood-store.jpg',
    1: 'backgrounds/bg-fastfood-pizza.jpg',
    2: 'backgrounds/bg-fastfood-store.jpg',
    3: 'backgrounds/bg-fastfood-kitchen.jpg',
    4: 'backgrounds/bg-fastfood-kitchen.jpg',
    5: 'backgrounds/bg-fastfood-store.jpg',
    6: 'backgrounds/bg-fastfood-store.jpg',
    10: 'backgrounds/bg-fastfood-kitchen.jpg',
    12: 'backgrounds/bg-fastfood-pizza.jpg',
    15: 'backgrounds/bg-fastfood-pizza.jpg'
  },
  arcana: {
    default: 'backgrounds/bg-arcana-chain.jpg',
    1: 'backgrounds/bg-arcana-iot.jpg',
    2: 'backgrounds/bg-arcana-iot.jpg',
    3: 'backgrounds/bg-arcana-iot.jpg',
    4: 'backgrounds/bg-arcana-iot.jpg',
    5: 'backgrounds/bg-arcana-iot.jpg',
    9: 'backgrounds/bg-arcana-iot.jpg',
    11: 'backgrounds/bg-arcana-iot.jpg',
    14: 'backgrounds/bg-arcana-iot.jpg',
    15: 'backgrounds/bg-closing.jpg'
  },
  restaurante: {
    default: 'backgrounds/bg-fastfood-store.jpg',
    1: 'backgrounds/bg-fastfood-kitchen.jpg',
    2: 'backgrounds/bg-fastfood-store.jpg',
    3: 'backgrounds/bg-arcana-iot.jpg',
    4: 'backgrounds/bg-fastfood-kitchen.jpg',
    5: 'backgrounds/bg-fastfood-store.jpg',
    6: 'backgrounds/bg-fastfood-kitchen.jpg',
    7: 'backgrounds/bg-arcana-iot.jpg',
    8: 'backgrounds/bg-closing.jpg',
    9: 'backgrounds/bg-fastfood-store.jpg',
    10: 'backgrounds/bg-closing.jpg'
  },
  comparativo: {
    default: 'backgrounds/bg-ia-chip.jpg',
    1: 'backgrounds/bg-ia-lab.jpg',
    2: 'media/ia/ia-models.jpg',
    3: 'backgrounds/bg-ia-lab.jpg',
    4: 'backgrounds/bg-ia-chip.jpg',
    5: 'media/ia/ia-memory.jpg',
    6: 'media/ia/ia-models.jpg',
    7: 'media/ia/ia-workflow.jpg',
    8: 'media/ia/ia-client.jpg',
    9: 'backgrounds/bg-ia-lab.jpg',
    10: 'backgrounds/bg-closing.jpg'
  }
};

function resolveSlideBackground(slide) {
  if (slide.classList.contains('executive-hub-slide') || slide.id === 'hub-landing-slide') {
    return SLIDE_BACKGROUNDS.hub.default;
  }
  const deck = slide.getAttribute('data-deck');
  const sid = parseInt(slide.getAttribute('data-slide') || '1', 10);
  const map = SLIDE_BACKGROUNDS[deck];
  if (!map) return SLIDE_BACKGROUNDS.hub.default;
  return map[sid] || map.default;
}

function injectThemedBackgrounds() {
  document.querySelectorAll('.slide').forEach((slide) => {
    if (slide.querySelector('.slide-photo-bg')) return;
    const bg = document.createElement('div');
    bg.className = 'slide-photo-bg';
    bg.dataset.src = resolveSlideBackground(slide);
    const overlay = document.createElement('div');
    overlay.className = 'slide-photo-overlay';
    slide.insertBefore(bg, slide.firstChild);
    slide.insertBefore(overlay, bg.nextSibling);
  });
}

function loadSlideBackground(slide) {
  if (!slide) return;
  const bg = slide.querySelector('.slide-photo-bg');
  if (!bg || bg.style.backgroundImage || !bg.dataset.src) return;
  bg.style.backgroundImage = `url("${bg.dataset.src}")`;
}

function deferSlideImages() {
  document.querySelectorAll('.slide img').forEach((img) => {
    if (img.dataset.src) return;
    const src = img.getAttribute('src');
    if (!src || src.startsWith('data:')) return;
    img.dataset.src = src;
    img.removeAttribute('src');
    img.decoding = 'async';
  });
}

function loadSlideImages(slide) {
  if (!slide) return;
  slide.querySelectorAll('img[data-src]').forEach((img) => {
    if (img.getAttribute('src') === img.dataset.src) return;
    img.src = img.dataset.src;
  });
}

function preloadUrl(url) {
  if (!url) return;
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
}

function primeNearbySlides(deckKey, slideNum) {
  const container = document.getElementById(deckKey === 'hub' ? 'deck-hub' : `deck-${deckKey}`);
  if (!container) return;
  container.querySelectorAll('.slide').forEach((slide) => {
    const sid = parseInt(slide.getAttribute('data-slide') || '1', 10);
    if (deckKey === 'hub' || Math.abs(sid - slideNum) <= 1) {
      loadSlideBackground(slide);
      loadSlideImages(slide);
    }
  });
}

function warmupVideo() {
  const video = document.getElementById('ventureVideo');
  if (video) video.preload = 'auto';
}

function setupHubNavigation() {
  document.querySelectorAll('.venture-pill-btn[data-deck]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      launchDeck(btn.getAttribute('data-deck'));
    });
  });

  document.querySelectorAll('.venture-pill-btn[data-video-deck]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      playVentureVideo(btn.getAttribute('data-video-deck'));
    });
  });
}

function initPlatform() {
  injectThemedBackgrounds();
  deferSlideImages();
  primeNearbySlides('hub', 1);
  preloadUrl(SLIDE_BACKGROUNDS.hub.default);
  warmupVideo();
  setupHubNavigation();
  openExecutiveHub();
  applyLanguage(currentLang);
  setupTouchGestures();
}

// Open Executive Hub (Menu)
function openExecutiveHub() {
  activeDeck = 'hub';
  document.documentElement.setAttribute('data-deck', 'hub');

  // Hide/Show containers
  document.querySelectorAll('.deck-container').forEach(c => c.classList.remove('active'));
  const hubContainer = document.getElementById('deck-hub');
  if (hubContainer) hubContainer.classList.add('active');

  // Update HUD
  updateChromeMeta();
  if (deckProgressWrapper) {
    deckProgressWrapper.classList.remove('is-visible');
    deckProgressWrapper.style.opacity = '';
  }

  // Toggle navigation buttons
  if (prevBtn) prevBtn.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';
  if (hubReturnBtn) hubReturnBtn.style.display = 'none';
  if (gridToggleBtn) gridToggleBtn.style.display = 'none';

  if (isOverviewOpen) toggleOverview();
  if (isCommentsOpen) closeCommentsDrawer();
  updateCommentsCounterBadge();
}

// Launch Specific Presentation
function launchDeck(deckKey) {
  if (!DECK_CONFIG[deckKey] || deckKey === 'hub') return;
  activeDeck = deckKey;
  currentSlide = 1;
  document.documentElement.setAttribute('data-deck', activeDeck);

  // Update Containers
  document.querySelectorAll('.deck-container').forEach(c => c.classList.remove('active'));
  const targetDeck = document.getElementById(`deck-${activeDeck}`);
  if (targetDeck) targetDeck.classList.add('active');

  // Update HUD
  updateChromeMeta();
  if (deckProgressWrapper) {
    deckProgressWrapper.classList.add('is-visible');
    deckProgressWrapper.style.opacity = '';
  }

  // Toggle buttons
  if (prevBtn) prevBtn.style.display = 'inline-flex';
  if (nextBtn) nextBtn.style.display = 'inline-flex';
  if (hubReturnBtn) hubReturnBtn.style.display = 'inline-flex';
  if (gridToggleBtn) gridToggleBtn.style.display = 'inline-flex';

  // Update Overview Grid Swapping
  ['tutor', 'fastfood', 'arcana', 'restaurante', 'comparativo'].forEach(key => {
    const grid = document.getElementById(`overviewGrid-${key}`);
    if (grid) {
      grid.style.display = key === activeDeck ? 'grid' : 'none';
    }
  });

  primeNearbySlides(activeDeck, currentSlide);
  updateSlideDisplay();
}

// Slide Navigation
function goToSlide(slideNum) {
  if (activeDeck === 'hub') return;
  const total = totalSlides();
  if (slideNum < 1) slideNum = 1;
  if (slideNum > total) slideNum = total;
  currentSlide = slideNum;
  updateSlideDisplay();
  if (isOverviewOpen) toggleOverview();
}

function nextSlide() {
  if (activeDeck === 'hub') return;
  if (currentSlide < totalSlides()) {
    goToSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (activeDeck === 'hub') return;
  if (currentSlide > 1) {
    goToSlide(currentSlide - 1);
  }
}

function updateSlideDisplay() {
  if (activeDeck === 'hub') return;

  const activeContainer = document.getElementById(`deck-${activeDeck}`);
  if (!activeContainer) return;

  const currentDeckSlides = activeContainer.querySelectorAll('.slide');
  currentDeckSlides.forEach(slide => {
    const sId = parseInt(slide.getAttribute('data-slide'), 10);
    if (sId === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  // Update Progress Bar
  const total = totalSlides();
  const progressPercent = total <= 1 ? 100 : ((currentSlide - 1) / (total - 1)) * 100;
  if (progressBar) {
    progressBar.style.width = `${progressPercent}%`;
  }

  // Update Slide Counter
  if (slideCounter) {
    const formattedCurrent = currentSlide < 10 ? `0${currentSlide}` : currentSlide;
    const formattedTotal = total < 10 ? `0${total}` : total;
    slideCounter.textContent = `${formattedCurrent} / ${formattedTotal}`;
  }

  // Update Nav Buttons
  if (prevBtn) prevBtn.disabled = currentSlide === 1;
  if (nextBtn) nextBtn.disabled = currentSlide === total;

  // Highlight active thumbnail in active overview
  const activeGrid = document.getElementById(`overviewGrid-${activeDeck}`);
  if (activeGrid) {
    const thumbs = activeGrid.querySelectorAll('.overview-thumb-card');
    thumbs.forEach((thumb, idx) => {
      if (idx + 1 === currentSlide) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    });
  }

  updateCommentsCounterBadge();
  if (isCommentsOpen) {
    openCommentsDrawer();
  }

  primeNearbySlides(activeDeck, currentSlide);
}

// Language Switcher (ES <-> EN)
function setLanguage(lang) {
  if (lang !== 'es' && lang !== 'en') return;
  currentLang = lang;
  applyLanguage(currentLang);
}

function toggleLanguage() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  applyLanguage(currentLang);
}

function updateDrawerFormLanguage(lang) {
  // Update all input and textarea placeholders with data-placeholder-es / data-placeholder-en
  document.querySelectorAll('[data-placeholder-es]').forEach((el) => {
    el.placeholder = lang === 'en'
      ? (el.getAttribute('data-placeholder-en') || el.placeholder)
      : (el.getAttribute('data-placeholder-es') || el.placeholder);
  });

  // Update select options
  const select = document.getElementById('injectCategory');
  if (select) {
    Array.from(select.options).forEach((opt) => {
      const label = lang === 'en' ? opt.getAttribute('data-label-en') : opt.getAttribute('data-label-es');
      if (label) opt.textContent = label;
    });
  }
}

function applyLanguage(lang) {
  currentLang = lang === 'en' ? 'en' : 'es';
  document.documentElement.setAttribute('data-lang', currentLang);
  document.querySelectorAll('.lang-opt').forEach((btn) => {
    btn.classList.toggle('is-active', btn.getAttribute('data-lang') === currentLang);
  });

  updateChromeMeta();

  const esElements = document.querySelectorAll('.lang-es');
  const enElements = document.querySelectorAll('.lang-en');

  if (currentLang === 'es') {
    esElements.forEach(el => el.style.display = '');
    enElements.forEach(el => el.style.display = 'none');
  } else {
    esElements.forEach(el => el.style.display = 'none');
    enElements.forEach(el => el.style.display = '');
  }

  // Update drawer forms, placeholders, and options
  updateDrawerFormLanguage(currentLang);

  // Live update slide Q&A drawer if active
  if (typeof isCommentsOpen !== 'undefined' && isCommentsOpen) {
    if (typeof updateCommentsDrawerHeader === 'function') updateCommentsDrawerHeader();
    if (typeof renderCommentsList === 'function') renderCommentsList();
  }
}

// Theme Switcher (Dark <-> Light)
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (themeIcon) {
    themeIcon.innerHTML = currentTheme === 'dark' 
      ? '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>'
      : '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
  }
}

// Fullscreen Toggle
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn(`Fullscreen request error: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

// Overview Drawer Toggle
function toggleOverview() {
  if (activeDeck === 'hub') return;
  isOverviewOpen = !isOverviewOpen;
  if (overviewDrawer) {
    if (isOverviewOpen) {
      overviewDrawer.classList.add('open');
    } else {
      overviewDrawer.classList.remove('open');
    }
  }
}

// Lightbox Zoom
function openLightbox(imgSrc) {
  if (!imgSrc) return;
  if (lightboxImg && lightboxModal) {
    lightboxImg.src = imgSrc;
    lightboxModal.classList.add('open');
  }
}

function closeLightboxDirect() {
  if (lightboxModal) lightboxModal.classList.remove('open');
}

function closeLightbox(event) {
  if (event.target === lightboxModal || event.target.classList.contains('lightbox-close-btn')) {
    closeLightboxDirect();
  }
}

let pendingDeckAfterVideo = null;

function isVideoTheaterOpen() {
  const theater = document.getElementById('videoTheater');
  return theater && !theater.hidden;
}

function setVideoEndedState(ended) {
  const theater = document.getElementById('videoTheater');
  if (theater) theater.classList.toggle('is-ended', !!ended);
}

function enterVideoFullscreen(theater) {
  const el = theater;
  const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
  if (!req) return;
  Promise.resolve(req.call(el)).catch(() => {});
}

function playVentureVideo(deckKey) {
  const theater = document.getElementById('videoTheater');
  const video = document.getElementById('ventureVideo');
  if (!theater || !video) {
    launchDeck(deckKey);
    return;
  }

  pendingDeckAfterVideo = deckKey;
  theater.hidden = false;
  setVideoEndedState(false);
  video.controls = true;
  video.preload = 'auto';
  video.currentTime = 0;
  video.muted = false;
  enterVideoFullscreen(theater);

  const playPromise = video.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {
      video.muted = true;
      video.play().catch(() => closeVentureVideo(true));
    });
  }

  video.onended = () => {
    closeVentureVideo(true);
  };
}

function replayVentureVideo() {
  const video = document.getElementById('ventureVideo');
  if (!video) return;
  setVideoEndedState(false);
  video.currentTime = 0;
  video.muted = false;
  video.play().catch(() => {});
}

function skipVentureVideo() {
  closeVentureVideo(true);
}

function closeVentureVideo(continueToDeck) {
  const theater = document.getElementById('videoTheater');
  const video = document.getElementById('ventureVideo');
  if (video) {
    video.pause();
    video.currentTime = 0;
    video.onended = null;
  }
  if (theater) {
    theater.hidden = true;
    theater.classList.remove('is-ended');
  }
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }

  const nextDeck = pendingDeckAfterVideo;
  pendingDeckAfterVideo = null;
  if (continueToDeck && nextDeck) {
    launchDeck(nextDeck);
  }
}

// Keyboard Controls
document.addEventListener('keydown', (e) => {
  const isInputActive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
  if (isInputActive) {
    if (e.key === 'Escape') {
      document.activeElement.blur();
    }
    return;
  }

  if (isVideoTheaterOpen()) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeVentureVideo(false);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      skipVentureVideo();
    } else if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      const video = document.getElementById('ventureVideo');
      if (!video) return;
      if (video.ended) replayVentureVideo();
      else if (video.paused) video.play().catch(() => {});
      else video.pause();
    }
    return;
  }
  if (lightboxModal && lightboxModal.classList.contains('open')) {
    if (e.key === 'Escape') closeLightboxDirect();
    return;
  }

  if (isOverviewOpen) {
    if (e.key === 'Escape' || e.key.toLowerCase() === 'g') toggleOverview();
    return;
  }

  switch (e.key) {
    case 'ArrowRight':
    case 'PageDown':
    case ' ':
      if (activeDeck !== 'hub') {
        e.preventDefault();
        nextSlide();
      }
      break;
    case 'ArrowLeft':
    case 'PageUp':
      if (activeDeck !== 'hub') {
        e.preventDefault();
        prevSlide();
      }
      break;
    case 'Home':
      if (activeDeck !== 'hub') {
        e.preventDefault();
        goToSlide(1);
      }
      break;
    case 'End':
      if (activeDeck !== 'hub') {
        e.preventDefault();
        goToSlide(totalSlides());
      }
      break;
    case 'f':
    case 'F':
      e.preventDefault();
      toggleFullscreen();
      break;
    case 'g':
    case 'G':
      if (activeDeck !== 'hub') {
        e.preventDefault();
        toggleOverview();
      }
      break;
    case 'c':
    case 'C':
    case 'q':
    case 'Q':
      if (activeDeck !== 'hub') {
        e.preventDefault();
        toggleCommentsDrawer();
      }
      break;
    case 'm':
    case 'M':
      e.preventDefault();
      openExecutiveHub();
      break;
    case 'l':
    case 'L':
      e.preventDefault();
      toggleLanguage();
      break;
    case 't':
    case 'T':
      e.preventDefault();
      toggleTheme();
      break;
    case 'Escape':
      if (isCommentsOpen) closeCommentsDrawer();
      else if (isOverviewOpen) toggleOverview();
      else if (activeDeck !== 'hub') openExecutiveHub();
      break;
  }
});

// Touch Gestures
let touchStartX = 0;
let touchStartY = 0;

function setupTouchGestures() {
  const stage = document.getElementById('slideViewport');
  if (!stage) return;

  stage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX < 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });
}

// ==========================================================================
// SLIDE COMMENTS, QUESTIONS & INGESTION SYSTEM (3i BAIRD LAB)
// ==========================================================================

let isCommentsOpen = false;
let currentCommentFilter = 'all';
let activeCommentTab = 'list';

// Curated Seed Questions & Talking Points for Decks
const CURATED_SLIDE_QA = {
  "comparativo": {
    "1": [
      {
        "id": "comp-1-1",
        "category": "inversor",
        "question_es": "¿Por qué la estrategia de infraestructura debe basarse en etapas de negocio y no en potencia bruta?",
        "question_en": "Why should infrastructure strategy be based on business stages rather than raw computing power?",
        "answer_es": "Comprar hardware antes de tener tracción comercial genera capital ocioso y rápida obsolescencia. La inversión progresiva asegura que cada equipo esté financiado y amortizado por contratos activos.",
        "answer_en": "Purchasing hardware before commercial traction creates idle capital and rapid depreciation. Phased investment ensures every machine is funded and amortized by active client contracts.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Por qué la estrategia de infraestructura debe basarse en etapas de negocio y no en potencia bruta?",
        "answer": "Comprar hardware antes de tener tracción comercial genera capital ocioso y rápida obsolescencia. La inversión progresiva asegura que cada equipo esté financiado y amortizado por contratos activos."
      },
      {
        "id": "comp-1-2",
        "category": "nota",
        "question_es": "Nota del presentador: Tesis central de apertura",
        "question_en": "Presenter Note: Core opening thesis",
        "answer_es": "Enfatizar que el objetivo de 3i Baird Lab no es acumular servidores costosos, sino crear un activo productivo y rentable que multiplique los ingresos.",
        "answer_en": "Emphasize that 3i Baird Lab's goal is not accumulating expensive servers, but forging a productive, profitable asset that multiplies enterprise revenue.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Tesis central de apertura",
        "answer": "Enfatizar que el objetivo de 3i Baird Lab no es acumular servidores costosos, sino crear un activo productivo y rentable que multiplique los ingresos."
      }
    ],
    "2": [
      {
        "id": "comp-2-1",
        "category": "operativa",
        "question_es": "¿Qué soluciones concretas podemos monetizar de inmediato con Capex US$0?",
        "question_en": "What concrete solutions can we monetize immediately at $0 Capex?",
        "answer_es": "Plataformas web empresariales, RAG documental con APIs de frontera, automatizaciones de procesos de negocio y prototipos funcionales para validación comercial.",
        "answer_en": "Enterprise web platforms, document RAG with frontier APIs, business workflow automations, and functional prototypes for commercial validation.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Qué soluciones concretas podemos monetizar de inmediato con Capex US$0?",
        "answer": "Plataformas web empresariales, RAG documental con APIs de frontera, automatizaciones de procesos de negocio y prototipos funcionales para validación comercial."
      },
      {
        "id": "comp-2-2",
        "category": "inversor",
        "question_es": "¿Por qué no renovar toda la flota de desarrollo de inmediato?",
        "question_en": "Why not upgrade the entire developer fleet right away?",
        "answer_es": "Los equipos actuales son más que suficientes para la fase de desarrollo y demos; el desembolso de capital se reserva para cuando un cliente exija procesamiento masivo o privacidad local.",
        "answer_en": "Current machines are fully capable for development and demos; capital deployment is reserved for when clients demand massive throughput or local privacy.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Por qué no renovar toda la flota de desarrollo de inmediato?",
        "answer": "Los equipos actuales son más que suficientes para la fase de desarrollo y demos; el desembolso de capital se reserva para cuando un cliente exija procesamiento masivo o privacidad local."
      }
    ],
    "3": [
      {
        "id": "comp-3-1",
        "category": "objecion",
        "question_es": "¿Cuáles son los 4 cuellos de botella que nos obligarán a comprar hardware dedicado?",
        "question_en": "What are the 4 bottlenecks that will trigger dedicated hardware purchases?",
        "answer_es": "1) Volumen de datos (modelos 32B-70B que requieren VRAM), 2) Concurrencia de usuarios, 3) Mandato de privacidad On-Premise, 4) Disponibilidad 24/7 sin riesgo de fallas.",
        "answer_en": "1) Data volume (32B-70B models requiring high VRAM), 2) Multi-user concurrency, 3) On-Premise privacy compliance, 4) 24/7 non-stop availability.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuáles son los 4 cuellos de botella que nos obligarán a comprar hardware dedicado?",
        "answer": "1) Volumen de datos (modelos 32B-70B que requieren VRAM), 2) Concurrencia de usuarios, 3) Mandato de privacidad On-Premise, 4) Disponibilidad 24/7 sin riesgo de fallas."
      },
      {
        "id": "comp-3-2",
        "category": "nota",
        "question_es": "Nota del presentador: Metáfora de la VRAM para clientes no técnicos",
        "question_en": "Presenter Note: VRAM metaphor for non-technical clients",
        "answer_es": "Comparar la VRAM con el ancho de una autopista: si el modelo de IA no cabe en la memoria de la tarjeta gráfica, el sistema se vuelve 50 veces más lento.",
        "answer_en": "Compare VRAM to highway lanes: if the AI model does not fit directly in GPU memory, execution slows down by 50x.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Metáfora de la VRAM para clientes no técnicos",
        "answer": "Comparar la VRAM con el ancho de una autopista: si el modelo de IA no cabe en la memoria de la tarjeta gráfica, el sistema se vuelve 50 veces más lento."
      }
    ],
    "4": [
      {
        "id": "comp-4-1",
        "category": "inversor",
        "question_es": "¿Qué métricas financieras justifican una inversión en estaciones dedicadas?",
        "question_en": "What financial metrics justify investing in dedicated workstations?",
        "answer_es": "+300% de capacidad de procesamiento paralelo, 100% de retención de datos confidenciales (cero fuga a nubes públicas) y reducción de hasta el 65% en costos recurrentes de APIs.",
        "answer_en": "+300% concurrent processing throughput, 100% confidential data retention (zero cloud leakage), and up to 65% reduction in recurring API expenses.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Qué métricas financieras justifican una inversión en estaciones dedicadas?",
        "answer": "+300% de capacidad de procesamiento paralelo, 100% de retención de datos confidenciales (cero fuga a nubes públicas) y reducción de hasta el 65% en costos recurrentes de APIs."
      },
      {
        "id": "comp-4-2",
        "category": "operativa",
        "question_es": "¿Cómo ayuda el hardware propio a cerrar clientes Enterprise?",
        "question_en": "How does owned hardware help close Enterprise contracts?",
        "answer_es": "Permite firmar acuerdos de nivel de servicio (SLAs) con garantías de privacidad y tiempos de respuesta dedicados que la nube pública no garantiza a bajo costo.",
        "answer_en": "It enables signing strict SLAs with dedicated response times and privacy guarantees that public cloud APIs cannot provide at fixed costs.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Cómo ayuda el hardware propio a cerrar clientes Enterprise?",
        "answer": "Permite firmar acuerdos de nivel de servicio (SLAs) con garantías de privacidad y tiempos de respuesta dedicados que la nube pública no garantiza a bajo costo."
      }
    ],
    "5": [
      {
        "id": "comp-5-1",
        "category": "nota",
        "question_es": "Nota del presentador: La ecuación de productividad del talento",
        "question_en": "Presenter Note: The talent productivity equation",
        "answer_es": "Destacar la regla: 'Mejor hardware = -70% tiempo de espera = 3x más iteraciones = proyectos entregados en la mitad del tiempo'.",
        "answer_en": "Highlight the rule: 'Better hardware = -70% waiting lag = 3x iteration frequency = projects delivered in half the time'.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: La ecuación de productividad del talento",
        "answer": "Destacar la regla: 'Mejor hardware = -70% tiempo de espera = 3x más iteraciones = proyectos entregados en la mitad del tiempo'."
      },
      {
        "id": "comp-5-2",
        "category": "operativa",
        "question_es": "¿Cómo se beneficia un desarrollador con inferencia local?",
        "question_en": "How does a developer benefit from local AI inference?",
        "answer_es": "Prueba y ajusta prompts y código en segundos sin esperar colas de red ni preocuparse por el costo por token durante la etapa de pruebas.",
        "answer_en": "They test and iterate code and prompts in seconds with zero network queue delays and zero per-token cost anxiety during testing.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Cómo se beneficia un desarrollador con inferencia local?",
        "answer": "Prueba y ajusta prompts y código en segundos sin esperar colas de red ni preocuparse por el costo por token durante la etapa de pruebas."
      }
    ],
    "6": [
      {
        "id": "comp-6-1",
        "category": "inversor",
        "question_es": "¿Cómo se estructuran los niveles de presupuesto recomendados?",
        "question_en": "How are the recommended budget tiers structured?",
        "answer_es": "Nivel 0: US$0 (Desarrollo y demos). Nivel 1: US$2.5k–3.5k (IA local intermedia). Nivel 2: US$4k–6.5k (Workstations profesionales 70B). Nivel 3: Servidores centralizados 24/7.",
        "answer_en": "Tier 0: $0 (Dev & demos). Tier 1: $2.5k–$3.5k (Intermediate local AI). Tier 2: $4k–$6.5k (Professional 70B workstations). Tier 3: Centralized 24/7 servers.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo se estructuran los niveles de presupuesto recomendados?",
        "answer": "Nivel 0: US$0 (Desarrollo y demos). Nivel 1: US$2.5k–3.5k (IA local intermedia). Nivel 2: US$4k–6.5k (Workstations profesionales 70B). Nivel 3: Servidores centralizados 24/7."
      },
      {
        "id": "comp-6-2",
        "category": "objecion",
        "question_es": "¿Por qué no saltar directamente al servidor empresarial Nivel 3?",
        "question_en": "Why not jump directly to a Tier 3 enterprise server?",
        "answer_es": "Porque requiere costos adicionales de energía, refrigeración y mantenimiento. Solo debe adquirirse cuando múltiples clientes en producción lo financien.",
        "answer_en": "Because it incurs ongoing power, thermal, and maintenance overhead. It must only be deployed once multiple production clients fund it.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Por qué no saltar directamente al servidor empresarial Nivel 3?",
        "answer": "Porque requiere costos adicionales de energía, refrigeración y mantenimiento. Solo debe adquirirse cuando múltiples clientes en producción lo financien."
      }
    ],
    "7": [
      {
        "id": "comp-7-1",
        "category": "inversor",
        "question_es": "¿Cuáles son los 5 gatilladores que autorizan la compra de nuevo equipo?",
        "question_en": "What are the 5 triggers that authorize purchasing new hardware?",
        "answer_es": "1. Cliente con contrato firmado que lo exija. 2. Saturación de proyectos simultáneos. 3. Facturas de Cloud API superiores al costo de amortización. 4. Requisito legal de privacidad. 5. Operación en vivo 24/7.",
        "answer_en": "1. Signed client contract demanding it. 2. Concurrent project saturation. 3. Cloud API bills exceeding amortization costs. 4. Legal compliance mandate. 5. Non-stop 24/7 live ops.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuáles son los 5 gatilladores que autorizan la compra de nuevo equipo?",
        "answer": "1. Cliente con contrato firmado que lo exija. 2. Saturación de proyectos simultáneos. 3. Facturas de Cloud API superiores al costo de amortización. 4. Requisito legal de privacidad. 5. Operación en vivo 24/7."
      },
      {
        "id": "comp-7-2",
        "category": "nota",
        "question_es": "Nota de negociación con clientes",
        "question_en": "Client negotiation note",
        "answer_es": "Si un cliente exige privacidad total, el costo del nodo local dedicado puede trasladarse como costo directo de setup en la propuesta comercial.",
        "answer_en": "If a client demands strict on-premise privacy, dedicated hardware costs can be factored directly into the onboarding setup fee.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota de negociación con clientes",
        "answer": "Si un cliente exige privacidad total, el costo del nodo local dedicado puede trasladarse como costo directo de setup en la propuesta comercial."
      }
    ],
    "8": [
      {
        "id": "comp-8-1",
        "category": "operativa",
        "question_es": "¿Cuáles son los 4 pilares indispensables para una operación 24/7?",
        "question_en": "What are the 4 indispensable pillars for a 24/7 operation?",
        "answer_es": "1) Talento potenciado, 2) Capacidad tecnológica GPU, 3) Continuidad eléctrica (UPS online de doble conversión), 4) Conectividad redundante (Doble proveedor de Internet con failover).",
        "answer_en": "1) Empowered talent, 2) Compute GPU capacity, 3) Electrical continuity (Double-conversion online UPS), 4) Redundant connectivity (Dual WAN failover).",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuáles son los 4 pilares indispensables para una operación 24/7?",
        "answer": "1) Talento potenciado, 2) Capacidad tecnológica GPU, 3) Continuidad eléctrica (UPS online de doble conversión), 4) Conectividad redundante (Doble proveedor de Internet con failover)."
      },
      {
        "id": "comp-8-2",
        "category": "objecion",
        "question_es": "¿Qué ocurre si solo compramos computadores sin respaldo eléctrico?",
        "question_en": "What happens if we buy fast computers without power protection?",
        "answer_es": "Una sola micro-interrupción eléctrica apaga los servidores, corrompe bases de datos y tumba los servicios de los clientes, arruinando la reputación de la empresa.",
        "answer_en": "A single power surge shuts down servers, corrupts databases, and crashes live client services, destroying enterprise reputation.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Qué ocurre si solo compramos computadores sin respaldo eléctrico?",
        "answer": "Una sola micro-interrupción eléctrica apaga los servidores, corrompe bases de datos y tumba los servicios de los clientes, arruinando la reputación de la empresa."
      }
    ],
    "9": [
      {
        "id": "comp-9-1",
        "category": "nota",
        "question_es": "Nota del presentador: Desglose del modelo en 3 capas",
        "question_en": "Presenter Note: 3-Layer Model breakdown",
        "answer_es": "Capa 1: Personas (Velocidad). Capa 2: Tecnología (Cómputo). Capa 3: Continuidad (Resiliencia). Todo debe responder al filtro de las 5 preguntas antes de comprar.",
        "answer_en": "Layer 1: People (Velocity). Layer 2: Technology (Compute). Layer 3: Continuity (Resilience). All purchases must pass the 5-question filter.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Desglose del modelo en 3 capas",
        "answer": "Capa 1: Personas (Velocidad). Capa 2: Tecnología (Cómputo). Capa 3: Continuidad (Resiliencia). Todo debe responder al filtro de las 5 preguntas antes de comprar."
      },
      {
        "id": "comp-9-2",
        "category": "operativa",
        "question_es": "¿Cuál es la primera pregunta que debemos hacernos antes de cualquier compra?",
        "question_en": "What is the first question to ask before any purchase?",
        "answer_es": "¿Podemos resolver esta necesidad con la infraestructura que ya tenemos? Si la respuesta es sí, se optimiza lo existente.",
        "answer_en": "Can we solve this need with the infrastructure we already own? If yes, we optimize existing assets first.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es la primera pregunta que debemos hacernos antes de cualquier compra?",
        "answer": "¿Podemos resolver esta necesidad con la infraestructura que ya tenemos? Si la respuesta es sí, se optimiza lo existente."
      }
    ],
    "10": [
      {
        "id": "comp-10-1",
        "category": "inversor",
        "question_es": "¿Cuál es el resumen ejecutivo final para la toma de decisiones?",
        "question_en": "What is the final executive summary for decision-makers?",
        "answer_es": "La infraestructura deja de ser un gasto tecnológico y se convierte en una inversión en capacidad productiva, comercial y operativa que respalda el crecimiento de 3i Baird Lab.",
        "answer_en": "Infrastructure ceases to be a mere IT expense and becomes a direct investment in productive, commercial, and operational capability backing 3i Baird Lab's growth.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es el resumen ejecutivo final para la toma de decisiones?",
        "answer": "La infraestructura deja de ser un gasto tecnológico y se convierte en una inversión en capacidad productiva, comercial y operativa que respalda el crecimiento de 3i Baird Lab."
      },
      {
        "id": "comp-10-2",
        "category": "nota",
        "question_es": "Nota de cierre: Llamado a la acción",
        "question_en": "Closing Note: Strategic call to action",
        "answer_es": "Concluir reforzando la ruta: 'Primero tracción comercial con lo que tenemos; luego escalamiento rentable con continuidad 24/7'.",
        "answer_en": "Conclude by reiterating the path: 'First commercial traction with existing assets; then profitable scaling with 24/7 continuity'.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota de cierre: Llamado a la acción",
        "answer": "Concluir reforzando la ruta: 'Primero tracción comercial con lo que tenemos; luego escalamiento rentable con continuidad 24/7'."
      }
    ]
  },
  "restaurante": {
    "1": [
      {
        "id": "rest-1-1",
        "category": "inversor",
        "question_es": "¿Por qué un dueño de restaurante pagaría por Arcana en vez de confiar en su POS actual?",
        "question_en": "Why would a restaurant owner pay for Arcana instead of trusting their current POS?",
        "answer_es": "El POS solo registra lo que el cajero quiere tipear. Arcana audita la realidad física (básculas, neveras, consumos) y detecta comandas canceladas fraudulentamente o ventas no registradas.",
        "answer_en": "The POS only logs what the cashier types. Arcana audits physical reality (scales, fridges, raw ingredients) and catches cancelled tickets and unrecorded sales.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Por qué un dueño de restaurante pagaría por Arcana en vez de confiar en su POS actual?",
        "answer": "El POS solo registra lo que el cajero quiere tipear. Arcana audita la realidad física (básculas, neveras, consumos) y detecta comandas canceladas fraudulentamente o ventas no registradas."
      },
      {
        "id": "rest-1-2",
        "category": "operativa",
        "question_es": "¿Requiere reemplazar el software o hardware de punto de venta existente?",
        "question_en": "Does it require replacing existing POS hardware or software?",
        "answer_es": "No. Arcana funciona de manera no invasiva conectándose al flujo de red, impresoras de comandas y sensores externos sin alterar el POS del local.",
        "answer_en": "No. Arcana operates non-invasively by tethering to network streams, kitchen ticket printers, and external IoT sensors without altering existing POS setups.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Requiere reemplazar el software o hardware de punto de venta existente?",
        "answer": "No. Arcana funciona de manera no invasiva conectándose al flujo de red, impresoras de comandas y sensores externos sin alterar el POS del local."
      }
    ],
    "2": [
      {
        "id": "rest-2-1",
        "category": "inversor",
        "question_es": "¿Cómo se traduce una fuga del 4% en el 50-100% de la utilidad anual del restaurante?",
        "question_en": "How does a 4% leakage wipe out 50-100% of annual restaurant profit?",
        "answer_es": "Dado que los márgenes netos del sector gastronómico oscilan entre el 3% y el 8%, cualquier fuga directa sobre ingresos brutos consume la totalidad de la ganancia limpia del dueño.",
        "answer_en": "Because restaurant net margins average between 3% and 8%, any direct 4% leakage on gross revenue wipes out the owner's entire net profit.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo se traduce una fuga del 4% en el 50-100% de la utilidad anual del restaurante?",
        "answer": "Dado que los márgenes netos del sector gastronómico oscilan entre el 3% y el 8%, cualquier fuga directa sobre ingresos brutos consume la totalidad de la ganancia limpia del dueño."
      },
      {
        "id": "rest-2-2",
        "category": "objecion",
        "question_es": "¿No basta con poner más cámaras de seguridad tradicionales CCTV?",
        "question_en": "Isn't adding more CCTV security cameras enough?",
        "answer_es": "Las cámaras convencionales graban terabytes sin correlación. Nadie revisa 12 horas de video diario. Arcana correlaciona eventos exactos con marcas de tiempo e incongruencias de ticket.",
        "answer_en": "Conventional CCTV records unindexed video terabytes that no owner has time to review. Arcana flags specific timestamped discrepancies automatically.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿No basta con poner más cámaras de seguridad tradicionales CCTV?",
        "answer": "Las cámaras convencionales graban terabytes sin correlación. Nadie revisa 12 horas de video diario. Arcana correlaciona eventos exactos con marcas de tiempo e incongruencias de ticket."
      }
    ],
    "3": [
      {
        "id": "rest-3-1",
        "category": "operativa",
        "question_es": "¿Cuáles son los 5 vectores del marco F.A.C.E.S. en la práctica?",
        "question_en": "What are the 5 vectors of the F.A.C.E.S. framework in practice?",
        "answer_es": "1) Facturación y tickets, 2) Almacén y compras, 3) Cocina y recetas estándar, 4) Efectivo y arqueos, 5) Salidas no autorizadas o mermas.",
        "answer_en": "1) Billing & voids, 2) Receiving & storage, 3) Kitchen recipe variance, 4) Cash drawer reconciliations, 5) Unauthorized waste and shrinkage.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuáles son los 5 vectores del marco F.A.C.E.S. en la práctica?",
        "answer": "1) Facturación y tickets, 2) Almacén y compras, 3) Cocina y recetas estándar, 4) Efectivo y arqueos, 5) Salidas no autorizadas o mermas."
      }
    ],
    "4": [
      {
        "id": "rest-4-1",
        "category": "inversor",
        "question_es": "¿Cuál es la propuesta de valor para el dueño en una sola frase?",
        "question_en": "What is the core value proposition for the restaurant owner?",
        "answer_es": "Demostrar matemáticamente lo comprado, cocinado y vendido sin necesidad de vivir vigilando encima del local.",
        "answer_en": "Mathematically proving what was bought, prepared, and sold without living on top of store operations.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es la propuesta de valor para el dueño en una sola frase?",
        "answer": "Demostrar matemáticamente lo comprado, cocinado y vendido sin necesidad de vivir vigilando encima del local."
      }
    ],
    "5": [
      {
        "id": "rest-5-1",
        "category": "operativa",
        "question_es": "¿Cómo se evitan manipulaciones en los sensores IoT?",
        "question_en": "How are IoT sensor tampering attempts prevented?",
        "answer_es": "Cada microcontrolador firma criptográficamente las lecturas en hardware antes de transmitirlas, impidiendo la alteración de datos por parte del personal.",
        "answer_en": "Every microcontroller cryptographically signs telemetry at the hardware enclave before transmission, preventing staff manipulation.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo se evitan manipulaciones en los sensores IoT?",
        "answer": "Cada microcontrolador firma criptográficamente las lecturas en hardware antes de transmitirlas, impidiendo la alteración de datos por parte del personal."
      }
    ],
    "6": [
      {
        "id": "rest-6-1",
        "category": "operativa",
        "question_es": "¿Qué pasa si se cae el Internet en el restaurante?",
        "question_en": "What happens if store internet goes down?",
        "answer_es": "Los nodos IoT almacenan las lecturas cifradas localmente en memoria no volátil y sincronizan automáticamente en cuanto se restablece la conexión.",
        "answer_en": "IoT edge nodes buffer encrypted records in non-volatile flash and automatically reconcile when connectivity resumes.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Qué pasa si se cae el Internet en el restaurante?",
        "answer": "Los nodos IoT almacenan las lecturas cifradas localmente en memoria no volátil y sincronizan automáticamente en cuanto se restablece la conexión."
      }
    ],
    "7": [
      {
        "id": "rest-7-1",
        "category": "inversor",
        "question_es": "¿Por qué un protocolo de cierre diario inalterable en blockchain?",
        "question_en": "Why implement an unalterable daily closing protocol on blockchain?",
        "answer_es": "Porque elimina discrepancias contables entre socios e inversionistas: nadie puede modificar los números de ventas ni costos una vez cerrado el turno.",
        "answer_en": "Because it eliminates accounting disputes between partners and franchisors: nobody can retroactively alter sales or cost logs.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Por qué un protocolo de cierre diario inalterable en blockchain?",
        "answer": "Porque elimina discrepancias contables entre socios e inversionistas: nadie puede modificar los números de ventas ni costos una vez cerrado el turno."
      }
    ],
    "8": [
      {
        "id": "rest-8-1",
        "category": "operativa",
        "question_es": "¿Cómo se realiza la liquidación y reparto de utilidades?",
        "question_en": "How are automated profit splits executed?",
        "answer_es": "Mediante reglas automáticas de split en smart contracts que liquidan diariamente o semanalmente en stablecoins (USDC) o transferencias bancarias directas.",
        "answer_en": "Through deterministic smart contract rules that disburse daily or weekly splits directly in USDC or bank payouts.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo se realiza la liquidación y reparto de utilidades?",
        "answer": "Mediante reglas automáticas de split en smart contracts que liquidan diariamente o semanalmente en stablecoins (USDC) o transferencias bancarias directas."
      }
    ],
    "9": [
      {
        "id": "rest-9-1",
        "category": "nota",
        "question_es": "Nota del presentador: Telemetría móvil para el propietario",
        "question_en": "Presenter Note: Mobile telemetry for the store owner",
        "answer_es": "Mostrar cómo el dueño recibe alertas directas en Telegram/WhatsApp cuando hay una discrepancia mayor al 2% entre peso de insumos y tickets.",
        "answer_en": "Demonstrate how the owner receives real-time Telegram/WhatsApp alerts when raw ingredient consumption diverges by >2% from sales tickets.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Telemetría móvil para el propietario",
        "answer": "Mostrar cómo el dueño recibe alertas directas en Telegram/WhatsApp cuando hay una discrepancia mayor al 2% entre peso de insumos y tickets."
      }
    ],
    "10": [
      {
        "id": "rest-10-1",
        "category": "inversor",
        "question_es": "¿Cuál es el tiempo de retorno de inversión (ROI) estimado para el piloto inicial?",
        "question_en": "What is the estimated payback period (ROI) for the pilot?",
        "answer_es": "El piloto se amortiza en menos de 45 días al recuperar un promedio de $1,200 a $3,500 USD mensuales en mermas y fraudes detectados por sucursal.",
        "answer_en": "The pilot achieves payback within 45 days by capturing $1,200 to $3,500 monthly in prevented food waste and shrinkage per unit.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es el tiempo de retorno de inversión (ROI) estimado para el piloto inicial?",
        "answer": "El piloto se amortiza en menos de 45 días al recuperar un promedio de $1,200 a $3,500 USD mensuales en mermas y fraudes detectados por sucursal."
      }
    ]
  },
  "fastfood": {
    "1": [
      {
        "id": "ff-1-1",
        "category": "inversor",
        "question_es": "¿Cuál es el margen operativo unitario proyectado del local automatizado?",
        "question_en": "What is the projected unit EBITDA margin of the automated store?",
        "answer_es": "Entre 28% y 34% de EBITDA gracias a la reducción del 60% de mano de obra en cocina y reducción de desperdicio a menos del 1.5%.",
        "answer_en": "Between 28% and 34% EBITDA margin driven by 60% kitchen labor reduction and shrinking ingredient waste under 1.5%.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es el margen operativo unitario proyectado del local automatizado?",
        "answer": "Entre 28% y 34% de EBITDA gracias a la reducción del 60% de mano de obra en cocina y reducción de desperdicio a menos del 1.5%."
      },
      {
        "id": "ff-1-2",
        "category": "nota",
        "question_es": "Nota del presentador: Tesis Smart QSR",
        "question_en": "Presenter Note: Smart QSR thesis",
        "answer_es": "El futuro de la comida rápida es la ingeniería de precisión: estandarización milimétrica de ingredientes y tiempos de horneado exactos.",
        "answer_en": "The future of fast food is precision engineering: exact portioning and calibrated continuous baking.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Tesis Smart QSR",
        "answer": "El futuro de la comida rápida es la ingeniería de precisión: estandarización milimétrica de ingredientes y tiempos de horneado exactos."
      }
    ],
    "2": [
      {
        "id": "ff-2-1",
        "category": "inversor",
        "question_es": "¿Cuáles son las 3 ineficiencias críticas que destruyen el margen tradicional?",
        "question_en": "What are the 3 critical inefficiencies crushing traditional restaurant margins?",
        "answer_es": "1) Alta rotación y costo laboral en cocina, 2) Variabilidad en porciones y desperdicio de insumos, 3) Cuellos de botella en horas pico.",
        "answer_en": "1) High kitchen turnover & labor costs, 2) Portion variability & food waste, 3) Peak-hour bottlenecks.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuáles son las 3 ineficiencias críticas que destruyen el margen tradicional?",
        "answer": "1) Alta rotación y costo laboral en cocina, 2) Variabilidad en porciones y desperdicio de insumos, 3) Cuellos de botella en horas pico."
      }
    ],
    "3": [
      {
        "id": "ff-3-1",
        "category": "operativa",
        "question_es": "¿Cómo opera el horno continuo de alta velocidad en horas pico?",
        "question_en": "How does the high-speed continuous oven perform during peak rush?",
        "answer_es": "Cocción automatizada por cinta transportadora calibrada que hornea una pizza cada 120 segundos sin intervención manual en el proceso térmico.",
        "answer_en": "Calibrated conveyor belt baking producing a fresh pizza every 120 seconds with zero manual thermal handling.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo opera el horno continuo de alta velocidad en horas pico?",
        "answer": "Cocción automatizada por cinta transportadora calibrada que hornea una pizza cada 120 segundos sin intervención manual en el proceso térmico."
      }
    ],
    "4": [
      {
        "id": "ff-4-1",
        "category": "inversor",
        "question_es": "¿Comparativa directa con franquicias tradicionales?",
        "question_en": "How does it compare against traditional franchise models?",
        "answer_es": "40% menor Capex de apertura, 65% menos personal en cocina y punto de equilibrio alcanzable con solo 60 pedidos diarios.",
        "answer_en": "40% lower opening Capex, 65% fewer kitchen staff, and breakeven reachable with just 60 daily orders.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Comparativa directa con franquicias tradicionales?",
        "answer": "40% menor Capex de apertura, 65% menos personal en cocina y punto de equilibrio alcanzable con solo 60 pedidos diarios."
      }
    ],
    "5": [
      {
        "id": "ff-5-1",
        "category": "nota",
        "question_es": "Nota: ¿Por qué Cúcuta como ciudad piloto?",
        "question_en": "Note: Why Cúcuta as the initial pilot market?",
        "answer_es": "Costos operativos eficientes, alta densidad de consumo de comida rápida y mercado ideal para validar la ingeniería antes de escalar a Bogotá y Medellín.",
        "answer_en": "Efficient operating costs, dense fast-food consumption, and ideal market dynamics to validate engineering before national rollout.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota: ¿Por qué Cúcuta como ciudad piloto?",
        "answer": "Costos operativos eficientes, alta densidad de consumo de comida rápida y mercado ideal para validar la ingeniería antes de escalar a Bogotá y Medellín."
      }
    ],
    "6": [
      {
        "id": "ff-6-1",
        "category": "operativa",
        "question_es": "¿Qué equipamiento automatizado compone la cocina?",
        "question_en": "What automated machinery equips the modular kitchen?",
        "answer_es": "Prensas neumáticas de masa, dosificadores volumétricos de salsa y queso, y hornos de túnel continuo con control PID.",
        "answer_en": "Pneumatic dough presses, volumetric sauce & cheese dispensers, and PID-controlled continuous tunnel ovens.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Qué equipamiento automatizado compone la cocina?",
        "answer": "Prensas neumáticas de masa, dosificadores volumétricos de salsa y queso, y hornos de túnel continuo con control PID."
      }
    ],
    "7": [
      {
        "id": "ff-7-1",
        "category": "operativa",
        "question_es": "¿Cómo se gestiona el inventario en tiempo real?",
        "question_en": "How is real-time inventory reconciled?",
        "answer_es": "Básculas conectadas por IoT descuentan automáticamente gramos de queso, masa y proteínas con cada orden emitida en el KDS.",
        "answer_en": "IoT smart scales deduct exact grams of dough, cheese, and proteins in real time with each ticket fired on the KDS.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo se gestiona el inventario en tiempo real?",
        "answer": "Básculas conectadas por IoT descuentan automáticamente gramos de queso, masa y proteínas con cada orden emitida en el KDS."
      }
    ],
    "8": [
      {
        "id": "ff-8-1",
        "category": "inversor",
        "question_es": "¿Cuál es el costo unitario de producto (Food Cost)?",
        "question_en": "What is the targeted unit Food Cost percentage?",
        "answer_es": "Estandarizado en 26% de costo de materia prima gracias a cero sobreporciones y compras centralizadas de insumos.",
        "answer_en": "Standardized at 26% of gross sales due to zero over-portioning and centralized ingredient sourcing.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es el costo unitario de producto (Food Cost)?",
        "answer": "Estandarizado en 26% de costo de materia prima gracias a cero sobreporciones y compras centralizadas de insumos."
      }
    ],
    "9": [
      {
        "id": "ff-9-1",
        "category": "nota",
        "question_es": "Nota: Experiencia del cliente y rapidez",
        "question_en": "Note: Customer experience & turnaround speed",
        "answer_es": "Tiempo promedio desde que el cliente ordena en el kiosco hasta la entrega en mano: menos de 3.5 minutos.",
        "answer_en": "Average time from digital kiosk ordering to hot box handoff: under 3.5 minutes.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota: Experiencia del cliente y rapidez",
        "answer": "Tiempo promedio desde que el cliente ordena en el kiosco hasta la entrega en mano: menos de 3.5 minutos."
      }
    ],
    "10": [
      {
        "id": "ff-10-1",
        "category": "inversor",
        "question_es": "¿Cómo es el modelo de expansión de la franquicia?",
        "question_en": "What does the franchise expansion blueprint look like?",
        "answer_es": "Locales compactos tipo Dark Kitchen y Express (35–50 m2) con bajo arriendo y rápido despliegue modular.",
        "answer_en": "Compact Express & Dark Kitchen footprints (35–50 sqm) with low lease overhead and modular setup.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo es el modelo de expansión de la franquicia?",
        "answer": "Locales compactos tipo Dark Kitchen y Express (35–50 m2) con bajo arriendo y rápido despliegue modular."
      }
    ],
    "11": [
      {
        "id": "ff-11-1",
        "category": "inversor",
        "question_es": "¿Tamaño del mercado objetivo accesible (TAM/SAM)?",
        "question_en": "What is the Total and Serviceable Addressable Market (TAM/SAM)?",
        "answer_es": "Mercado QSR regional de pizza y comida rápida superior a $450M USD en ciudades intermedias de Colombia.",
        "answer_en": "Regional pizza & fast food QSR market exceeding $450M USD across intermediate cities in Colombia.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Tamaño del mercado objetivo accesible (TAM/SAM)?",
        "answer": "Mercado QSR regional de pizza y comida rápida superior a $450M USD en ciudades intermedias de Colombia."
      }
    ],
    "12": [
      {
        "id": "ff-12-1",
        "category": "operativa",
        "question_es": "¿Mantenimiento preventivo del equipamiento?",
        "question_en": "How is preventive equipment maintenance handled?",
        "answer_es": "Telemetría IoT predice desgaste de resistencias, motores de cinta y sensores de temperatura antes de que ocurra una falla.",
        "answer_en": "IoT telemetry monitors heating elements, belt motor torque, and thermal probes to predict maintenance before breakdowns.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Mantenimiento preventivo del equipamiento?",
        "answer": "Telemetría IoT predice desgaste de resistencias, motores de cinta y sensores de temperatura antes de que ocurra una falla."
      }
    ],
    "13": [
      {
        "id": "ff-13-1",
        "category": "nota",
        "question_es": "Nota: Hoja de ruta a 12 meses",
        "question_en": "Note: 12-month execution roadmap",
        "answer_es": "Mes 1-3: Piloto insignia. Mes 4-6: Apertura de 3 locales propios. Mes 7-12: Franquiciamiento a operadores terceros.",
        "answer_en": "Months 1-3: Flagship pilot. Months 4-6: 3 company-owned stores. Months 7-12: Franchise onboarding to third-party operators.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota: Hoja de ruta a 12 meses",
        "answer": "Mes 1-3: Piloto insignia. Mes 4-6: Apertura de 3 locales propios. Mes 7-12: Franquiciamiento a operadores terceros."
      }
    ],
    "14": [
      {
        "id": "ff-14-1",
        "category": "inversor",
        "question_es": "¿Monto de la ronda de inversión y asignación de fondos?",
        "question_en": "Seed round size and capital allocation?",
        "answer_es": "Ronda Semilla de $120,000 USD destinada a equipamiento de cocina automatizada (55%), adecuación del local (25%) y capital de trabajo (20%).",
        "answer_en": "$120,000 USD Seed Round allocated to kitchen automation (55%), store fit-out (25%), and working capital (20%).",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Monto de la ronda de inversión y asignación de fondos?",
        "answer": "Ronda Semilla de $120,000 USD destinada a equipamiento de cocina automatizada (55%), adecuación del local (25%) y capital de trabajo (20%)."
      }
    ],
    "15": [
      {
        "id": "ff-15-1",
        "category": "inversor",
        "question_es": "¿Cierre ejecutivo y retorno para el inversionista?",
        "question_en": "Executive closing & investor returns?",
        "answer_es": "ROI proyectado de 22 meses con distribución trimestral de dividendos y valorización de la marca franquiciable.",
        "answer_en": "22-month projected payback with quarterly dividend distribution and brand enterprise equity upside.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cierre ejecutivo y retorno para el inversionista?",
        "answer": "ROI proyectado de 22 meses con distribución trimestral de dividendos y valorización de la marca franquiciable."
      }
    ]
  },
  "tutor": {
    "1": [
      {
        "id": "tut-1-1",
        "category": "inversor",
        "question_es": "¿Por qué un sistema Multi-Agente supera a ChatGPT / Claude estándar para educación?",
        "question_en": "Why does a Multi-Agent architecture outperform generic LLM chatbots for education?",
        "answer_es": "Los LLMs genéricos resuelven la tarea por el alumno. El sistema 3i tiene agentes especializados en pedagogía socrática que guían paso a paso y evalúan comprensión real.",
        "answer_en": "Generic LLMs simply hand out answers. The 3i multi-agent system uses specialized pedagogical agents that guide Socratic reasoning and verify cognitive retention.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Por qué un sistema Multi-Agente supera a ChatGPT / Claude estándar para educación?",
        "answer": "Los LLMs genéricos resuelven la tarea por el alumno. El sistema 3i tiene agentes especializados en pedagogía socrática que guían paso a paso y evalúan comprensión real."
      },
      {
        "id": "tut-1-2",
        "category": "nota",
        "question_es": "Nota del presentador: Enfoque DeepTech",
        "question_en": "Presenter Note: DeepTech differentiation",
        "answer_es": "Subrayar que no somos un simple wrapper de OpenAI; contamos con grafos de conocimiento y memoria persistente en 3 niveles.",
        "answer_en": "Highlight that 3i is not an API wrapper; it deploys custom knowledge graphs and a 3-tier persistent cognitive memory architecture.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Enfoque DeepTech",
        "answer": "Subrayar que no somos un simple wrapper de OpenAI; contamos con grafos de conocimiento y memoria persistente en 3 niveles."
      }
    ],
    "2": [
      {
        "id": "tut-2-1",
        "category": "inversor",
        "question_es": "¿Cuál es el cuello de botella de $300B en educación?",
        "question_en": "What is the $300B bottleneck in education?",
        "answer_es": "El 85% de los estudiantes que usan chatbots tradicionales experimentan una falsa sensación de aprendizaje sin retención a largo plazo.",
        "answer_en": "85% of students using generic AI chatbots suffer from illusion of competence without genuine long-term knowledge retention.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es el cuello de botella de $300B en educación?",
        "answer": "El 85% de los estudiantes que usan chatbots tradicionales experimentan una falsa sensación de aprendizaje sin retención a largo plazo."
      }
    ],
    "3": [
      {
        "id": "tut-3-1",
        "category": "operativa",
        "question_es": "¿Cómo funciona la arquitectura socrática multi-agente?",
        "question_en": "How does the Socratic multi-agent architecture operate?",
        "answer_es": "El Agente Pedagogo formula preguntas guiadas; el Agente Evaluador mide comprensión; el Agente Psicólogo ajusta el tono motivacional según la frustración del estudiante.",
        "answer_en": "The Pedagogical Agent crafts scaffolded questions; the Evaluator verifies understanding; the Behavioral Agent adapts tone to student cognitive load.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo funciona la arquitectura socrática multi-agente?",
        "answer": "El Agente Pedagogo formula preguntas guiadas; el Agente Evaluador mide comprensión; el Agente Psicólogo ajusta el tono motivacional según la frustración del estudiante."
      }
    ],
    "4": [
      {
        "id": "tut-4-1",
        "category": "inversor",
        "question_es": "¿Ventaja competitiva frente a Khan Academy o Duolingo?",
        "question_en": "Competitive advantage against Khan Academy or Duolingo?",
        "answer_es": "Adaptabilidad en tiempo real a currículos universitarios y corporativos complejos con verificación criptográfica de dominio de conceptos.",
        "answer_en": "Dynamic real-time scaffolding for advanced university/corporate STEM curricula paired with verifiable Proof-of-Mastery.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Ventaja competitiva frente a Khan Academy o Duolingo?",
        "answer": "Adaptabilidad en tiempo real a currículos universitarios y corporativos complejos con verificación criptográfica de dominio de conceptos."
      }
    ],
    "5": [
      {
        "id": "tut-5-1",
        "category": "operativa",
        "question_es": "¿Cuáles son las 4 escuadras de agentes?",
        "question_en": "What are the 4 specialized agent squads?",
        "answer_es": "1. Escuadra de Diagnóstico, 2. Escuadra Pedagógica, 3. Escuadra de Verificación STEM, 4. Escuadra de Síntesis y Memoria.",
        "answer_en": "1. Diagnostic Squad, 2. Pedagogical Squad, 3. STEM Verification Squad, 4. Synthesis & Memory Squad.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuáles son las 4 escuadras de agentes?",
        "answer": "1. Escuadra de Diagnóstico, 2. Escuadra Pedagógica, 3. Escuadra de Verificación STEM, 4. Escuadra de Síntesis y Memoria."
      }
    ],
    "6": [
      {
        "id": "tut-6-1",
        "category": "operativa",
        "question_es": "¿Cómo opera la memoria en 3 capas?",
        "question_en": "How does the 3-tier memory engine work?",
        "answer_es": "Capa 1: Contexto de sesión activa. Capa 2: Grafo de conceptos dominados del estudiante. Capa 3: Memoria episódica a largo plazo de vacíos cognitivos.",
        "answer_en": "Tier 1: Active session context. Tier 2: Individual concept mastery graph. Tier 3: Long-term episodic memory tracking learning gaps.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo opera la memoria en 3 capas?",
        "answer": "Capa 1: Contexto de sesión activa. Capa 2: Grafo de conceptos dominados del estudiante. Capa 3: Memoria episódica a largo plazo de vacíos cognitivos."
      }
    ],
    "7": [
      {
        "id": "tut-7-1",
        "category": "nota",
        "question_es": "Nota: Grafos de conocimiento dinámicos",
        "question_en": "Note: Dynamic knowledge graph traversal",
        "answer_es": "Explicar cómo el tutor identifica si un estudiante falla en cálculo porque en realidad tiene un vacío previo en factorización algebraica.",
        "answer_en": "Demonstrate how the tutor diagnoses that a calculus error is rooted in an earlier algebraic factoring misunderstanding.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota: Grafos de conocimiento dinámicos",
        "answer": "Explicar cómo el tutor identifica si un estudiante falla en cálculo porque en realidad tiene un vacío previo en factorización algebraica."
      }
    ],
    "8": [
      {
        "id": "tut-8-1",
        "category": "inversor",
        "question_es": "¿Qué es la Prueba Verificable de Dominio (Proof-of-Mastery)?",
        "question_en": "What is the Verifiable Proof-of-Mastery credential?",
        "answer_es": "Credenciales emitidas en base a resolución autónoma de problemas sin trampas, validables por empleadores y universidades.",
        "answer_en": "Tamper-proof credentials issued upon unassisted mastery problem-solving, verifiable by universities and employers.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Qué es la Prueba Verificable de Dominio (Proof-of-Mastery)?",
        "answer": "Credenciales emitidas en base a resolución autónoma de problemas sin trampas, validables por empleadores y universidades."
      }
    ],
    "9": [
      {
        "id": "tut-9-1",
        "category": "operativa",
        "question_es": "¿Stack tecnológico de la infraestructura?",
        "question_en": "Technical infrastructure stack?",
        "answer_es": "Orquestación en LangGraph/LlamaIndex, base de datos vectorial Qdrant, almacenamiento en grafos Neo4j e inferencia híbrida.",
        "answer_en": "Orchestration with LangGraph/LlamaIndex, Qdrant vector database, Neo4j knowledge graphs, and hybrid inference.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Stack tecnológico de la infraestructura?",
        "answer": "Orquestación en LangGraph/LlamaIndex, base de datos vectorial Qdrant, almacenamiento en grafos Neo4j e inferencia híbrida."
      }
    ],
    "10": [
      {
        "id": "tut-10-1",
        "category": "inversor",
        "question_es": "¿Tamaño del mercado EdTech accesible?",
        "question_en": "Total accessible EdTech market size?",
        "answer_es": "$180B USD en los 3 niveles: K-12, Educación Superior y Reskilling corporativo B2B.",
        "answer_en": "$180B USD across 3 verticals: K-12, Higher Education, and Corporate B2B reskilling.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Tamaño del mercado EdTech accesible?",
        "answer": "$180B USD en los 3 niveles: K-12, Educación Superior y Reskilling corporativo B2B."
      }
    ],
    "11": [
      {
        "id": "tut-11-1",
        "category": "inversor",
        "question_es": "¿Modelo de monetización?",
        "question_en": "Monetization model?",
        "answer_es": "SaaS recurrente B2C ($19/mes por estudiante) y licencias institucionales B2B ($8/alumno/mes para colegios y universidades).",
        "answer_en": "Recurring B2C SaaS ($19/student/month) and enterprise B2B licensing ($8/student/month for universities and schools).",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Modelo de monetización?",
        "answer": "SaaS recurrente B2C ($19/mes por estudiante) y licencias institucionales B2B ($8/alumno/mes para colegios y universidades)."
      }
    ],
    "12": [
      {
        "id": "tut-12-1",
        "category": "nota",
        "question_es": "Nota: Métricas de tracción inicial",
        "question_en": "Note: Early traction benchmarks",
        "answer_es": "Piloto con más de 1,200 estudiantes activos con una retención mensual del 78% y mejora del 34% en calificaciones de exámenes.",
        "answer_en": "Pilot of 1,200+ active learners showing 78% monthly retention and a 34% average exam score improvement.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota: Métricas de tracción inicial",
        "answer": "Piloto con más de 1,200 estudiantes activos con una retención mensual del 78% y mejora del 34% en calificaciones de exámenes."
      }
    ],
    "13": [
      {
        "id": "tut-13-1",
        "category": "nota",
        "question_es": "Nota: Hoja de ruta estratégica a 18 meses",
        "question_en": "Note: 18-month strategic roadmap",
        "answer_es": "Fase 1: Dominio de STEM y programación. Fase 2: Expansión a idiomas y ciencias humanas. Fase 3: Integración con plataformas universitarias LMS.",
        "answer_en": "Phase 1: STEM & coding mastery. Phase 2: Languages & humanities expansion. Phase 3: Global LMS integrations.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota: Hoja de ruta estratégica a 18 meses",
        "answer": "Fase 1: Dominio de STEM y programación. Fase 2: Expansión a idiomas y ciencias humanas. Fase 3: Integración con plataformas universitarias LMS."
      }
    ],
    "14": [
      {
        "id": "tut-14-1",
        "category": "inversor",
        "question_es": "¿Ronda de inversión Semilla?",
        "question_en": "Seed fundraising round?",
        "answer_es": "Buscamos $1.2M USD para perfeccionamiento del motor multi-agente (50%), expansión comercial B2B (35%) y operaciones (15%).",
        "answer_en": "Raising $1.2M USD for multi-agent engine development (50%), B2B enterprise sales (35%), and operations (15%).",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Ronda de inversión Semilla?",
        "answer": "Buscamos $1.2M USD para perfeccionamiento del motor multi-agente (50%), expansión comercial B2B (35%) y operaciones (15%)."
      }
    ],
    "15": [
      {
        "id": "tut-15-1",
        "category": "inversor",
        "question_es": "¿Cierre ejecutivo de la visión?",
        "question_en": "Executive closing vision?",
        "answer_es": "Estamos construyendo la infraestructura de inteligencia artificial que democratizará la tutoría de élite personalizada para millones de personas.",
        "answer_en": "We are building the AI infrastructure to democratize world-class elite 1-on-1 tutoring for millions of learners worldwide.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cierre ejecutivo de la visión?",
        "answer": "Estamos construyendo la infraestructura de inteligencia artificial que democratizará la tutoría de élite personalizada para millones de personas."
      }
    ]
  },
  "arcana": {
    "1": [
      {
        "id": "arc-1-1",
        "category": "inversor",
        "question_es": "¿Por qué anclar la contabilidad en Polygon en lugar de una base de datos PostgreSQL tradicional?",
        "question_en": "Why anchor accounting on Polygon instead of a standard PostgreSQL database?",
        "answer_es": "Porque garantiza inmutabilidad criptográfica. Ni el dueño de la franquicia ni el franquiciado pueden alterar los registros de ventas y repartos una vez firmados por las máquinas.",
        "answer_en": "Because it guarantees cryptographic immutability. Neither the franchisor nor the operator can tamper with sales or split records once machine-signed.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Por qué anclar la contabilidad en Polygon en lugar de una base de datos PostgreSQL tradicional?",
        "answer": "Porque garantiza inmutabilidad criptográfica. Ni el dueño de la franquicia ni el franquiciado pueden alterar los registros de ventas y repartos una vez firmados por las máquinas."
      },
      {
        "id": "arc-1-2",
        "category": "nota",
        "question_es": "Nota del presentador: Confianza por Construcción",
        "question_en": "Presenter Note: Trust by Construction thesis",
        "answer_es": "Enfatizar el concepto: 'No le pidas al inversor que confíe en personas; dale un sistema donde las máquinas firman la verdad matemática'.",
        "answer_en": "Emphasize the core concept: 'Do not ask investors to trust humans; provide a framework where physical machines sign mathematical truth'.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Confianza por Construcción",
        "answer": "Enfatizar el concepto: 'No le pidas al inversor que confíe en personas; dale un sistema donde las máquinas firman la verdad matemática'."
      }
    ],
    "2": [
      {
        "id": "arc-2-1",
        "category": "inversor",
        "question_es": "¿Cuál es el problema central entre franquiciador y franquiciado?",
        "question_en": "What is the core friction between franchisors and franchisees?",
        "answer_es": "La asimetría de información: el inversionista pasivo no está en el local y sospecha de sub-declaración de ventas, mientras el operador resiente la fiscalización constante.",
        "answer_en": "Information asymmetry: passive investors fear revenue underreporting, while operators resent intrusive auditing.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es el problema central entre franquiciador y franquiciado?",
        "answer": "La asimetría de información: el inversionista pasivo no está en el local y sospecha de sub-declaración de ventas, mientras el operador resiente la fiscalización constante."
      }
    ],
    "3": [
      {
        "id": "arc-3-1",
        "category": "nota",
        "question_es": "Nota: Tesis de inversión de Arcana",
        "question_en": "Note: Arcana investment thesis",
        "answer_es": "Transformar cada local comercial en un libro contable auditable en tiempo real mediante sensores IoT no manipulables.",
        "answer_en": "Transforming physical stores into real-time auditable balance sheets via tamper-proof IoT telemetry.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota: Tesis de inversión de Arcana",
        "answer": "Transformar cada local comercial en un libro contable auditable en tiempo real mediante sensores IoT no manipulables."
      }
    ],
    "4": [
      {
        "id": "arc-4-1",
        "category": "operativa",
        "question_es": "¿Qué es Arcana y qué NO es?",
        "question_en": "What Arcana IS and what it is NOT?",
        "answer_es": "Arcana ES una capa de auditoría física y liquidación automática. NO es un software contable tradicional ni un punto de venta más.",
        "answer_en": "Arcana IS an automated physical audit and settlement layer. It is NOT another standard ERP or POS software.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Qué es Arcana y qué NO es?",
        "answer": "Arcana ES una capa de auditoría física y liquidación automática. NO es un software contable tradicional ni un punto de venta más."
      }
    ],
    "5": [
      {
        "id": "arc-5-1",
        "category": "operativa",
        "question_es": "¿Cómo garantizan que el hardware IoT sea inviolable?",
        "question_en": "How is IoT hardware security ensured?",
        "answer_es": "Chips con enclave criptográfico seguro que firman cada paquete de telemetría con clave privada embebida en silicio.",
        "answer_en": "Secure hardware enclaves signing each telemetry packet with silicon-embedded private keys.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo garantizan que el hardware IoT sea inviolable?",
        "answer": "Chips con enclave criptográfico seguro que firman cada paquete de telemetría con clave privada embebida en silicio."
      }
    ],
    "6": [
      {
        "id": "arc-6-1",
        "category": "operativa",
        "question_es": "¿Cómo funciona el motor de correlación de fraude multi-vector?",
        "question_en": "How does the multi-vector fraud correlation engine work?",
        "answer_es": "Cruza simultáneamente aperturas de gaveta de dinero, peso de insumos consumidos y tickets emitidos para detectar transacciones fantasma.",
        "answer_en": "It cross-references cash drawer triggers, ingredient scale depletion, and POS receipts to catch ghost sales.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo funciona el motor de correlación de fraude multi-vector?",
        "answer": "Cruza simultáneamente aperturas de gaveta de dinero, peso de insumos consumidos y tickets emitidos para detectar transacciones fantasma."
      }
    ],
    "7": [
      {
        "id": "arc-7-1",
        "category": "operativa",
        "question_es": "¿Cómo es el protocolo de cierre diario en Polygon?",
        "question_en": "How does the Polygon daily closing protocol operate?",
        "answer_es": "Al terminar la jornada, se genera un hash criptográfico con todos los eventos del día y se acuña en la blockchain con costo de transacción despreciable.",
        "answer_en": "At end-of-day, a Merkle hash summarizing all events is minted onto Polygon with sub-cent gas fees.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo es el protocolo de cierre diario en Polygon?",
        "answer": "Al terminar la jornada, se genera un hash criptográfico con todos los eventos del día y se acuña en la blockchain con costo de transacción despreciable."
      }
    ],
    "8": [
      {
        "id": "arc-8-1",
        "category": "inversor",
        "question_es": "¿Cómo se realiza la liquidación de regalías y utilidades en USDC?",
        "question_en": "How are royalty and profit splits disbursed in USDC?",
        "answer_es": "Smart contracts ejecutan la distribución inmediata de porcentajes pactados hacia las billeteras o cuentas de los socios sin intermediación humana.",
        "answer_en": "Deterministic smart contracts execute instant payouts to partner wallets with zero manual intermediaries.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo se realiza la liquidación de regalías y utilidades en USDC?",
        "answer": "Smart contracts ejecutan la distribución inmediata de porcentajes pactados hacia las billeteras o cuentas de los socios sin intermediación humana."
      }
    ],
    "9": [
      {
        "id": "arc-9-1",
        "category": "nota",
        "question_es": "Nota: Dashboard del Inversionista en tiempo real",
        "question_en": "Note: Real-time Investor Dashboard",
        "answer_es": "Demostrar cómo el inversor abre su app móvil y ve la facturación en vivo de 10 locales sincronizados con prueba criptográfica.",
        "answer_en": "Showcase how investors monitor live revenue across 10 franchise units with verified cryptographic proof.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota: Dashboard del Inversionista en tiempo real",
        "answer": "Demostrar cómo el inversor abre su app móvil y ve la facturación en vivo de 10 locales sincronizados con prueba criptográfica."
      }
    ],
    "10": [
      {
        "id": "arc-10-1",
        "category": "inversor",
        "question_es": "¿Modelo de negocio y monetización de Arcana?",
        "question_en": "Business model and unit economics?",
        "answer_es": "SaaS recurrente por local ($99 USD/mes) + Take-rate del 0.75% sobre las liquidaciones procesadas a través del protocolo.",
        "answer_en": "Recurring SaaS ($99 USD/store/month) + 0.75% take-rate on all automated on-chain settlements.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Modelo de negocio y monetización de Arcana?",
        "answer": "SaaS recurrente por local ($99 USD/mes) + Take-rate del 0.75% sobre las liquidaciones procesadas a través del protocolo."
      }
    ],
    "11": [
      {
        "id": "arc-11-1",
        "category": "inversor",
        "question_es": "¿Tamaño del mercado de franquicias?",
        "question_en": "Global franchise market opportunity?",
        "answer_es": "Mercado global de franquicias superior a $800B USD con más de 750,000 establecimientos que sufren problemas de auditoría y confianza.",
        "answer_en": "$800B+ global franchise ecosystem with 750,000+ units facing structural trust and audit friction.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Tamaño del mercado de franquicias?",
        "answer": "Mercado global de franquicias superior a $800B USD con más de 750,000 establecimientos que sufren problemas de auditoría y confianza."
      }
    ],
    "12": [
      {
        "id": "arc-12-1",
        "category": "nota",
        "question_es": "Nota: Primera integración insignia con Smart Fast-Food",
        "question_en": "Note: Flagship integration with Smart Fast-Food",
        "answer_es": "El piloto con la cadena Smart Fast-Food de 3i Baird Lab sirve como caso de éxito validado para vender la solución a terceros.",
        "answer_en": "The pilot with 3i Baird Lab's Smart Fast-Food chain serves as the proving ground for commercial multi-brand rollout.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota: Primera integración insignia con Smart Fast-Food",
        "answer": "El piloto con la cadena Smart Fast-Food de 3i Baird Lab sirve como caso de éxito validado para vender la solución a terceros."
      }
    ],
    "13": [
      {
        "id": "arc-13-1",
        "category": "nota",
        "question_es": "Nota: Hoja de ruta estratégica",
        "question_en": "Note: Strategic expansion roadmap",
        "answer_es": "De 1 local piloto a 20 locales en 6 meses, escalando a más de 100 franquicias conectadas en el mes 18.",
        "answer_en": "From 1 pilot store to 20 units in 6 months, scaling to 100+ connected locations by month 18.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota: Hoja de ruta estratégica",
        "answer": "De 1 local piloto a 20 locales en 6 meses, escalando a más de 100 franquicias conectadas en el mes 18."
      }
    ],
    "14": [
      {
        "id": "arc-14-1",
        "category": "inversor",
        "question_es": "¿Ronda Semilla de Inversión?",
        "question_en": "Seed fundraising round?",
        "answer_es": "Ronda de $750,000 USD para desarrollo de firmware IoT (40%), auditorías de smart contracts (25%) y despliegue comercial (35%).",
        "answer_en": "Raising $750,000 USD for IoT firmware (40%), smart contract audits (25%), and commercial deployment (35%).",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Ronda Semilla de Inversión?",
        "answer": "Ronda de $750,000 USD para desarrollo de firmware IoT (40%), auditorías de smart contracts (25%) y despliegue comercial (35%)."
      }
    ],
    "15": [
      {
        "id": "arc-15-1",
        "category": "inversor",
        "question_es": "¿Cierre ejecutivo de Arcana Trust Network?",
        "question_en": "Executive closing vision for Arcana?",
        "answer_es": "El futuro de las inversiones en franquicias es verificable. Convertimos negocios físicos en activos líquidos, auditables y transparentes.",
        "answer_en": "The future of retail franchise investment is verifiable. We turn physical businesses into liquid, auditable, and transparent assets.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cierre ejecutivo de Arcana Trust Network?",
        "answer": "El futuro de las inversiones en franquicias es verificable. Convertimos negocios físicos en activos líquidos, auditables y transparentes."
      }
    ]
  }
};

function getActiveLang() {
  const htmlLang = document.documentElement.getAttribute('data-lang');
  return htmlLang === 'en' ? 'en' : (htmlLang === 'es' ? 'es' : currentLang);
}

function getCommentQuestion(item, lang = getActiveLang()) {
  if (!item) return '';
  if (lang === 'en') {
    return item.question_en || item.question_es || item.question || '';
  }
  return item.question_es || item.question_en || item.question || '';
}

function getCommentAnswer(item, lang = getActiveLang()) {
  if (!item) return '';
  if (lang === 'en') {
    return item.answer_en || item.answer_es || item.answer || '';
  }
  return item.answer_es || item.answer_en || item.answer || '';
}

function hydrateNoteFromPreset(item, preset) {
  if (!item || !preset) return item;
  if (preset.question_es) item.question_es = preset.question_es;
  if (preset.question_en) item.question_en = preset.question_en;
  if (preset.answer_es) item.answer_es = preset.answer_es;
  if (preset.answer_en) item.answer_en = preset.answer_en;
  if (preset.category) item.category = preset.category;
  return item;
}

function getSlideNotesKey(deck, slide) {
  return `baird_notes_${deck}_${slide}`;
}

function getSlideNotes(deck, slide) {
  if (!deck || deck === 'hub') return [];
  const key = getSlideNotesKey(deck, slide);
  const stored = localStorage.getItem(key);
  const deckPresets = CURATED_SLIDE_QA[deck];
  const presets = deckPresets ? (deckPresets[slide] || deckPresets[String(slide)]) : null;

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let migrated = false;
        if (presets && Array.isArray(presets)) {
          const presetMap = new Map(presets.map(p => [p.id, p]));
          parsed.forEach(item => {
            const before = JSON.stringify(item);
            if (item.id && presetMap.has(item.id)) {
              hydrateNoteFromPreset(item, presetMap.get(item.id));
            } else {
              const itemQuestion = (item.question_es || item.question || '').trim().toLowerCase();
              const match = presets.find(p => {
                const presetQuestion = (p.question_es || p.question || '').trim().toLowerCase();
                return itemQuestion && presetQuestion === itemQuestion;
              });
              if (match) hydrateNoteFromPreset(item, match);
            }
            if (JSON.stringify(item) !== before) migrated = true;
          });
        }
        if (migrated) saveSlideNotes(deck, slide, parsed);
        return parsed;
      }
    } catch (e) {
      console.warn('Error parsing stored slide notes:', e);
    }
  }

  // Fallback to Curated presets if available and initialize
  if (presets && Array.isArray(presets)) {
    saveSlideNotes(deck, slide, presets);
    return presets;
  }

  return [];
}

function saveSlideNotes(deck, slide, notesArray) {
  if (!deck || deck === 'hub') return;
  const key = getSlideNotesKey(deck, slide);
  localStorage.setItem(key, JSON.stringify(notesArray));
  updateCommentsCounterBadge();
}

function updateCommentsCounterBadge() {
  const floatingBtn = document.getElementById('floatingCommentsBtn');
  const countBadge = document.getElementById('floatingCommentsCount');
  const tabBadge = document.getElementById('tabCountBadge');

  if (activeDeck === 'hub') {
    if (floatingBtn) floatingBtn.style.display = 'none';
    return;
  }

  if (floatingBtn) floatingBtn.style.display = 'inline-flex';

  const notes = getSlideNotes(activeDeck, currentSlide);
  const count = notes.length;

  if (countBadge) countBadge.textContent = count;
  if (tabBadge) tabBadge.textContent = count;

  if (floatingBtn) {
    if (count > 0) floatingBtn.classList.add('has-comments');
    else floatingBtn.classList.remove('has-comments');
  }
}

function toggleCommentsDrawer() {
  if (activeDeck === 'hub') return;
  if (isCommentsOpen) closeCommentsDrawer();
  else openCommentsDrawer();
}

function updateCommentsDrawerHeader() {
  if (activeDeck === 'hub') return;
  const lang = getActiveLang();
  const meta = DECK_CONFIG[activeDeck] || DECK_CONFIG.hub;
  const kickerEl = document.getElementById('commentsDeckKicker');
  const titleEl = document.getElementById('commentsSlideTitle');
  const subEl = document.getElementById('commentsSlideSubtitle');

  const deckName = lang === 'es' ? (meta.title_es || activeDeck) : (meta.title_en || activeDeck);
  if (kickerEl) kickerEl.textContent = `3i BAIRD LAB · ${deckName.toUpperCase()}`;

  // Get active slide title in current language
  let activeSlideHeading = lang === 'es'
    ? `Diapositiva ${currentSlide} / ${totalSlides()}`
    : `Slide ${currentSlide} / ${totalSlides()}`;

  const activeContainer = document.getElementById(`deck-${activeDeck}`);
  if (activeContainer) {
    const curSlideEl = activeContainer.querySelector(`.slide[data-slide="${currentSlide}"]`);
    if (curSlideEl) {
      const h2 = curSlideEl.querySelector('h2');
      if (h2) {
        const langEl = h2.querySelector(`.lang-${lang}`);
        if (langEl) activeSlideHeading = langEl.textContent.trim();
        else activeSlideHeading = h2.textContent.trim();
      }
    }
  }

  if (titleEl) titleEl.textContent = `SLIDE ${currentSlide < 10 ? '0' + currentSlide : currentSlide}: ${activeSlideHeading}`;
  if (subEl) subEl.textContent = lang === 'es'
    ? 'Preguntas inyectadas, puntos clave y comentarios del presentador'
    : 'Injected questions, key talking points and presenter notes';
}

function openCommentsDrawer() {
  if (activeDeck === 'hub') return;
  isCommentsOpen = true;

  const drawer = document.getElementById('commentsDrawer');
  const backdrop = document.getElementById('commentsDrawerBackdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('open');

  updateCommentsDrawerHeader();
  updateDrawerFormLanguage(currentLang);
  renderCommentsList();
  updateCommentsCounterBadge();
}

function closeCommentsDrawer() {
  isCommentsOpen = false;
  const drawer = document.getElementById('commentsDrawer');
  const backdrop = document.getElementById('commentsDrawerBackdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function switchCommentsTab(tabName) {
  activeCommentTab = tabName;
  ['list', 'inject', 'bulk'].forEach(t => {
    const btn = document.getElementById(`tabBtn${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const panel = document.getElementById(`panel${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (btn) btn.classList.toggle('active', t === tabName);
    if (panel) panel.classList.toggle('active', t === tabName);
  });

  if (tabName === 'list') {
    renderCommentsList();
  }
}

function filterComments(category, btnElement) {
  currentCommentFilter = category;
  document.querySelectorAll('.comments-filter-bar .filter-chip').forEach(c => c.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderCommentsList();
}

function renderCommentsList() {
  const container = document.getElementById('commentsListContainer');
  if (!container) return;

  const lang = getActiveLang();
  const notes = getSlideNotes(activeDeck, currentSlide);
  let filtered = notes;
  if (currentCommentFilter !== 'all') {
    filtered = notes.filter(n => n.category === currentCommentFilter);
  }

  // Sort pinned first
  filtered.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="comments-empty-state">
        <div class="comments-empty-icon">💬</div>
        <div class="comments-empty-title">${lang === 'es' ? 'Sin preguntas en esta diapositiva' : 'No questions for this slide'}</div>
        <div class="comments-empty-desc">${lang === 'es' ? 'Usa la pestaña "Inyectar" o "Ingesta Rápida" para agregar preguntas clave, objeciones o notas.' : 'Use the "Inject" or "Bulk" tab to add key questions, objections, or talking points.'}</div>
        <button class="btn-inject-secondary" style="margin-top: 6px;" onclick="switchCommentsTab('inject')">
          ➕ ${lang === 'es' ? 'Inyectar Primera Pregunta' : 'Inject First Question'}
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const catClass = item.category || 'inversor';
    const catLabel = {
      inversor: lang === 'es' ? '💼 Inversor' : '💼 Investor',
      objecion: lang === 'es' ? '⚠️ Objeción' : '⚠️ Objection',
      operativa: lang === 'es' ? '⚙️ Operativa' : '⚙️ Ops/Tech',
      nota: lang === 'es' ? '📝 Nota' : '📝 Note',
      faq: lang === 'es' ? '💬 FAQ' : '💬 FAQ'
    }[catClass] || catClass.toUpperCase();

    const qText = getCommentQuestion(item, lang);
    const aText = getCommentAnswer(item, lang);

    return `
      <div class="comment-card ${item.pinned ? 'is-pinned' : ''}" data-id="${item.id}">
        <div class="comment-card-top">
          <span class="comment-type-tag ${catClass}">${catLabel}</span>
          <div class="comment-card-actions">
            <button class="comment-action-btn btn-pin ${item.pinned ? 'active' : ''}" onclick="togglePinComment('${item.id}')" title="${item.pinned ? (lang === 'es' ? 'Desfijar' : 'Unpin') : (lang === 'es' ? 'Fijar arriba' : 'Pin to top')}">
              <svg class="ico" viewBox="0 0 24 24" fill="${item.pinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M12 2v8"/><path d="m18 10-6-6-6 6"/><path d="M5 22h14"/><path d="M12 14v8"/></svg>
            </button>
            <button class="comment-action-btn" onclick="copyCommentText('${item.id}')" title="${lang === 'es' ? 'Copiar texto' : 'Copy text'}">
              <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </button>
            <button class="comment-action-btn btn-delete" onclick="deleteComment('${item.id}')" title="${lang === 'es' ? 'Eliminar' : 'Delete'}">
              <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
        <div class="comment-text-question">${escapeHtml(qText)}</div>
        ${aText ? `<div class="comment-text-answer">💡 ${escapeHtml(aText)}</div>` : ''}
        <div class="comment-card-meta">
          <span>${item.timestamp || (lang === 'es' ? 'Inyectada' : 'Injected')}</span>
          <span>${activeDeck.toUpperCase()} · #${currentSlide}</span>
        </div>
      </div>
    `;
  }).join('');
}

function handleInjectSingle(event) {
  event.preventDefault();
  const catEl = document.getElementById('injectCategory');
  const qEl = document.getElementById('injectQuestion');
  const aEl = document.getElementById('injectAnswer');

  if (!qEl || !qEl.value.trim()) return;

  const notes = getSlideNotes(activeDeck, currentSlide);
  const questionText = qEl.value.trim();
  const answerText = aEl ? aEl.value.trim() : '';
  const newItem = {
    id: 'note_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    category: catEl ? catEl.value : 'inversor',
    question: questionText,
    answer: answerText,
    pinned: false,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  if (getActiveLang() === 'en') {
    newItem.question_en = questionText;
    newItem.answer_en = answerText;
  } else {
    newItem.question_es = questionText;
    newItem.answer_es = answerText;
  }

  notes.unshift(newItem);
  saveSlideNotes(activeDeck, currentSlide, notes);

  qEl.value = '';
  if (aEl) aEl.value = '';

  switchCommentsTab('list');
  showCommentsToast(currentLang === 'es' ? 'Pregunta inyectada con éxito' : 'Question injected successfully');
}

function handleBulkInject() {
  const bulkArea = document.getElementById('bulkInputArea');
  if (!bulkArea || !bulkArea.value.trim()) return;

  const text = bulkArea.value.trim();
  const notes = getSlideNotes(activeDeck, currentSlide);
  let addedCount = 0;

  // Check if text is JSON array
  if (text.startsWith('[') && text.endsWith(']')) {
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        parsed.forEach(item => {
          if (item && (item.question || item.title || typeof item === 'string')) {
            notes.unshift({
              id: 'note_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
              category: item.category || 'inversor',
              question: item.question || item.title || String(item),
              answer: item.answer || item.notes || '',
              pinned: !!item.pinned,
              timestamp: 'JSON Ingest'
            });
            addedCount++;
          }
        });
      }
    } catch (e) {
      console.warn('JSON parse error, falling back to line by line:', e);
    }
  }

  // If not JSON or didn't parse items, parse line by line
  if (addedCount === 0) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 2);
    lines.forEach((line) => {
      // Remove leading bullets or numbers like "1. ", "- "
      const cleanQuestion = line.replace(/^(\d+[\.\)]|\-|\*|\•)\s*/, '');
      notes.unshift({
        id: 'note_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        category: 'inversor',
        question: cleanQuestion,
        answer: '',
        pinned: false,
        timestamp: 'Bulk Ingest'
      });
      addedCount++;
    });
  }

  saveSlideNotes(activeDeck, currentSlide, notes);
  bulkArea.value = '';
  switchCommentsTab('list');
  showCommentsToast(currentLang === 'es' ? `${addedCount} preguntas inyectadas` : `${addedCount} questions injected`);
}

function injectSlidePresets() {
  const deckPresets = CURATED_SLIDE_QA[activeDeck];
  const presets = deckPresets ? (deckPresets[currentSlide] || deckPresets[String(currentSlide)]) : null;
  if (!presets || !Array.isArray(presets) || presets.length === 0) {
    showCommentsToast(currentLang === 'es' ? 'No hay presets adicionales para esta lámina' : 'No extra presets for this slide');
    return;
  }

  const notes = getSlideNotes(activeDeck, currentSlide);

  // Avoid duplicates by preset id or question text
  const existingIds = new Set(notes.map(n => n.id).filter(Boolean));
  const existingQuestions = new Set(notes.map(n => getCommentQuestion(n, 'es').toLowerCase().trim()));
  let added = 0;

  presets.forEach(p => {
    const presetQuestion = getCommentQuestion(p, 'es').toLowerCase().trim();
    if (p.id && existingIds.has(p.id)) return;
    if (existingQuestions.has(presetQuestion)) return;

    notes.push({ ...p, id: p.id || ('note_' + Date.now() + '_' + Math.floor(Math.random() * 1000)) });
    existingIds.add(p.id);
    existingQuestions.add(presetQuestion);
    added++;
  });

  saveSlideNotes(activeDeck, currentSlide, notes);
  switchCommentsTab('list');
  showCommentsToast(currentLang === 'es' ? `Se cargaron ${added} presets clave` : `Loaded ${added} curated presets`);
}

function copyCurrentSlideNotes() {
  const notes = getSlideNotes(activeDeck, currentSlide);
  if (notes.length === 0) {
    showCommentsToast(currentLang === 'es' ? 'No hay notas para copiar' : 'No notes to copy');
    return;
  }

  const text = notes.map((n, i) => {
    const qText = getCommentQuestion(n);
    const aText = getCommentAnswer(n);
    return `${i + 1}. [${n.category.toUpperCase()}] ${qText}\n${aText ? '   ' + (getActiveLang() === 'es' ? 'R: ' : 'A: ') + aText + '\n' : ''}`;
  }).join('\n');

  navigator.clipboard.writeText(text).then(() => {
    showCommentsToast(currentLang === 'es' ? 'Notas copiadas al portapapeles' : 'Notes copied to clipboard');
  }).catch(() => {
    showCommentsToast('Error al copiar');
  });
}

function copyCommentText(id) {
  const notes = getSlideNotes(activeDeck, currentSlide);
  const item = notes.find(n => n.id === id);
  if (!item) return;

  const qText = getCommentQuestion(item);
  const aText = getCommentAnswer(item);

  const prefixQ = getActiveLang() === 'es' ? 'Pregunta: ' : 'Question: ';
  const prefixA = getActiveLang() === 'es' ? '\nPuntos Clave / Respuesta: ' : '\nKey Points / Answer: ';
  const text = `${prefixQ}${qText}${aText ? prefixA + aText : ''}`;

  navigator.clipboard.writeText(text).then(() => {
    showCommentsToast(currentLang === 'es' ? 'Pregunta copiada' : 'Question copied');
  });
}

function togglePinComment(id) {
  const notes = getSlideNotes(activeDeck, currentSlide);
  const item = notes.find(n => n.id === id);
  if (!item) return;
  item.pinned = !item.pinned;
  saveSlideNotes(activeDeck, currentSlide, notes);
  renderCommentsList();
}

function deleteComment(id) {
  let notes = getSlideNotes(activeDeck, currentSlide);
  notes = notes.filter(n => n.id !== id);
  saveSlideNotes(activeDeck, currentSlide, notes);
  renderCommentsList();
  showCommentsToast(currentLang === 'es' ? 'Pregunta eliminada' : 'Question removed');
}

function exportAllDeckNotes() {
  const total = totalSlides();
  const fullExport = {
    deck: activeDeck,
    exported_at: new Date().toISOString(),
    slides: {}
  };

  for (let s = 1; s <= total; s++) {
    const sNotes = getSlideNotes(activeDeck, s);
    if (sNotes.length > 0) {
      fullExport.slides[s] = sNotes;
    }
  }

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullExport, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `baird_notes_${activeDeck}_all.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  showCommentsToast(currentLang === 'es' ? 'Archivo JSON descargado' : 'JSON exported successfully');
}

function showCommentsToast(msg) {
  const toast = document.getElementById('commentsToast');
  const toastMsg = document.getElementById('commentsToastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

Object.assign(window, {
  launchDeck,
  playVentureVideo,
  openExecutiveHub,
  goToSlide,
  nextSlide,
  prevSlide,
  setLanguage,
  toggleLanguage,
  toggleTheme,
  toggleFullscreen,
  toggleOverview,
  openLightbox,
  closeLightbox,
  closeLightboxDirect,
  replayVentureVideo,
  skipVentureVideo,
  closeVentureVideo,
  toggleCommentsDrawer,
  closeCommentsDrawer,
});

window.addEventListener('DOMContentLoaded', initPlatform);
