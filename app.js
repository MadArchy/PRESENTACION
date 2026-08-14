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
const DECK_SLIDE_COUNTS = { tutor: 15, fastfood: 15, arcana: 15, comparativo: 10 };

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
  comparativo: {
    title_es: 'Comparativo IA Local',
    title_en: 'Local AI Hardware',
    kicker_es: 'Workstation · Briefing ejecutivo',
    kicker_en: 'Workstation · Executive briefing',
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
  ['tutor', 'fastfood', 'arcana', 'comparativo'].forEach(key => {
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
      if (isOverviewOpen) toggleOverview();
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

window.addEventListener('DOMContentLoaded', initPlatform);
