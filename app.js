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

function initPlatform() {
  injectThemedBackgrounds();
  deferSlideImages();
  primeNearbySlides('hub', 1);
  preloadUrl(SLIDE_BACKGROUNDS.hub.default);
  warmupVideo();
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

function applyLanguage(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  document.querySelectorAll('.lang-opt').forEach((btn) => {
    btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
  });

  updateChromeMeta();

  const esElements = document.querySelectorAll('.lang-es');
  const enElements = document.querySelectorAll('.lang-en');

  if (lang === 'es') {
    esElements.forEach(el => el.style.display = '');
    enElements.forEach(el => el.style.display = 'none');
  } else {
    esElements.forEach(el => el.style.display = 'none');
    enElements.forEach(el => el.style.display = '');
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
        "question": "¿Por qué la estrategia de infraestructura debe basarse en etapas de negocio y no en potencia bruta?",
        "answer": "Comprar hardware antes de tener tracción comercial genera capital ocioso y rápida obsolescencia. La inversión progresiva asegura que cada equipo esté amortizado por contratos activos.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "comp-1-2",
        "category": "nota",
        "question": "Nota del presentador: Mensaje central de apertura",
        "answer": "Hacer énfasis en que el objetivo de 3i Baird Lab no es crear una sala de servidores costosa, sino forjar una capacidad productiva que multiplique los ingresos.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "2": [
      {
        "id": "comp-2-1",
        "category": "operativa",
        "question": "¿Qué soluciones concretas podemos monetizar de inmediato con Capex US$0?",
        "answer": "Plataformas web empresariales, RAG documental con APIs de nube, automatizaciones de procesos y prototipos funcionales para validación comercial.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "comp-2-2",
        "category": "inversor",
        "question": "¿Por qué no renovar toda la flota de desarrollo de inmediato?",
        "answer": "Los equipos actuales son más que suficientes para la fase de desarrollo y demos; el desembolso de capital se reserva para cuando un cliente exija procesamiento masivo o privacidad local.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "3": [
      {
        "id": "comp-3-1",
        "category": "objecion",
        "question": "¿Cuáles son los 4 cuellos de botella que nos obligarán a comprar hardware?",
        "answer": "1) Volumen de datos (modelos 32B-70B que requieren VRAM), 2) Concurrencia de usuarios, 3) Mandato de privacidad On-Premise, 4) Disponibilidad 24/7 sin riesgo de fallas.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "comp-3-2",
        "category": "nota",
        "question": "Nota del presentador: Explicación de VRAM para no técnicos",
        "answer": "Comparar la VRAM con el ancho de una autopista: si el modelo no cabe en la memoria de la tarjeta gráfica, el sistema colapsa o se vuelve 50 veces más lento.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "4": [
      {
        "id": "comp-4-1",
        "category": "inversor",
        "question": "¿Qué métricas financieras justifican una inversión en estaciones dedicadas?",
        "answer": "+300% de capacidad de procesamiento paralelo, 100% de retención de datos confidenciales (cero fuga a nubes públicas) y reducción de hasta el 65% en costos recurrentes de APIs.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "comp-4-2",
        "category": "operativa",
        "question": "¿Cómo ayuda el hardware propio a cerrar clientes Enterprise?",
        "answer": "Permite firmar acuerdos de nivel de servicio (SLAs) con garantías de privacidad y tiempos de respuesta dedicados que la nube pública no garantiza a bajo costo.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "5": [
      {
        "id": "comp-5-1",
        "category": "nota",
        "question": "Nota del presentador: La ecuación de productividad del talento",
        "answer": "Destacar la regla: 'Mejor hardware = -70% tiempo de espera = 3x más iteraciones = proyectos entregados en la mitad del tiempo'.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "comp-5-2",
        "category": "operativa",
        "question": "¿Cómo se beneficia un desarrollador con inferencia local?",
        "answer": "Prueba y ajusta prompts y código en segundos sin esperar colas de red ni preocuparse por el costo por token durante la etapa de pruebas.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "6": [
      {
        "id": "comp-6-1",
        "category": "inversor",
        "question": "¿Cómo se estructuran los niveles de presupuesto recomendados?",
        "answer": "Nivel 0: US$0 (Desarrollo y demos). Nivel 1: US$2.5k–3.5k (IA local intermedia). Nivel 2: US$4k–6.5k (Workstations profesionales 70B). Nivel 3: Servidores centralizados 24/7.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "comp-6-2",
        "category": "objecion",
        "question": "¿Por qué no saltar directamente al servidor empresarial Nivel 3?",
        "answer": "Porque requiere costos adicionales de energía, refrigeración y mantenimiento. Solo debe adquirirse cuando múltiples clientes en producción lo financien.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "7": [
      {
        "id": "comp-7-1",
        "category": "inversor",
        "question": "¿Cuáles son los 5 gatilladores que autorizan la compra de nuevo equipo?",
        "answer": "1. Cliente con contrato firmado que lo exija. 2. Saturación de proyectos simultáneos. 3. Facturas de Cloud API superiores al costo de amortización. 4. Requisito legal de privacidad. 5. Operación en vivo 24/7.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "comp-7-2",
        "category": "nota",
        "question": "Nota de negociación con clientes",
        "answer": "Si un cliente exige privacidad total, el costo del nodo local dedicado puede trasladarse como costo directo de setup en la propuesta comercial.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "8": [
      {
        "id": "comp-8-1",
        "category": "operativa",
        "question": "¿Cuáles son los 4 pilares indispensables para una operación 24/7?",
        "answer": "1) Talento potenciado, 2) Capacidad tecnológica GPU, 3) Continuidad eléctrica (UPS online de doble conversión), 4) Conectividad redundante (Doble proveedor de Internet con failover).",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "comp-8-2",
        "category": "objecion",
        "question": "¿Qué ocurre si solo compramos computadores sin respaldo eléctrico?",
        "answer": "Una sola micro-interrupción eléctrica apaga los servidores, corrompe bases de datos y tumba los servicios de los clientes, arruinando la reputación de la empresa.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "9": [
      {
        "id": "comp-9-1",
        "category": "nota",
        "question": "Nota del presentador: Desglose del modelo en 3 capas",
        "answer": "Capa 1: Personas (Velocidad). Capa 2: Tecnología (Cómputo). Capa 3: Continuidad (Resiliencia). Todo debe responder al filtro de las 5 preguntas antes de comprar.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "comp-9-2",
        "category": "operativa",
        "question": "¿Cuál es la primera pregunta que debemos hacernos antes de cualquier compra?",
        "answer": "¿Podemos resolver esta necesidad con la infraestructura que ya tenemos? Si la respuesta es sí, se optimiza lo existente.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "10": [
      {
        "id": "comp-10-1",
        "category": "inversor",
        "question": "¿Cuál es el resumen ejecutivo final para la toma de decisiones?",
        "answer": "La infraestructura deja de ser un gasto tecnológico y se convierte en una inversión en capacidad productiva, comercial y operativa que respalda el crecimiento de 3i Baird Lab.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "comp-10-2",
        "category": "nota",
        "question": "Nota de cierre: Llamado a la acción",
        "answer": "Concluir reforzando la ruta: 'Primero tracción comercial con lo que tenemos; luego escalamiento rentable con continuidad 24/7'.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ]
  },
  "restaurante": {
    "1": [
      {
        "id": "rest-1-1",
        "category": "inversor",
        "question": "¿Por qué un dueño de restaurante pagaría por Arcana en vez de confiar en su POS actual?",
        "answer": "El POS solo registra lo que el cajero quiere tipear. Arcana audita la realidad física (básculas, neveras, consumos) y detecta comandas canceladas fraudulentamente o ventas no registradas.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "rest-1-2",
        "category": "operativa",
        "question": "¿Requiere reemplazar el software o hardware de punto de venta existente?",
        "answer": "No. Arcana funciona de manera no invasiva conectándose al flujo de red, impresoras de comandas y sensores externos sin alterar el POS del local.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "2": [
      {
        "id": "rest-2-1",
        "category": "inversor",
        "question": "¿Cómo se traduce una fuga del 4% en el 50-100% de la utilidad anual del restaurante?",
        "answer": "Dado que los márgenes netos del sector gastronómico oscilan entre el 3% y el 8%, cualquier fuga directa sobre ingresos brutos consume la totalidad de la ganancia limpia del dueño.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "rest-2-2",
        "category": "objecion",
        "question": "¿No basta con poner más cámaras de seguridad tradicionales CCTV?",
        "answer": "Las cámaras convencionales graban terabytes sin correlación. Nadie revisa 12 horas de video diario. Arcana correlaciona eventos exactos con marcas de tiempo e incongruencias de ticket.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "3": [
      {
        "id": "rest-3-1",
        "category": "operativa",
        "question": "¿Cuáles son los 5 vectores del marco F.A.C.E.S. en la práctica?",
        "answer": "1) Facturación y tickets, 2) Almacén y compras, 3) Cocina y recetas estándar, 4) Efectivo y arqueos, 5) Salidas no autorizadas o mermas.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "4": [
      {
        "id": "rest-4-1",
        "category": "inversor",
        "question": "¿Cuál es la propuesta de valor para el dueño en una sola frase?",
        "answer": "Demostrar matemáticamente lo comprado, cocinado y vendido sin necesidad de vivir vigilando encima del local.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "5": [
      {
        "id": "rest-5-1",
        "category": "operativa",
        "question": "¿Cómo se evitan manipulaciones en los sensores IoT?",
        "answer": "Cada microcontrolador firma criptográficamente las lecturas en hardware antes de transmitirlas, impidiendo la alteración de datos por parte del personal.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "6": [
      {
        "id": "rest-6-1",
        "category": "operativa",
        "question": "¿Qué pasa si se cae el Internet en el restaurante?",
        "answer": "Los nodos IoT almacenan las lecturas cifradas localmente en memoria no volátil y sincronizan automáticamente en cuanto se restablece la conexión.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "7": [
      {
        "id": "rest-7-1",
        "category": "inversor",
        "question": "¿Por qué un protocolo de cierre diario inalterable en blockchain?",
        "answer": "Porque elimina discrepancias contables entre socios e inversionistas: nadie puede modificar los números de ventas ni costos una vez cerrado el turno.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "8": [
      {
        "id": "rest-8-1",
        "category": "operativa",
        "question": "¿Cómo se realiza la liquidación y reparto de utilidades?",
        "answer": "Mediante reglas automáticas de split en smart contracts que liquidan diariamente o semanalmente en stablecoins (USDC) o transferencias bancarias directas.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "9": [
      {
        "id": "rest-9-1",
        "category": "nota",
        "question": "Nota del presentador: Telemetría móvil para el propietario",
        "answer": "Mostrar cómo el dueño recibe alertas directas en Telegram/WhatsApp cuando hay una discrepancia mayor al 2% entre peso de insumos y tickets.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "10": [
      {
        "id": "rest-10-1",
        "category": "inversor",
        "question": "¿Cuál es el tiempo de retorno de inversión (ROI) estimado para el piloto inicial?",
        "answer": "El piloto se amortiza en menos de 45 días al recuperar un promedio de $1,200 a $3,500 USD mensuales en mermas y fraudes detectados por sucursal.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ]
  },
  "fastfood": {
    "1": [
      {
        "id": "ff-1-1",
        "category": "inversor",
        "question": "¿Cuál es el margen operativo unitario proyectado del local automatizado?",
        "answer": "Entre 28% y 34% de EBITDA gracias a la reducción del 60% de mano de obra en cocina y reducción de desperdicio a menos del 1.5%.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "ff-1-2",
        "category": "nota",
        "question": "Nota del presentador: Tesis Smart QSR",
        "answer": "El futuro de la comida rápida es la ingeniería de precisión: estandarización milimétrica de ingredientes y tiempos de horneado exactos.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "2": [
      {
        "id": "ff-2-1",
        "category": "inversor",
        "question": "¿Cuáles son las 3 ineficiencias críticas que destruyen el margen tradicional?",
        "answer": "1) Alta rotación y costo laboral en cocina, 2) Variabilidad en porciones y desperdicio de insumos, 3) Cuellos de botella en horas pico.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "3": [
      {
        "id": "ff-3-1",
        "category": "operativa",
        "question": "¿Cómo opera el horno continuo de alta velocidad en horas pico?",
        "answer": "Cocción automatizada por cinta transportadora calibrada que hornea una pizza cada 120 segundos sin intervención manual en el proceso térmico.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "4": [
      {
        "id": "ff-4-1",
        "category": "inversor",
        "question": "¿Comparativa directa con franquicias tradicionales?",
        "answer": "40% menor Capex de apertura, 65% menos personal en cocina y punto de equilibrio alcanzable con solo 60 pedidos diarios.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "5": [
      {
        "id": "ff-5-1",
        "category": "nota",
        "question": "Nota: ¿Por qué Cúcuta como ciudad piloto?",
        "answer": "Costos operativos eficientes, alta densidad de consumo de comida rápida y mercado ideal para validar la ingeniería antes de escalar a Bogotá y Medellín.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "6": [
      {
        "id": "ff-6-1",
        "category": "operativa",
        "question": "¿Qué equipamiento automatizado compone la cocina?",
        "answer": "Prensas neumáticas de masa, dosificadores volumétricos de salsa y queso, y hornos de túnel continuo con control PID.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "7": [
      {
        "id": "ff-7-1",
        "category": "operativa",
        "question": "¿Cómo se gestiona el inventario en tiempo real?",
        "answer": "Básculas conectadas por IoT descuentan automáticamente gramos de queso, masa y proteínas con cada orden emitida en el KDS.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "8": [
      {
        "id": "ff-8-1",
        "category": "inversor",
        "question": "¿Cuál es el costo unitario de producto (Food Cost)?",
        "answer": "Estandarizado en 26% de costo de materia prima gracias a cero sobreporciones y compras centralizadas de insumos.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "9": [
      {
        "id": "ff-9-1",
        "category": "nota",
        "question": "Nota: Experiencia del cliente y rapidez",
        "answer": "Tiempo promedio desde que el cliente ordena en el kiosco hasta la entrega en mano: menos de 3.5 minutos.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "10": [
      {
        "id": "ff-10-1",
        "category": "inversor",
        "question": "¿Cómo es el modelo de expansión de la franquicia?",
        "answer": "Locales compactos tipo Dark Kitchen y Express (35–50 m2) con bajo arriendo y rápido despliegue modular.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "11": [
      {
        "id": "ff-11-1",
        "category": "inversor",
        "question": "¿Tamaño del mercado objetivo accesible (TAM/SAM)?",
        "answer": "Mercado QSR regional de pizza y comida rápida superior a $450M USD en ciudades intermedias de Colombia.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "12": [
      {
        "id": "ff-12-1",
        "category": "operativa",
        "question": "¿Mantenimiento preventivo del equipamiento?",
        "answer": "Telemetría IoT predice desgaste de resistencias, motores de cinta y sensores de temperatura antes de que ocurra una falla.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "13": [
      {
        "id": "ff-13-1",
        "category": "nota",
        "question": "Nota: Hoja de ruta a 12 meses",
        "answer": "Mes 1-3: Piloto insignia. Mes 4-6: Apertura de 3 locales propios. Mes 7-12: Franquiciamiento a operadores terceros.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "14": [
      {
        "id": "ff-14-1",
        "category": "inversor",
        "question": "¿Monto de la ronda de inversión y asignación de fondos?",
        "answer": "Ronda Semilla de $120,000 USD destinada a equipamiento de cocina automatizada (55%), adecuación del local (25%) y capital de trabajo (20%).",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "15": [
      {
        "id": "ff-15-1",
        "category": "inversor",
        "question": "¿Cierre ejecutivo y retorno para el inversionista?",
        "answer": "ROI proyectado de 22 meses con distribución trimestral de dividendos y valorización de la marca franquiciable.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ]
  },
  "tutor": {
    "1": [
      {
        "id": "tut-1-1",
        "category": "inversor",
        "question": "¿Por qué un sistema Multi-Agente supera a ChatGPT / Claude estándar para educación?",
        "answer": "Los LLMs genéricos resuelven la tarea por el alumno. El sistema 3i tiene agentes especializados en pedagogía socrática que guían paso a paso y evalúan comprensión real.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "tut-1-2",
        "category": "nota",
        "question": "Nota del presentador: Enfoque DeepTech",
        "answer": "Subrayar que no somos un simple wrapper de OpenAI; contamos con grafos de conocimiento y memoria persistente en 3 niveles.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "2": [
      {
        "id": "tut-2-1",
        "category": "inversor",
        "question": "¿Cuál es el cuello de botella de $300B en educación?",
        "answer": "El 85% de los estudiantes que usan chatbots tradicionales experimentan una falsa sensación de aprendizaje sin retención a largo plazo.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "3": [
      {
        "id": "tut-3-1",
        "category": "operativa",
        "question": "¿Cómo funciona la arquitectura socrática multi-agente?",
        "answer": "El Agente Pedagogo formula preguntas guiadas; el Agente Evaluador mide comprensión; el Agente Psicólogo ajusta el tono motivacional según la frustración del estudiante.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "4": [
      {
        "id": "tut-4-1",
        "category": "inversor",
        "question": "¿Ventaja competitiva frente a Khan Academy o Duolingo?",
        "answer": "Adaptabilidad en tiempo real a currículos universitarios y corporativos complejos con verificación criptográfica de dominio de conceptos.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "5": [
      {
        "id": "tut-5-1",
        "category": "operativa",
        "question": "¿Cuáles son las 4 escuadras de agentes?",
        "answer": "1. Escuadra de Diagnóstico, 2. Escuadra Pedagógica, 3. Escuadra de Verificación STEM, 4. Escuadra de Síntesis y Memoria.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "6": [
      {
        "id": "tut-6-1",
        "category": "operativa",
        "question": "¿Cómo opera la memoria en 3 capas?",
        "answer": "Capa 1: Contexto de sesión activa. Capa 2: Grafo de conceptos dominados del estudiante. Capa 3: Memoria episódica a largo plazo de vacíos cognitivos.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "7": [
      {
        "id": "tut-7-1",
        "category": "nota",
        "question": "Nota: Grafos de conocimiento dinámicos",
        "answer": "Explicar cómo el tutor identifica si un estudiante falla en cálculo porque en realidad tiene un vacío previo en factorización algebraica.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "8": [
      {
        "id": "tut-8-1",
        "category": "inversor",
        "question": "¿Qué es la Prueba Verificable de Dominio (Proof-of-Mastery)?",
        "answer": "Credenciales emitidas en base a resolución autónoma de problemas sin trampas, validables por empleadores y universidades.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "9": [
      {
        "id": "tut-9-1",
        "category": "operativa",
        "question": "¿Stack tecnológico de la infraestructura?",
        "answer": "Orquestación en LangGraph/LlamaIndex, base de datos vectorial Qdrant, almacenamiento en grafos Neo4j e inferencia híbrida.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "10": [
      {
        "id": "tut-10-1",
        "category": "inversor",
        "question": "¿Tamaño del mercado EdTech accesible?",
        "answer": "$180B USD en los 3 niveles: K-12, Educación Superior y Reskilling corporativo B2B.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "11": [
      {
        "id": "tut-11-1",
        "category": "inversor",
        "question": "¿Modelo de monetización?",
        "answer": "SaaS recurrente B2C ($19/mes por estudiante) y licencias institucionales B2B ($8/alumno/mes para colegios y universidades).",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "12": [
      {
        "id": "tut-12-1",
        "category": "nota",
        "question": "Nota: Métricas de tracción inicial",
        "answer": "Piloto con más de 1,200 estudiantes activos con una retención mensual del 78% y mejora del 34% en calificaciones de exámenes.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "13": [
      {
        "id": "tut-13-1",
        "category": "nota",
        "question": "Nota: Hoja de ruta estratégica a 18 meses",
        "answer": "Fase 1: Dominio de STEM y programación. Fase 2: Expansión a idiomas y ciencias humanas. Fase 3: Integración con plataformas universitarias LMS.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "14": [
      {
        "id": "tut-14-1",
        "category": "inversor",
        "question": "¿Ronda de inversión Semilla?",
        "answer": "Buscamos $1.2M USD para perfeccionamiento del motor multi-agente (50%), expansión comercial B2B (35%) y operaciones (15%).",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "15": [
      {
        "id": "tut-15-1",
        "category": "inversor",
        "question": "¿Cierre ejecutivo de la visión?",
        "answer": "Estamos construyendo la infraestructura de inteligencia artificial que democratizará la tutoría de élite personalizada para millones de personas.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ]
  },
  "arcana": {
    "1": [
      {
        "id": "arc-1-1",
        "category": "inversor",
        "question": "¿Por qué anclar la contabilidad en Polygon en lugar de una base de datos PostgreSQL tradicional?",
        "answer": "Porque garantiza inmutabilidad criptográfica. Ni el dueño de la franquicia ni el franquiciado pueden alterar los registros de ventas y repartos una vez firmados por las máquinas.",
        "pinned": true,
        "timestamp": "Preset 3i"
      },
      {
        "id": "arc-1-2",
        "category": "nota",
        "question": "Nota del presentador: Confianza por Construcción",
        "answer": "Enfatizar el concepto: 'No le pidas al inversor que confíe en personas; dale un sistema donde las máquinas firman la verdad matemática'.",
        "pinned": false,
        "timestamp": "Preset 3i"
      }
    ],
    "2": [
      {
        "id": "arc-2-1",
        "category": "inversor",
        "question": "¿Cuál es el problema central entre franquiciador y franquiciado?",
        "answer": "La asimetría de información: el inversionista pasivo no está en el local y sospecha de sub-declaración de ventas, mientras el operador resiente la fiscalización constante.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "3": [
      {
        "id": "arc-3-1",
        "category": "nota",
        "question": "Nota: Tesis de inversión de Arcana",
        "answer": "Transformar cada local comercial en un libro contable auditable en tiempo real mediante sensores IoT no manipulables.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "4": [
      {
        "id": "arc-4-1",
        "category": "operativa",
        "question": "¿Qué es Arcana y qué NO es?",
        "answer": "Arcana ES una capa de auditoría física y liquidación automática. NO es un software contable tradicional ni un punto de venta más.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "5": [
      {
        "id": "arc-5-1",
        "category": "operativa",
        "question": "¿Cómo garantizan que el hardware IoT sea inviolable?",
        "answer": "Chips con enclave criptográfico seguro que firman cada paquete de telemetría con clave privada embebida en silicio.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "6": [
      {
        "id": "arc-6-1",
        "category": "operativa",
        "question": "¿Cómo funciona el motor de correlación de fraude multi-vector?",
        "answer": "Cruza simultáneamente aperturas de gaveta de dinero, peso de insumos consumidos y tickets emitidos para detectar transacciones fantasma.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "7": [
      {
        "id": "arc-7-1",
        "category": "operativa",
        "question": "¿Cómo es el protocolo de cierre diario en Polygon?",
        "answer": "Al terminar la jornada, se genera un hash criptográfico con todos los eventos del día y se acuña en la blockchain con costo de transacción despreciable.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "8": [
      {
        "id": "arc-8-1",
        "category": "inversor",
        "question": "¿Cómo se realiza la liquidación de regalías y utilidades en USDC?",
        "answer": "Smart contracts ejecutan la distribución inmediata de porcentajes pactados hacia las billeteras o cuentas de los socios sin intermediación humana.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "9": [
      {
        "id": "arc-9-1",
        "category": "nota",
        "question": "Nota: Dashboard del Inversionista en tiempo real",
        "answer": "Demostrar cómo el inversor abre su app móvil y ve la facturación en vivo de 10 locales sincronizados con prueba criptográfica.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "10": [
      {
        "id": "arc-10-1",
        "category": "inversor",
        "question": "¿Modelo de negocio y monetización de Arcana?",
        "answer": "SaaS recurrente por local ($99 USD/mes) + Take-rate del 0.75% sobre las liquidaciones procesadas a través del protocolo.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "11": [
      {
        "id": "arc-11-1",
        "category": "inversor",
        "question": "¿Tamaño del mercado de franquicias?",
        "answer": "Mercado global de franquicias superior a $800B USD con más de 750,000 establecimientos que sufren problemas de auditoría y confianza.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "12": [
      {
        "id": "arc-12-1",
        "category": "nota",
        "question": "Nota: Primera integración insignia con Smart Fast-Food",
        "answer": "El piloto con la cadena Smart Fast-Food de 3i Baird Lab sirve como caso de éxito validado para vender la solución a terceros.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "13": [
      {
        "id": "arc-13-1",
        "category": "nota",
        "question": "Nota: Hoja de ruta estratégica",
        "answer": "De 1 local piloto a 20 locales en 6 meses, escalando a más de 100 franquicias conectadas en el mes 18.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "14": [
      {
        "id": "arc-14-1",
        "category": "inversor",
        "question": "¿Ronda Semilla de Inversión?",
        "answer": "Ronda de $750,000 USD para desarrollo de firmware IoT (40%), auditorías de smart contracts (25%) y despliegue comercial (35%).",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ],
    "15": [
      {
        "id": "arc-15-1",
        "category": "inversor",
        "question": "¿Cierre ejecutivo de Arcana Trust Network?",
        "answer": "El futuro de las inversiones en franquicias es verificable. Convertimos negocios físicos en activos líquidos, auditables y transparentes.",
        "pinned": true,
        "timestamp": "Preset 3i"
      }
    ]
  }
};

function getSlideNotesKey(deck, slide) {
  return `baird_notes_${deck}_${slide}`;
}

function getSlideNotes(deck, slide) {
  if (!deck || deck === 'hub') return [];
  const key = getSlideNotesKey(deck, slide);
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      console.warn('Error parsing stored slide notes:', e);
    }
  }

  // Fallback to Curated presets if available and initialize
  const deckPresets = CURATED_SLIDE_QA[deck];
  const presets = deckPresets ? (deckPresets[slide] || deckPresets[String(slide)]) : null;
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

function openCommentsDrawer() {
  if (activeDeck === 'hub') return;
  isCommentsOpen = true;

  const drawer = document.getElementById('commentsDrawer');
  const backdrop = document.getElementById('commentsDrawerBackdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('open');

  // Update Drawer Title & Meta for active slide
  const meta = DECK_CONFIG[activeDeck] || DECK_CONFIG.hub;
  const kickerEl = document.getElementById('commentsDeckKicker');
  const titleEl = document.getElementById('commentsSlideTitle');
  const subEl = document.getElementById('commentsSlideSubtitle');

  const deckName = currentLang === 'es' ? (meta.title_es || activeDeck) : (meta.title_en || activeDeck);
  if (kickerEl) kickerEl.textContent = `3i BAIRD LAB · ${deckName.toUpperCase()}`;

  // Get active slide title if present
  let activeSlideHeading = `Diapositiva ${currentSlide} / ${totalSlides()}`;
  const activeContainer = document.getElementById(`deck-${activeDeck}`);
  if (activeContainer) {
    const curSlideEl = activeContainer.querySelector(`.slide[data-slide="${currentSlide}"]`);
    if (curSlideEl) {
      const h2 = curSlideEl.querySelector('h2');
      if (h2) activeSlideHeading = h2.textContent.trim();
    }
  }

  if (titleEl) titleEl.textContent = `SLIDE ${currentSlide < 10 ? '0' + currentSlide : currentSlide}: ${activeSlideHeading}`;
  if (subEl) subEl.textContent = currentLang === 'es' ? 'Preguntas inyectadas, puntos clave y comentarios del presentador' : 'Injected questions, key talking points and presenter notes';

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
        <div class="comments-empty-title">${currentLang === 'es' ? 'Sin preguntas en esta diapositiva' : 'No questions for this slide'}</div>
        <div class="comments-empty-desc">${currentLang === 'es' ? 'Usa la pestaña "Inyectar" o "Ingesta Rápida" para agregar preguntas clave, objeciones o notas.' : 'Use the "Inject" or "Bulk" tab to add key questions, objections, or talking points.'}</div>
        <button class="btn-inject-secondary" style="margin-top: 6px;" onclick="switchCommentsTab('inject')">
          ➕ ${currentLang === 'es' ? 'Inyectar Primera Pregunta' : 'Inject First Question'}
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const catClass = item.category || 'inversor';
    const catLabel = {
      inversor: currentLang === 'es' ? '💼 Inversor' : '💼 Investor',
      objecion: currentLang === 'es' ? '⚠️ Objeción' : '⚠️ Objection',
      operativa: currentLang === 'es' ? '⚙️ Operativa' : '⚙️ Ops/Tech',
      nota: currentLang === 'es' ? '📝 Nota' : '📝 Note',
      faq: currentLang === 'es' ? '💬 FAQ' : '💬 FAQ'
    }[catClass] || catClass.toUpperCase();

    return `
      <div class="comment-card ${item.pinned ? 'is-pinned' : ''}" data-id="${item.id}">
        <div class="comment-card-top">
          <span class="comment-type-tag ${catClass}">${catLabel}</span>
          <div class="comment-card-actions">
            <button class="comment-action-btn btn-pin ${item.pinned ? 'active' : ''}" onclick="togglePinComment('${item.id}')" title="${item.pinned ? 'Desfijar' : 'Fijar arriba'}">
              <svg class="ico" viewBox="0 0 24 24" fill="${item.pinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M12 2v8"/><path d="m18 10-6-6-6 6"/><path d="M5 22h14"/><path d="M12 14v8"/></svg>
            </button>
            <button class="comment-action-btn" onclick="copyCommentText('${item.id}')" title="Copiar texto">
              <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </button>
            <button class="comment-action-btn btn-delete" onclick="deleteComment('${item.id}')" title="Eliminar">
              <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
        <div class="comment-text-question">${escapeHtml(item.question)}</div>
        ${item.answer ? `<div class="comment-text-answer">💡 ${escapeHtml(item.answer)}</div>` : ''}
        <div class="comment-card-meta">
          <span>${item.timestamp || 'Inyectada'}</span>
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
  const newItem = {
    id: 'note_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    category: catEl ? catEl.value : 'inversor',
    question: qEl.value.trim(),
    answer: aEl ? aEl.value.trim() : '',
    pinned: false,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

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

  // Avoid duplicates by question text
  const existingQuestions = new Set(notes.map(n => n.question.toLowerCase().trim()));
  let added = 0;

  presets.forEach(p => {
    if (!existingQuestions.has(p.question.toLowerCase().trim())) {
      notes.push({
        ...p,
        id: 'note_' + Date.now() + '_' + Math.floor(Math.random() * 1000)
      });
      added++;
    }
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
    return `${i + 1}. [${n.category.toUpperCase()}] ${n.question}\n${n.answer ? '   R: ' + n.answer + '\n' : ''}`;
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

  const text = `Pregunta: ${item.question}\n${item.answer ? 'Puntos Clave / Respuesta: ' + item.answer : ''}`;
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

window.addEventListener('DOMContentLoaded', initPlatform);
