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
const DECK_SLIDE_COUNTS = { tutor: 15, fastfood: 15, arcana: 15, restaurante: 10, comparativo: 14 };

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
    2: 'media/ia/ia-own-capacity.jpg',
    3: 'media/ia/ia-workflow.jpg',
    4: 'media/ia/ia-memory.jpg',
    5: 'media/ia/ia-datacenter-24-7.jpg',
    6: 'media/ia/ia-reclaimed-hours.jpg',
    7: 'media/ia/ia-rent-vs-own.jpg',
    8: 'media/ia/ia-minipc.jpg',
    9: 'media/ia/ia-tower.jpg',
    10: 'media/ia/ia-dgx.jpg',
    11: 'media/ia/ia-models.jpg',
    12: 'media/ia/ia-rag.jpg',
    13: 'media/ia/ia-gpu.jpg',
    14: 'backgrounds/bg-closing.jpg'
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
  if (document.body.dataset.hubNavBound === '1') return;
  document.body.dataset.hubNavBound = '1';
  document.body.addEventListener('click', (event) => {
    const deckBtn = event.target.closest('.venture-pill-btn[data-deck]');
    if (deckBtn) {
      event.preventDefault();
      launchDeck(deckBtn.getAttribute('data-deck'));
      return;
    }
    const videoBtn = event.target.closest('.venture-pill-btn[data-video-deck]');
    if (videoBtn) {
      event.preventDefault();
      playVentureVideo(videoBtn.getAttribute('data-video-deck'));
    }
  });
}

function initPlatform() {
  injectThemedBackgrounds();
  deferSlideImages();
  primeNearbySlides('hub', 1);
  preloadUrl(SLIDE_BACKGROUNDS.hub.default);
  warmupVideo();
  setupHubNavigation();
  initLaserPointer();
  setAudience('investor');
  setPitchTimerPreset(600, 'Investor Pitch (10 min)');
  openExecutiveHub();
  applyLanguage(currentLang);
  setupTouchGestures();
  setBriefingOption('autoAdvance', true);
  setBriefingOption('syncPitchTimer', true);
  warmupSpeechVoices();
  setupHubVentureCards();
  initPresentationLlmSession();
  bindCommentsDrawerTriggers();
}

function setupHubVentureCards() {
  const grid = document.getElementById('hubVentureGrid');
  if (!grid) return;

  grid.querySelectorAll('.hub-venture-card').forEach(card => {
    const cta = card.querySelector('.hub-card-cta');
    if (!cta) return;

    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    const open = () => {
      const videoDeck = cta.getAttribute('data-video-deck');
      const deck = cta.getAttribute('data-deck');
      if (videoDeck) playVentureVideo(videoDeck);
      else if (deck) launchDeck(deck);
    };

    card.addEventListener('click', event => {
      // The CTA keeps its own inline handler, so ignore bubbled button clicks.
      if (event.target.closest('.hub-card-cta')) return;
      open();
    });

    card.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      if (event.target.closest('.hub-card-cta')) return;
      event.preventDefault();
      open();
    });
  });
}

// Open Executive Hub (Menu)
function openExecutiveHub() {
  stopExecutiveBriefing();
  activeDeck = 'hub';
  document.documentElement.setAttribute('data-deck', 'hub');

  // Hide/Show containers
  document.querySelectorAll('.deck-container').forEach(c => c.classList.remove('active'));
  const hubContainer = document.getElementById('deck-hub');
  if (hubContainer) {
    hubContainer.classList.add('active');
    const hubSlide = hubContainer.querySelector('.slide');
    if (hubSlide) hubSlide.scrollTop = 0;
  }

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
  const deckTourBtn = document.getElementById('deckAudioTourBtn');
  if (deckTourBtn) deckTourBtn.style.display = 'none';

  // Hide mobile edge navigation and swipe banner on Hub
  const mobileEdgePrev = document.getElementById('mobileEdgePrev');
  const mobileEdgeNext = document.getElementById('mobileEdgeNext');
  const swipeHint = document.getElementById('mobileSwipeHint');
  if (mobileEdgePrev) mobileEdgePrev.style.display = 'none';
  if (mobileEdgeNext) mobileEdgeNext.style.display = 'none';
  if (swipeHint) swipeHint.style.display = 'none';

  if (isOverviewOpen) toggleOverview();
  if (isCommentsOpen) closeCommentsDrawer();
  updateCommentsCounterBadge();
}

// Launch Specific Presentation
function launchDeck(deckKey) {
  if (!DECK_CONFIG[deckKey] || deckKey === 'hub') return;
  stopExecutiveBriefing();
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
  const deckTourBtn = document.getElementById('deckAudioTourBtn');
  if (deckTourBtn) deckTourBtn.style.display = 'inline-flex';

  // Reset mobile swipe hint
  const swipeHint = document.getElementById('mobileSwipeHint');
  if (swipeHint) {
    swipeHint.style.display = '';
    swipeHint.style.opacity = '';
    swipeHint.style.pointerEvents = '';
  }

  // Update Overview Grid Swapping
  ['tutor', 'fastfood', 'arcana', 'restaurante', 'comparativo'].forEach(key => {
    const grid = document.getElementById(`overviewGrid-${key}`);
    if (grid) {
      // Empty string (not 'grid') so the stylesheet decides the layout: the
      // upgraded navigator stacks act sections instead of a flat card grid.
      grid.style.display = key === activeDeck ? '' : 'none';
    }
  });

  primeNearbySlides(activeDeck, currentSlide);
  updateSlideDisplay('next');
}

// Slide Navigation with Fluid Directional Transitions
function goToSlide(slideNum, direction = 'next', options = {}) {
  if (activeDeck === 'hub') return;
  if (!options.fromBriefingTour) {
    stopExecutiveBriefing();
  }
  const total = totalSlides();
  if (slideNum < 1) slideNum = 1;
  if (slideNum > total) slideNum = total;
  currentSlide = slideNum;
  updateSlideDisplay(direction);
  if (isOverviewOpen) toggleOverview();
}

function nextSlide() {
  if (activeDeck === 'hub') return;
  if (currentSlide < totalSlides()) {
    goToSlide(currentSlide + 1, 'next');
  }
}

function prevSlide() {
  if (activeDeck === 'hub') return;
  if (currentSlide > 1) {
    goToSlide(currentSlide - 1, 'prev');
  }
}

function updateSlideDisplay(direction = 'next') {
  if (activeDeck === 'hub') return;

  const activeContainer = document.getElementById(`deck-${activeDeck}`);
  if (!activeContainer) return;

  const currentDeckSlides = activeContainer.querySelectorAll('.slide');
  currentDeckSlides.forEach(slide => {
    const sId = parseInt(slide.getAttribute('data-slide'), 10);
    slide.classList.remove('slide-enter-next', 'slide-enter-prev');
    if (sId === currentSlide) {
      slide.classList.add('active');
      slide.classList.add(direction === 'prev' ? 'slide-enter-prev' : 'slide-enter-next');
      slide.scrollTop = 0; // Reset scroll on slide change
      animateLiveCounters(slide);
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

  // Update Desktop & Mobile Nav Buttons
  const isFirst = currentSlide === 1;
  const isLast = currentSlide === total;

  if (prevBtn) prevBtn.disabled = isFirst;
  if (nextBtn) nextBtn.disabled = isLast;

  const mobileEdgePrev = document.getElementById('mobileEdgePrev');
  const mobileEdgeNext = document.getElementById('mobileEdgeNext');
  if (mobileEdgePrev) {
    mobileEdgePrev.style.display = isFirst ? 'none' : 'flex';
  }
  if (mobileEdgeNext) {
    mobileEdgeNext.style.display = isLast ? 'none' : 'flex';
  }

  // Fade out mobile swipe hint once interacted with
  const swipeHint = document.getElementById('mobileSwipeHint');
  if (swipeHint && currentSlide > 1) {
    swipeHint.style.opacity = '0';
    swipeHint.style.pointerEvents = 'none';
  }

  // Highlight active thumbnail in active overview
  const activeGrid = document.getElementById(`overviewGrid-${activeDeck}`);
  if (activeGrid) {
    const thumbs = activeGrid.querySelectorAll('.overview-thumb-card');
    // data-slide is authoritative once the navigator groups cards by act,
    // because document order no longer matches the running order.
    thumbs.forEach((thumb, idx) => {
      const slideNum = parseInt(thumb.dataset.slide || '', 10) || idx + 1;
      thumb.classList.toggle('active', slideNum === currentSlide);
    });
  }

  updateCommentsCounterBadge();
  if (isCommentsOpen) {
    openCommentsDrawer();
  }

  if (window.VentureHubBridge && typeof window.VentureHubBridge.syncSpeechSlide === 'function') {
    // Speech engine uses the same 1-based slide numbers as notes/Q&A
    window.VentureHubBridge.syncSpeechSlide(currentSlide);
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

// Language visibility is applied as inline styles, so any markup injected
// after the last applyLanguage() call would render both languages at once.
// Views built on demand must re-apply it over their own subtree.
function applyLanguageWithin(root, lang = currentLang) {
  const scope = root || document;
  const showEs = lang !== 'en';
  scope.querySelectorAll('.lang-es').forEach(el => { el.style.display = showEs ? '' : 'none'; });
  scope.querySelectorAll('.lang-en').forEach(el => { el.style.display = showEs ? 'none' : ''; });
}

function applyLanguage(lang) {
  currentLang = lang === 'en' ? 'en' : 'es';
  document.documentElement.setAttribute('data-lang', currentLang);
  document.querySelectorAll('.lang-opt').forEach((btn) => {
    btn.classList.toggle('is-active', btn.getAttribute('data-lang') === currentLang);
  });

  updateChromeMeta();

  applyLanguageWithin(document, currentLang);

  // Update drawer forms, placeholders, and options
  updateDrawerFormLanguage(currentLang);

  const navSearch = document.getElementById('navSearchInput');
  if (navSearch) {
    navSearch.placeholder = navSearch.getAttribute(`data-placeholder-${currentLang}`) || navSearch.placeholder;
  }
  if (isOverviewOpen) refreshNavigatorState();

  // Live update executive audience badge & pitch timer
  if (typeof updateAudienceBadgeLanguage === 'function') updateAudienceBadgeLanguage();
  if (typeof updatePitchTimerPlayBtn === 'function') updatePitchTimerPlayBtn();

  populateBriefingVoiceSelectors();

  if (isSpeechSupported() && speechSynthesis.speaking && briefingEngine.mode) {
    stopExecutiveBriefing();
  }

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

// ==========================================================================
// EXECUTIVE NAVIGATOR (Overview Drawer)
// Turns the flat slide grid into a narrative map: slides are grouped into
// pitch acts and annotated with Q&A readiness so the presenter can see, at a
// glance, where the story is thin before walking into the room.
// ==========================================================================

// The canonical pitch arc. Sections always render in this order.
const NARRATIVE_ACTS = [
  { id: 'opening', upTo: 0.08, es: 'Apertura y Tesis', en: 'Opening & Thesis' },
  { id: 'problem', upTo: 0.30, es: 'Problema y Dolor', en: 'Problem & Pain' },
  { id: 'solution', upTo: 0.55, es: 'Solución y Tecnología', en: 'Solution & Technology' },
  { id: 'market', upTo: 0.75, es: 'Mercado y Competencia', en: 'Market & Competition' },
  { id: 'model', upTo: 0.92, es: 'Modelo y Economía', en: 'Model & Economics' },
  { id: 'close', upTo: 1.01, es: 'Cierre y Ask', en: 'Close & Ask' }
];

// Slides are classified by their own category label rather than by position,
// because the decks do not follow a uniform running order (slide 3 is already
// "Our Solution" in one deck and "Investment Thesis" in another). Rules are
// evaluated top-down and the first keyword hit wins, so multi-word phrases
// must precede the broader single-word buckets that could also match them
// ("Investment Thesis" vs "Investment Ask" vs "Investment Model").
const NAV_ACT_RULES = [
  ['close', ['cierre ejecutivo', 'executive closing', 'investment ask', 'ronda de inversion',
    'solicitud de inversion', 'proximos pasos', 'next steps', 'hoja de ruta', 'roadmap', 'expansion']],
  ['opening', ['tesis de inversion', 'investment thesis', 'propuesta ejecutiva', 'executive proposal',
    'baird lab']],
  ['market', ['tamano de mercado', 'market size', 'comparativa de mercado', 'benchmark',
    'traccion', 'traction', 'metricas', 'metrics', 'ventaja competitiva', 'competitive advantage',
    'posicionamiento', 'positioning', 'scope', 'estrategias del sector', 'sector strategies']],
  ['model', ['modelo de negocio', 'business model', 'economia unitaria', 'unit economics',
    'modelo de inversion', 'capex', 'presupuesto', 'budget', 'gatilladores roi', 'roi',
    'franquicia', 'flywheel', 'gestion de riesgos', 'risk', 'modelo en 3 capas', '3-layer model',
    'checklist', 'promesa honesta', 'honest promise', 'ganancia empresarial', 'business value']],
  ['problem', ['problema', 'problem', 'pain', 'dolor', 'limites', 'limits', 'fugas', 'leaks',
    'nist', 'madurez operativa', 'operational maturity', 'capacidad actual', 'current assets']],
  ['solution', ['solucion', 'solution', 'que es', 'what is', 'multi-agente', 'multi-agent',
    'memoria', 'memory', 'grafos', 'knowledge graph', 'hardware', 'infraestructura',
    'infrastructure', 'correlacion', 'correlation', 'ecosistema', 'ecosystem', 'stack',
    'tecnologico', 'technical', 'ingenieria de menu', 'menu engineering', 'cierre diario',
    'daily close', 'liquidacion', 'settlement', 'portal', 'dominio', 'mastery', 'integracion',
    'integration', 'ciudad piloto', 'pilot city', 'continuidad', 'continuity', 'talento',
    'talent', 'personas', 'people', 'equipos', 'teams', 'piloto', 'pilot', 'arcana']]
];

const NAV_SECONDS_PER_SLIDE = 40;
const navFilter = { text: '', act: 'all' };

function actById(id) {
  return NARRATIVE_ACTS.find((act) => act.id === id) || NARRATIVE_ACTS[0];
}

function resolveNarrativeAct(slideNum, total, categoryText) {
  // The cover slide always opens the story, whatever its label says.
  if (slideNum <= 1) return NARRATIVE_ACTS[0];

  const haystack = navNormalize(categoryText);
  if (haystack) {
    const hit = NAV_ACT_RULES.find(([, keywords]) => keywords.some((kw) => haystack.includes(kw)));
    if (hit) return actById(hit[0]);
  }

  // Unlabelled or unrecognised slide: fall back to its relative position.
  const ratio = slideNum / Math.max(total, 1);
  return NARRATIVE_ACTS.find((act) => ratio <= act.upTo) || NARRATIVE_ACTS[NARRATIVE_ACTS.length - 1];
}

// Lowercase and strip diacritics so "solucion" matches "Solución".
function navNormalize(str) {
  return String(str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function navActLabel(act) {
  return `<span class="lang-es">${act.es}</span><span class="lang-en">${act.en}</span>`;
}

function navEstimatedMinutes(slideCount) {
  return Math.max(1, Math.round((slideCount * NAV_SECONDS_PER_SLIDE) / 60));
}

function ensureNavigatorChrome() {
  if (!overviewDrawer || overviewDrawer.dataset.navChrome === '1') return;

  const header = overviewDrawer.querySelector('.overview-header');
  if (!header) return;

  const stats = document.createElement('div');
  stats.className = 'nav-stats';
  stats.id = 'navStats';
  header.insertBefore(stats, header.querySelector('.lightbox-close-btn'));

  const toolbar = document.createElement('div');
  toolbar.className = 'nav-toolbar';
  toolbar.innerHTML = `
    <div class="nav-search">
      <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="search" id="navSearchInput" autocomplete="off"
        data-placeholder-es="Buscar por título o tema…"
        data-placeholder-en="Search by title or topic…"
        placeholder="Buscar por título o tema…"
        aria-label="Buscar diapositiva">
    </div>
    <div class="nav-act-chips" id="navActChips" role="group" aria-label="Filtrar por acto narrativo"></div>
  `;
  header.insertAdjacentElement('afterend', toolbar);

  const input = document.getElementById('navSearchInput');
  if (input) {
    input.addEventListener('input', () => {
      navFilter.text = navNormalize(input.value);
      applyNavigatorFilter();
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const first = visibleNavigatorCards()[0];
        if (first) first.focus();
      }
    });
  }

  overviewDrawer.dataset.navChrome = '1';
}

function buildNavigatorForDeck(deckKey) {
  const grid = document.getElementById(`overviewGrid-${deckKey}`);
  if (!grid || grid.dataset.navUpgraded === '1') return;

  const cards = Array.from(grid.querySelectorAll('.overview-thumb-card'));
  if (cards.length === 0) return;
  const total = cards.length;

  const slides = cards.map((card, index) => {
    const numEl = card.querySelector('.thumb-num');
    const titleEl = card.querySelector('.thumb-title');
    // The category lives as .lang-es/.lang-en spans inside .thumb-num, after
    // the "SLIDE 01 / 15 ·" prefix we are replacing with a dedicated chip.
    const categoryHtml = numEl ? Array.from(numEl.children).map((el) => el.outerHTML).join('') : '';
    return {
      slide: index + 1,
      categoryHtml,
      titleHtml: titleEl ? titleEl.innerHTML : '',
      searchText: navNormalize(`${numEl ? numEl.textContent : ''} ${titleEl ? titleEl.textContent : ''}`),
      act: resolveNarrativeAct(index + 1, total, numEl ? numEl.textContent : '')
    };
  });

  const groups = NARRATIVE_ACTS
    .map((act) => ({ act, items: slides.filter((item) => item.act.id === act.id) }))
    .filter((group) => group.items.length > 0);

  grid.innerHTML = `
    ${groups.map((group) => renderNavigatorAct(group, total)).join('')}
    <div class="nav-empty" id="navEmptyState" hidden>
      <span class="lang-es">Ninguna diapositiva coincide con la búsqueda.</span>
      <span class="lang-en">No slides match your search.</span>
    </div>
  `;
  grid.dataset.navUpgraded = '1';
  grid.dataset.navTotal = String(total);
  applyLanguageWithin(grid);
}

function renderNavigatorAct(group, total) {
  const minutes = navEstimatedMinutes(group.items.length);
  return `
    <section class="nav-act" data-act="${group.act.id}">
      <header class="nav-act__head">
        <span class="nav-act__marker" aria-hidden="true"></span>
        <h3 class="nav-act__name">${navActLabel(group.act)}</h3>
        <span class="nav-act__meta">
          <span class="lang-es">${group.items.length} de ${total} diapositivas · ~${minutes} min</span>
          <span class="lang-en">${group.items.length} of ${total} slides · ~${minutes} min</span>
        </span>
        <span class="nav-act__readiness" data-act-readiness="${group.act.id}"></span>
      </header>
      <div class="nav-act__cards">
        ${group.items.map((item) => renderNavigatorCard(item, total)).join('')}
      </div>
    </section>
  `;
}

function renderNavigatorCard(item, total) {
  const padded = item.slide < 10 ? `0${item.slide}` : `${item.slide}`;
  return `
    <div class="overview-thumb-card nav-card" data-slide="${item.slide}" data-act="${item.act.id}"
      data-search="${escapeHtml(item.searchText)}" role="button" tabindex="0"
      aria-label="Diapositiva ${item.slide} de ${total}" onclick="goToSlide(${item.slide})">
      <div class="nav-card__head">
        <span class="nav-card__num">${padded}</span>
        <span class="nav-card__cat">${item.categoryHtml}</span>
      </div>
      <div class="thumb-title">${item.titleHtml}</div>
      <div class="nav-card__foot" data-nav-foot="${item.slide}"></div>
    </div>
  `;
}

function visibleNavigatorCards() {
  const grid = document.getElementById(`overviewGrid-${activeDeck}`);
  if (!grid) return [];
  return Array.from(grid.querySelectorAll('.nav-card')).filter((card) => !card.classList.contains('is-hidden'));
}

function refreshNavigatorState() {
  const grid = document.getElementById(`overviewGrid-${activeDeck}`);
  if (!grid || grid.dataset.navUpgraded !== '1') return;

  const total = parseInt(grid.dataset.navTotal || '0', 10) || totalSlides();
  const isEs = getActiveLang() === 'es';
  const readinessByAct = {};
  let slidesWithQa = 0;

  grid.querySelectorAll('.nav-card').forEach((card) => {
    const slide = parseInt(card.dataset.slide || '0', 10);
    const act = card.dataset.act || 'opening';
    const notes = getSlideNotes(activeDeck, slide);
    const pinned = notes.filter((note) => note.pinned).length;

    readinessByAct[act] = readinessByAct[act] || { ready: 0, count: 0 };
    readinessByAct[act].count += 1;
    if (notes.length > 0) {
      readinessByAct[act].ready += 1;
      slidesWithQa += 1;
    }

    card.classList.toggle('is-current', slide === currentSlide);
    card.classList.toggle('is-unprepared', notes.length === 0);

    const foot = card.querySelector('.nav-card__foot');
    if (foot) {
      const badges = [];
      if (slide === currentSlide) {
        badges.push(`<span class="nav-badge nav-badge--current">${isEs ? 'En pantalla' : 'On screen'}</span>`);
      }
      if (notes.length > 0) {
        badges.push(`<span class="nav-badge nav-badge--qa">${notes.length} Q&amp;A</span>`);
      } else {
        badges.push(`<span class="nav-badge nav-badge--gap">${isEs ? 'Sin Q&amp;A' : 'No Q&amp;A'}</span>`);
      }
      if (pinned > 0) {
        badges.push(`<span class="nav-badge nav-badge--key">${isEs ? 'Clave' : 'Key'}</span>`);
      }
      foot.innerHTML = badges.join('');
    }
  });

  grid.querySelectorAll('[data-act-readiness]').forEach((el) => {
    const stats = readinessByAct[el.getAttribute('data-act-readiness')];
    if (!stats) {
      el.textContent = '';
      return;
    }
    const complete = stats.ready === stats.count;
    el.className = `nav-act__readiness ${complete ? 'is-complete' : 'is-partial'}`;
    el.textContent = isEs
      ? `${stats.ready}/${stats.count} con Q&A`
      : `${stats.ready}/${stats.count} with Q&A`;
  });

  renderNavigatorStats(total, slidesWithQa, isEs);
  renderNavigatorActChips(readinessByAct, isEs);
  applyNavigatorFilter();
}

function renderNavigatorStats(total, slidesWithQa, isEs) {
  // Decks do not share a slide count (10 for Arcana Restaurantes and the AI
  // infrastructure brief, 15 for the rest), so the heading must follow the deck.
  const titleEn = document.getElementById('overviewTitleEn');
  const titleEs = document.getElementById('overviewTitleEs');
  const deckName = DECK_CONFIG[activeDeck];
  if (titleEn) {
    titleEn.textContent = `${deckName ? deckName.title_en : 'Executive'} · Slide Navigator (${total} Slides)`;
  }
  if (titleEs) {
    titleEs.textContent = `${deckName ? deckName.title_es : 'Ejecutivo'} · Navegador (${total} Diapositivas)`;
  }

  const stats = document.getElementById('navStats');
  if (!stats) return;

  const percent = total > 0 ? Math.round((currentSlide / total) * 100) : 0;
  const remaining = Math.max(0, total - currentSlide);

  stats.innerHTML = `
    <div class="nav-stat">
      <span class="nav-stat__value">${currentSlide} / ${total}</span>
      <span class="nav-stat__label">${isEs ? 'Posición actual' : 'Current position'}</span>
      <div class="nav-stat__bar"><span style="width: ${percent}%"></span></div>
    </div>
    <div class="nav-stat">
      <span class="nav-stat__value">${slidesWithQa} / ${total}</span>
      <span class="nav-stat__label">${isEs ? 'Con Q&A preparado' : 'With Q&A prepared'}</span>
    </div>
    <div class="nav-stat">
      <span class="nav-stat__value">~${navEstimatedMinutes(remaining)} min</span>
      <span class="nav-stat__label">${isEs ? 'Restante estimado' : 'Estimated remaining'}</span>
    </div>
  `;
}

function renderNavigatorActChips(readinessByAct, isEs) {
  const container = document.getElementById('navActChips');
  const grid = document.getElementById(`overviewGrid-${activeDeck}`);
  if (!container || !grid) return;

  const acts = Array.from(grid.querySelectorAll('.nav-act')).map((section) => {
    const id = section.getAttribute('data-act');
    const meta = NARRATIVE_ACTS.find((act) => act.id === id) || NARRATIVE_ACTS[0];
    return { id, meta, count: (readinessByAct[id] || { count: 0 }).count };
  });

  const allChip = `
    <button type="button" class="nav-chip ${navFilter.act === 'all' ? 'is-active' : ''}"
      onclick="setNavigatorActFilter('all')">${isEs ? 'Todo el pitch' : 'Full pitch'}</button>
  `;

  container.innerHTML = allChip + acts.map((act) => `
    <button type="button" class="nav-chip ${navFilter.act === act.id ? 'is-active' : ''}"
      onclick="setNavigatorActFilter('${act.id}')">
      ${isEs ? act.meta.es : act.meta.en}<span class="nav-chip__count">${act.count}</span>
    </button>
  `).join('');
}

function setNavigatorActFilter(actId) {
  navFilter.act = actId;
  applyNavigatorFilter();
  renderNavigatorActChips(
    Array.from(document.querySelectorAll(`#overviewGrid-${activeDeck} .nav-act`)).reduce((acc, section) => {
      const id = section.getAttribute('data-act');
      acc[id] = { count: section.querySelectorAll('.nav-card').length, ready: 0 };
      return acc;
    }, {}),
    getActiveLang() === 'es'
  );
}

function applyNavigatorFilter() {
  const grid = document.getElementById(`overviewGrid-${activeDeck}`);
  if (!grid || grid.dataset.navUpgraded !== '1') return;

  let visible = 0;
  grid.querySelectorAll('.nav-card').forEach((card) => {
    const matchesText = !navFilter.text || (card.dataset.search || '').includes(navFilter.text);
    const matchesAct = navFilter.act === 'all' || card.dataset.act === navFilter.act;
    const show = matchesText && matchesAct;
    card.classList.toggle('is-hidden', !show);
    if (show) visible += 1;
  });

  grid.querySelectorAll('.nav-act').forEach((section) => {
    const hasVisible = !!section.querySelector('.nav-card:not(.is-hidden)');
    section.classList.toggle('is-hidden', !hasVisible);
  });

  const empty = document.getElementById('navEmptyState');
  if (empty) empty.hidden = visible > 0;
}

function handleNavigatorKeydown(event) {
  const cards = visibleNavigatorCards();
  if (cards.length === 0) return;

  const currentIndex = cards.indexOf(document.activeElement);
  let nextIndex = null;

  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    nextIndex = currentIndex < 0 ? 0 : Math.min(currentIndex + 1, cards.length - 1);
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
    nextIndex = currentIndex < 0 ? 0 : Math.max(currentIndex - 1, 0);
  } else if (event.key === 'Home') {
    nextIndex = 0;
  } else if (event.key === 'End') {
    nextIndex = cards.length - 1;
  } else if ((event.key === 'Enter' || event.key === ' ') && currentIndex >= 0) {
    event.preventDefault();
    cards[currentIndex].click();
    return;
  }

  if (nextIndex !== null) {
    event.preventDefault();
    cards[nextIndex].focus();
    cards[nextIndex].scrollIntoView({ block: 'nearest' });
  }
}

// Overview Drawer Toggle
function toggleOverview() {
  if (activeDeck === 'hub') return;
  isOverviewOpen = !isOverviewOpen;
  if (!overviewDrawer) return;

  if (!isOverviewOpen) {
    overviewDrawer.classList.remove('open');
    return;
  }

  ensureNavigatorChrome();
  buildNavigatorForDeck(activeDeck);
  navFilter.text = '';
  navFilter.act = 'all';
  const input = document.getElementById('navSearchInput');
  if (input) input.value = '';
  refreshNavigatorState();
  overviewDrawer.classList.add('open');

  const current = overviewDrawer.querySelector('.nav-card.is-current');
  if (current) current.scrollIntoView({ block: 'center' });
  if (input) setTimeout(() => input.focus(), 80);
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
    if (e.key === 'Escape' || e.key.toLowerCase() === 'g') {
      toggleOverview();
      return;
    }
    handleNavigatorKeydown(e);
    return;
  }

  switch (e.key) {
    case 'ArrowRight':
    case 'PageDown':
    case ' ':
    case 'n':
    case 'N':
      if (activeDeck !== 'hub') {
        e.preventDefault();
        nextSlide();
      }
      break;
    case 'ArrowLeft':
    case 'PageUp':
    case 'Backspace':
      if (activeDeck !== 'hub') {
        e.preventDefault();
        prevSlide();
      }
      break;
    case 'Home':
      if (activeDeck !== 'hub') {
        e.preventDefault();
        goToSlide(1, 'prev');
      }
      break;
    case 'End':
      if (activeDeck !== 'hub') {
        e.preventDefault();
        goToSlide(totalSlides(), 'next');
      }
      break;
    case 'f':
    case 'F':
      e.preventDefault();
      toggleFullscreen();
      break;
    case 'g':
    case 'G':
    case 'o':
    case 'O':
      if (activeDeck !== 'hub') {
        e.preventDefault();
        toggleOverview();
      }
      break;
    case 'c':
    case 'C':
    case 'q':
    case 'Q':
      e.preventDefault();
      toggleCommentsDrawer();
      break;
    case 'a':
    case 'A':
      e.preventDefault();
      cycleAudience();
      break;
    case 'p':
    case 'P':
      e.preventDefault();
      togglePitchTimerPanel();
      break;
    case 'k':
    case 'K':
      e.preventDefault();
      toggleLaserPointer();
      break;
    case 'm':
    case 'M':
    case 'h':
    case 'H':
      e.preventDefault();
      openExecutiveHub();
      break;
    case 'l':
    case 'L':
      if (!e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleLanguage();
      }
      break;
    case 't':
    case 'T':
      e.preventDefault();
      toggleTheme();
      break;
    case 'v':
    case 'V':
      e.preventDefault();
      if (e.shiftKey && activeDeck !== 'hub') {
        startDeckAudioTour();
      } else {
        toggleExecutiveBriefing();
      }
      break;
    case 'Escape':
      if (isSpeechSupported() && speechSynthesis.speaking) {
        stopExecutiveBriefing();
        break;
      }
      const timerPopover = document.getElementById('pitchTimerPopover');
      if (timerPopover && timerPopover.classList.contains('open')) {
        togglePitchTimerPanel();
      } else if (isCommentsOpen) {
        closeCommentsDrawer();
      } else if (isOverviewOpen) {
        toggleOverview();
      } else if (activeDeck !== 'hub') {
        openExecutiveHub();
      }
      break;
  }
});

// Advanced Touch & Gesture Navigation System
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;

function setupTouchGestures() {
  const stage = document.getElementById('slideViewport') || document.body;
  const ignoreSel = 'input, textarea, select, button, a, .pitch-timer-popover, .comments-drawer, .comments-drawer-body, .overview-drawer, #transcriptDrawerMount, .transcript-drawer, .live-subtitles-hud';

  document.addEventListener('touchstart', (e) => {
    if (e.target.closest(ignoreSel)) return;
    if (e.touches && e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    }
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (e.target.closest(ignoreSel)) return;
    if (!e.changedTouches || e.changedTouches.length === 0) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    const elapsed = Date.now() - touchStartTime;

    // Swipe down closes drawers / transcript on mobile
    if (diffY > 80 && Math.abs(diffY) > Math.abs(diffX) * 1.5) {
      if (isCommentsOpen) {
        closeCommentsDrawer();
        return;
      }
      if (isOverviewOpen) {
        toggleOverview();
        return;
      }
      const transcriptMount = document.getElementById('transcriptDrawerMount');
      if (transcriptMount && transcriptMount.style.display !== 'none') {
        if (window.VentureHubBridge && typeof window.VentureHubBridge.closeTranscriptDrawer === 'function') {
          window.VentureHubBridge.closeTranscriptDrawer();
        }
        return;
      }
    }

    // Horizontal swipe for slides (drawers closed, not on hub)
    if (!isCommentsOpen && !isOverviewOpen && activeDeck !== 'hub') {
      const isFastSwipe = elapsed < 350 && Math.abs(diffX) > 30;
      const isLongSwipe = Math.abs(diffX) > 55;

      if ((isFastSwipe || isLongSwipe) && Math.abs(diffX) > Math.abs(diffY) * 1.15) {
        const hint = document.getElementById('mobileSwipeHint');
        if (hint) hint.style.display = 'none';
        if (diffX < 0) nextSlide();
        else prevSlide();
      }
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
        "question_es": "¿Por qué 'poseer capacidad' es mejor tesis que 'alquilar inteligencia'?",
        "question_en": "Why is 'owning capacity' a stronger thesis than 'renting intelligence'?",
        "answer_es": "Alquilar da acceso, pero no patrimonio. Poseer hardware convierte el gasto recurrente en un activo que acelera las ventures, retiene datos y reduce dependencia de facturas cloud.",
        "answer_en": "Renting buys access, not equity. Owned hardware turns recurring spend into an asset that accelerates ventures, retains data, and reduces cloud-invoice dependency.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Por qué 'poseer capacidad' es mejor tesis que 'alquilar inteligencia'?",
        "answer": "Alquilar da acceso, pero no patrimonio. Poseer hardware convierte el gasto recurrente en un activo que acelera las ventures, retiene datos y reduce dependencia de facturas cloud."
      },
      {
        "id": "comp-1-2",
        "category": "objecion",
        "question_es": "¿No es más fácil quedarse 100% en APIs cloud?",
        "question_en": "Isn't it easier to stay 100% on cloud APIs?",
        "answer_es": "Es más fácil a corto plazo y más caro e inestable a largo plazo. La nube sigue siendo puente; la propiedad es el destino estratégico.",
        "answer_en": "Easier short-term, costlier and less stable long-term. Cloud remains a bridge; ownership is the strategic destination.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿No es más fácil quedarse 100% en APIs cloud?",
        "answer": "Es más fácil a corto plazo y más caro e inestable a largo plazo. La nube sigue siendo puente; la propiedad es el destino estratégico."
      },
      {
        "id": "comp-1-3",
        "category": "nota",
        "question_es": "Nota del presentador: Frase de apertura",
        "question_en": "Presenter note: Opening line",
        "answer_es": "Abrir con: 'Cada hora que alquilamos el cerebro de otro, pagamos dos veces: en efectivo y en dependencia'.",
        "answer_en": "Open with: 'Every hour we rent someone else's brain, we pay twice: in cash and in dependency'.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Frase de apertura",
        "answer": "Abrir con: 'Cada hora que alquilamos el cerebro de otro, pagamos dos veces: en efectivo y en dependencia'."
      }
    ],
    "2": [
      {
        "id": "comp-2-1",
        "category": "inversor",
        "question_es": "¿Cuáles son los cuatro resultados de invertir en capacidad propia?",
        "question_en": "What are the four outcomes of investing in owned capacity?",
        "answer_es": "Más rápido, más seguro, nuestro (activo) y humano (agentes que liberan horas del equipo).",
        "answer_en": "Faster, safer, ours (an asset), and human (agents that free team hours).",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuáles son los cuatro resultados de invertir en capacidad propia?",
        "answer": "Más rápido, más seguro, nuestro (activo) y humano (agentes que liberan horas del equipo)."
      },
      {
        "id": "comp-2-2",
        "category": "operativa",
        "question_es": "¿Cómo se traduce 'más seguro' para un inversor no técnico?",
        "question_en": "How does 'safer' translate for a non-technical investor?",
        "answer_es": "El trabajo sensible puede quedarse en máquinas bajo nuestro control, con menos datos saliendo a terceros.",
        "answer_en": "Sensitive work can stay on machines we control, with less data leaving to third parties.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Cómo se traduce 'más seguro' para un inversor no técnico?",
        "answer": "El trabajo sensible puede quedarse en máquinas bajo nuestro control, con menos datos saliendo a terceros."
      },
      {
        "id": "comp-2-3",
        "category": "nota",
        "question_es": "Nota del presentador: No vender GPUs, vender resultados",
        "question_en": "Presenter note: Don't sell GPUs — sell outcomes",
        "answer_es": "Insistir: el inversor no compra hardware; compra velocidad, custodia, agentes y horas recuperadas.",
        "answer_en": "Insist: the investor is not buying hardware; they are buying speed, custody, agents, and reclaimed hours.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: No vender GPUs, vender resultados",
        "answer": "Insistir: el inversor no compra hardware; compra velocidad, custodia, agentes y horas recuperadas."
      }
    ],
    "3": [
      {
        "id": "comp-3-1",
        "category": "inversor",
        "question_es": "¿Qué podemos entregar hoy sin CapEx adicional?",
        "question_en": "What can we ship today with no additional CapEx?",
        "answer_es": "Programas simples, páginas web, pequeñas plataformas de pago, algunos agentes (incluso 24/7 limitados) e IAs muy pequeñas.",
        "answer_en": "Simple software, websites, small paid platforms, a few agents (including limited 24/7), and very small AIs.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Qué podemos entregar hoy sin CapEx adicional?",
        "answer": "Programas simples, páginas web, pequeñas plataformas de pago, algunos agentes (incluso 24/7 limitados) e IAs muy pequeñas."
      },
      {
        "id": "comp-3-2",
        "category": "objecion",
        "question_es": "Si ya pueden hacer eso, ¿para qué invertir?",
        "question_en": "If you can already do that, why invest?",
        "answer_es": "Porque el piso actual sirve para construir, no para multiplicar. Al escalar agentes o entrenamiento, el equipo colapsa y el peaje cloud sube.",
        "answer_en": "Because today's floor can build, not multiply. Scaling agents or training collapses the machine and raises the cloud toll.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Si ya pueden hacer eso, ¿para qué invertir?",
        "answer": "Porque el piso actual sirve para construir, no para multiplicar. Al escalar agentes o entrenamiento, el equipo colapsa y el peaje cloud sube."
      },
      {
        "id": "comp-3-3",
        "category": "nota",
        "question_es": "Nota del presentador: Línea honesta",
        "question_en": "Presenter note: Honest line",
        "answer_es": "Decir explícitamente: 'Podemos construir. Todavía no podemos multiplicar sin romperse'.",
        "answer_en": "Say explicitly: 'We can build. We cannot yet multiply without breaking'.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Línea honesta",
        "answer": "Decir explícitamente: 'Podemos construir. Todavía no podemos multiplicar sin romperse'."
      }
    ],
    "4": [
      {
        "id": "comp-4-1",
        "category": "inversor",
        "question_es": "¿Cuánto cuesta en promedio entrenar con modelos de frontera de pago?",
        "question_en": "What is the average cost of training with paid frontier models?",
        "answer_es": "En ciclos serios de entrenamiento, el peaje de modelos de frontera de pago ronda un promedio de unos US$5.000, además del tiempo del equipo.",
        "answer_en": "On serious training cycles, the paid frontier-model toll averages about US$5,000 — on top of team time.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuánto cuesta en promedio entrenar con modelos de frontera de pago?",
        "answer": "En ciclos serios de entrenamiento, el peaje de modelos de frontera de pago ronda un promedio de unos US$5.000, además del tiempo del equipo."
      },
      {
        "id": "comp-4-2",
        "category": "objecion",
        "question_es": "¿Por qué no seguir pagando APIs si ya funciona?",
        "question_en": "Why not keep paying APIs if it already works?",
        "answer_es": "Porque el peaje es recurrente, no crea activo, y aumenta la dependencia. El hardware convierte parte de ese gasto en capacidad propia.",
        "answer_en": "Because the toll is recurring, creates no asset, and increases dependency. Hardware converts part of that spend into owned capacity.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Por qué no seguir pagando APIs si ya funciona?",
        "answer": "Porque el peaje es recurrente, no crea activo, y aumenta la dependencia. El hardware convierte parte de ese gasto en capacidad propia."
      },
      {
        "id": "comp-4-3",
        "category": "nota",
        "question_es": "Nota del presentador: Tiempo + efectivo",
        "question_en": "Presenter note: Time + cash",
        "answer_es": "Subrayar el doble costo: días del equipo a 12–15 h + ~US$5.000 de peaje en ciclos serios.",
        "answer_en": "Underline the double cost: team days at 12–15h + ~US$5,000 toll on serious cycles.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Tiempo + efectivo",
        "answer": "Subrayar el doble costo: días del equipo a 12–15 h + ~US$5.000 de peaje en ciclos serios."
      }
    ],
    "5": [
      {
        "id": "comp-5-1",
        "category": "operativa",
        "question_es": "¿Qué pasa cuando intentan correr más agentes 24/7?",
        "question_en": "What happens when you try to run more 24/7 agents?",
        "answer_es": "Algunos agentes ya corren, pero al subir la carga el equipo se satura: todo se ralentiza o colapsa. La ambición no es el límite; la capacidad sí.",
        "answer_en": "A few agents already run, but as load rises the machine saturates: everything slows or collapses. Ambition is not the limit; capacity is.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Qué pasa cuando intentan correr más agentes 24/7?",
        "answer": "Algunos agentes ya corren, pero al subir la carga el equipo se satura: todo se ralentiza o colapsa. La ambición no es el límite; la capacidad sí."
      },
      {
        "id": "comp-5-2",
        "category": "inversor",
        "question_es": "¿Por qué es importante mantener la información local?",
        "question_en": "Why does keeping information local matter?",
        "answer_es": "Por convicción de custodia y por ventaja comercial: menos fuga a terceros y mejor postura frente a clientes e inversores.",
        "answer_en": "Out of custody conviction and commercial advantage: less third-party leakage and a stronger posture with clients and investors.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Por qué es importante mantener la información local?",
        "answer": "Por convicción de custodia y por ventaja comercial: menos fuga a terceros y mejor postura frente a clientes e inversores."
      },
      {
        "id": "comp-5-3",
        "category": "nota",
        "question_es": "Nota del presentador: Frase de directorio",
        "question_en": "Presenter note: Board line",
        "answer_es": "Usar: 'Ambición de software sin capacidad de hardware es una promesa con mecha'.",
        "answer_en": "Use: 'Software ambition without hardware capacity is a promise with a fuse'.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Frase de directorio",
        "answer": "Usar: 'Ambición de software sin capacidad de hardware es una promesa con mecha'."
      }
    ],
    "6": [
      {
        "id": "comp-6-1",
        "category": "inversor",
        "question_es": "¿Cómo se relaciona la inversión con las 12–15 horas diarias del equipo?",
        "question_en": "How does investment relate to the team's 12–15 hour days?",
        "answer_es": "Hoy la calidad depende de ritmo heroico. Más capacidad y agentes absorben carga nocturna/repetitiva para cumplir metas con más descanso.",
        "answer_en": "Today quality depends on heroic pace. More capacity and agents absorb overnight/repetitive load so goals are met with more rest.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cómo se relaciona la inversión con las 12–15 horas diarias del equipo?",
        "answer": "Hoy la calidad depende de ritmo heroico. Más capacidad y agentes absorben carga nocturna/repetitiva para cumplir metas con más descanso."
      },
      {
        "id": "comp-6-2",
        "category": "objecion",
        "question_es": "¿No es esto solo 'comprar comodidad' para el equipo?",
        "question_en": "Isn't this just 'buying comfort' for the team?",
        "answer_es": "No: es infraestructura de continuidad. Sin descanso sostenible, el cuello de botella pasa a ser el talento humano, no el software.",
        "answer_en": "No: it is continuity infrastructure. Without sustainable rest, the bottleneck becomes human talent, not software.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿No es esto solo 'comprar comodidad' para el equipo?",
        "answer": "No: es infraestructura de continuidad. Sin descanso sostenible, el cuello de botella pasa a ser el talento humano, no el software."
      },
      {
        "id": "comp-6-3",
        "category": "nota",
        "question_es": "Nota del presentador: Ángulo humano",
        "question_en": "Presenter note: Human angle",
        "answer_es": "Cerrar la slide con: 'La mejor inversión compra máquinas que trabajan mientras los fundadores duermen'.",
        "answer_en": "Close the slide with: 'The best investment buys machines that work while founders sleep'.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Ángulo humano",
        "answer": "Cerrar la slide con: 'La mejor inversión compra máquinas que trabajan mientras los fundadores duermen'."
      }
    ],
    "7": [
      {
        "id": "comp-7-1",
        "category": "inversor",
        "question_es": "¿Cuál es la diferencia financiera entre alquilar y poseer?",
        "question_en": "What is the financial difference between renting and owning?",
        "answer_es": "Alquilar: costo mensual, datos fuera, cero activo residual. Poseer: CapEx que se vuelve activo, datos más cerca, ventaja que compone.",
        "answer_en": "Renting: monthly cost, data leaves, zero residual asset. Owning: CapEx that becomes an asset, data closer, compounding advantage.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es la diferencia financiera entre alquilar y poseer?",
        "answer": "Alquilar: costo mensual, datos fuera, cero activo residual. Poseer: CapEx que se vuelve activo, datos más cerca, ventaja que compone."
      },
      {
        "id": "comp-7-2",
        "category": "objecion",
        "question_es": "¿Abandonan por completo la nube?",
        "question_en": "Are you abandoning the cloud completely?",
        "answer_es": "No. La nube sigue como puente y refuerzo. La tesis es no depender de ella como único motor.",
        "answer_en": "No. Cloud remains a bridge and backup. The thesis is not to depend on it as the only engine.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Abandonan por completo la nube?",
        "answer": "No. La nube sigue como puente y refuerzo. La tesis es no depender de ella como único motor."
      },
      {
        "id": "comp-7-3",
        "category": "nota",
        "question_es": "Nota del presentador: Regla puente/destino",
        "question_en": "Presenter note: Bridge/destination rule",
        "answer_es": "Repetir: 'Usa la nube como puente. Construye la propiedad como destino'.",
        "answer_en": "Repeat: 'Use the cloud as a bridge. Build ownership as the destination'.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Regla puente/destino",
        "answer": "Repetir: 'Usa la nube como puente. Construye la propiedad como destino'."
      }
    ],
    "8": [
      {
        "id": "comp-8-1",
        "category": "inversor",
        "question_es": "¿Qué desbloquea una inversión de unos US$5.000?",
        "question_en": "What does an investment of about US$5,000 unlock?",
        "answer_es": "Estación/nodo de entrada: IAs pequeñas más estables, más agentes locales concurrentes y menos llamadas de pago para el trabajo diario.",
        "answer_en": "Entry workstation/node: more stable small AIs, more concurrent local agents, and fewer paid calls for day-to-day work.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Qué desbloquea una inversión de unos US$5.000?",
        "answer": "Estación/nodo de entrada: IAs pequeñas más estables, más agentes locales concurrentes y menos llamadas de pago para el trabajo diario."
      },
      {
        "id": "comp-8-2",
        "category": "operativa",
        "question_es": "¿Qué tipo de equipo es el Nivel A?",
        "question_en": "What kind of gear is Tier A?",
        "answer_es": "Estación IA de alta memoria o nodo local compacto (clase Mac mini / torre GPU de entrada), más herramientas básicas de orquestación.",
        "answer_en": "High-memory AI workstation or compact local node (Mac mini–class / entry GPU tower), plus basic orchestration tools.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Qué tipo de equipo es el Nivel A?",
        "answer": "Estación IA de alta memoria o nodo local compacto (clase Mac mini / torre GPU de entrada), más herramientas básicas de orquestación."
      },
      {
        "id": "comp-8-3",
        "category": "nota",
        "question_es": "Nota del presentador: Pitch de $5k",
        "question_en": "Presenter note: $5k pitch",
        "answer_es": "Posicionar $5k como prueba de menor riesgo: convertir una porción del gasto mensual de IA en activo durable.",
        "answer_en": "Position $5k as lowest-risk proof: convert a slice of monthly AI spend into a durable asset.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Pitch de $5k",
        "answer": "Posicionar $5k como prueba de menor riesgo: convertir una porción del gasto mensual de IA en activo durable."
      }
    ],
    "9": [
      {
        "id": "comp-9-1",
        "category": "inversor",
        "question_es": "¿Qué cambia entre US$35.000 y US$50.000?",
        "question_en": "What changes between US$35,000 and US$50,000?",
        "answer_es": "Varios agentes 24/7 sin colapsar tan fácil, entrenamiento a medida más rápido, menos peaje 'IA para entrenar IA', y carga nocturna que libera horas humanas.",
        "answer_en": "Several 24/7 agents without easy collapse, faster custom training, less 'AI-to-train-AI' toll, and overnight load that frees human hours.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Qué cambia entre US$35.000 y US$50.000?",
        "answer": "Varios agentes 24/7 sin colapsar tan fácil, entrenamiento a medida más rápido, menos peaje 'IA para entrenar IA', y carga nocturna que libera horas humanas."
      },
      {
        "id": "comp-9-2",
        "category": "objecion",
        "question_es": "¿Por qué no saltar directo a $150k?",
        "question_en": "Why not jump straight to $150k?",
        "answer_es": "Porque el capital debe crecer con la capacidad demostrada. El Nivel B prueba continuidad 24/7 antes del nodo empresarial.",
        "answer_en": "Because capital should grow with proven capacity. Tier B proves 24/7 continuity before the enterprise node.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Por qué no saltar directo a $150k?",
        "answer": "Porque el capital debe crecer con la capacidad demostrada. El Nivel B prueba continuidad 24/7 antes del nodo empresarial."
      },
      {
        "id": "comp-9-3",
        "category": "nota",
        "question_es": "Nota del presentador: Frase $50k",
        "question_en": "Presenter note: $50k line",
        "answer_es": "Decir: 'Aquí la capacidad empieza a verse como empresa, no como laptop'.",
        "answer_en": "Say: 'This is where capacity starts looking like a company, not a laptop'.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Frase $50k",
        "answer": "Decir: 'Aquí la capacidad empieza a verse como empresa, no como laptop'."
      }
    ],
    "10": [
      {
        "id": "comp-10-1",
        "category": "inversor",
        "question_es": "¿Qué justifica US$100.000–$150.000?",
        "question_en": "What justifies US$100,000–$150,000?",
        "answer_es": "Sala de máquinas del portafolio: muchos agentes/procesos en paralelo, entrenamiento local serio y postura institucional frente a clientes e inversores.",
        "answer_en": "Portfolio engine room: many parallel agents/processes, serious local training, and institutional posture for clients and investors.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Qué justifica US$100.000–$150.000?",
        "answer": "Sala de máquinas del portafolio: muchos agentes/procesos en paralelo, entrenamiento local serio y postura institucional frente a clientes e inversores."
      },
      {
        "id": "comp-10-2",
        "category": "operativa",
        "question_es": "¿Cómo beneficia esto a LUMI, Arcana y FoodTech?",
        "question_en": "How does this benefit LUMI, Arcana, and FoodTech?",
        "answer_es": "Comparten una misma capacidad fuerte: automatización, demos, entrenamiento y operación sin pelearse por un solo equipo saturado.",
        "answer_en": "They share one strong capacity: automation, demos, training, and ops without fighting over one saturated machine.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Cómo beneficia esto a LUMI, Arcana y FoodTech?",
        "answer": "Comparten una misma capacidad fuerte: automatización, demos, entrenamiento y operación sin pelearse por un solo equipo saturado."
      },
      {
        "id": "comp-10-3",
        "category": "nota",
        "question_es": "Nota del presentador: Frase $150k",
        "question_en": "Presenter note: $150k line",
        "answer_es": "Cerrar con: 'Compra la sala de máquinas que deja respirar a cinco ventures a la vez'.",
        "answer_en": "Close with: 'Buy the engine room that lets five ventures breathe at once'.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Frase $150k",
        "answer": "Cerrar con: 'Compra la sala de máquinas que deja respirar a cinco ventures a la vez'."
      }
    ],
    "11": [
      {
        "id": "comp-11-1",
        "category": "inversor",
        "question_es": "Si invertimos en equipos, ¿qué avanzamos concretamente?",
        "question_en": "If we invest in equipment, what concrete advances follow?",
        "answer_es": "Más agentes corriendo, más procesos en vivo, inteligencia a medida más rápida y aceleración del portafolio completo.",
        "answer_en": "More agents running, more live processes, faster custom intelligence, and full-portfolio acceleration.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Si invertimos en equipos, ¿qué avanzamos concretamente?",
        "answer": "Más agentes corriendo, más procesos en vivo, inteligencia a medida más rápida y aceleración del portafolio completo."
      },
      {
        "id": "comp-11-2",
        "category": "operativa",
        "question_es": "¿Cuál es la fórmula Capital → Capacidad?",
        "question_en": "What is the Capital → Capacity formula?",
        "answer_es": "Capital → Capacidad → Agentes → Horas liberadas → Ventures aceleradas.",
        "answer_en": "Capital → Capacity → Agents → Hours freed → Ventures accelerated.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es la fórmula Capital → Capacidad?",
        "answer": "Capital → Capacidad → Agentes → Horas liberadas → Ventures aceleradas."
      },
      {
        "id": "comp-11-3",
        "category": "nota",
        "question_es": "Nota del presentador: No vender specs",
        "question_en": "Presenter note: Don't sell specs",
        "answer_es": "Evitar jerga de VRAM. Hablar siempre en si → entonces de negocio.",
        "answer_en": "Avoid VRAM jargon. Always speak in business if → then.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: No vender specs",
        "answer": "Evitar jerga de VRAM. Hablar siempre en si → entonces de negocio."
      }
    ],
    "12": [
      {
        "id": "comp-12-1",
        "category": "inversor",
        "question_es": "¿Por qué la custodia local es un argumento de inversión?",
        "question_en": "Why is local custody an investment argument?",
        "answer_es": "Porque seguridad y soberanía de datos reducen riesgo reputacional/contractual y facilitan cerrar clientes que no quieren datos en nubes ajenas.",
        "answer_en": "Because data security and sovereignty reduce reputational/contract risk and help close clients who refuse third-party clouds.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Por qué la custodia local es un argumento de inversión?",
        "answer": "Porque seguridad y soberanía de datos reducen riesgo reputacional/contractual y facilitan cerrar clientes que no quieren datos en nubes ajenas."
      },
      {
        "id": "comp-12-2",
        "category": "objecion",
        "question_es": "¿La nube no es igual de segura con buenos contratos?",
        "question_en": "Isn't the cloud equally secure with good contracts?",
        "answer_es": "Puede ser segura, pero no elimina dependencia ni peajes, y muchos clientes exigen custodia física bajo nuestro control.",
        "answer_en": "It can be secure, but it does not remove dependency or tolls, and many clients demand physical custody under our control.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿La nube no es igual de segura con buenos contratos?",
        "answer": "Puede ser segura, pero no elimina dependencia ni peajes, y muchos clientes exigen custodia física bajo nuestro control."
      },
      {
        "id": "comp-12-3",
        "category": "nota",
        "question_es": "Nota del presentador: Frase de custodia",
        "question_en": "Presenter note: Custody line",
        "answer_es": "Usar: 'Quien sostiene el cómputo sostiene la forma más silenciosa de poder: la custodia'.",
        "answer_en": "Use: 'Whoever holds the compute holds the quietest form of power: custody'.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Frase de custodia",
        "answer": "Usar: 'Quien sostiene el cómputo sostiene la forma más silenciosa de poder: la custodia'."
      }
    ],
    "13": [
      {
        "id": "comp-13-1",
        "category": "inversor",
        "question_es": "¿Cuál es el ask exacto?",
        "question_en": "What is the exact ask?",
        "answer_es": "Inversión en equipos y herramientas desde US$5.000 hasta US$150.000, en tres peldaños con destrabes claros (A/B/C).",
        "answer_en": "Investment in equipment and tools from US$5,000 to US$150,000 across three rungs with clear unlocks (A/B/C).",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es el ask exacto?",
        "answer": "Inversión en equipos y herramientas desde US$5.000 hasta US$150.000, en tres peldaños con destrabes claros (A/B/C)."
      },
      {
        "id": "comp-13-2",
        "category": "objecion",
        "question_es": "¿Puedo entrar solo con $5.000?",
        "question_en": "Can I enter with only $5,000?",
        "answer_es": "Sí. El Nivel A es la puerta de menor riesgo para demostrar propiedad y reducir peaje diario antes de escalar.",
        "answer_en": "Yes. Tier A is the lowest-risk door to prove ownership and cut daily toll before scaling.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Puedo entrar solo con $5.000?",
        "answer": "Sí. El Nivel A es la puerta de menor riesgo para demostrar propiedad y reducir peaje diario antes de escalar."
      },
      {
        "id": "comp-13-3",
        "category": "nota",
        "question_es": "Nota del presentador: Cierre del ask",
        "question_en": "Presenter note: Ask close",
        "answer_es": "Rematar: 'No estás financiando gadgets. Estás financiando el motor del portafolio'.",
        "answer_en": "Close: 'You are not funding gadgets. You are funding the portfolio engine'.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Cierre del ask",
        "answer": "Rematar: 'No estás financiando gadgets. Estás financiando el motor del portafolio'."
      }
    ],
    "14": [
      {
        "id": "comp-14-1",
        "category": "inversor",
        "question_es": "¿Cuál es el siguiente paso después de elegir un nivel?",
        "question_en": "What is the next step after choosing a tier?",
        "answer_es": "1) Elegir nivel A/B/C, 2) desplegar capacidad y herramientas, 3) medir agentes en vivo y horas liberadas del equipo.",
        "answer_en": "1) Choose tier A/B/C, 2) deploy capacity and tools, 3) measure live agents and team hours freed.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es el siguiente paso después de elegir un nivel?",
        "answer": "1) Elegir nivel A/B/C, 2) desplegar capacidad y herramientas, 3) medir agentes en vivo y horas liberadas del equipo."
      },
      {
        "id": "comp-14-2",
        "category": "operativa",
        "question_es": "¿Cómo se mide el éxito de la inversión?",
        "question_en": "How is investment success measured?",
        "answer_es": "Agentes 24/7 estables, menor gasto cloud en ciclos de entrenamiento, datos más locales, y reducción del ritmo 12–15 h sin fallar metas.",
        "answer_en": "Stable 24/7 agents, lower cloud spend on training cycles, more local data, and reduced 12–15h pace without missing goals.",
        "pinned": false,
        "timestamp": "Preset 3i",
        "question": "¿Cómo se mide el éxito de la inversión?",
        "answer": "Agentes 24/7 estables, menor gasto cloud en ciclos de entrenamiento, datos más locales, y reducción del ritmo 12–15 h sin fallar metas."
      },
      {
        "id": "comp-14-3",
        "category": "nota",
        "question_es": "Nota del presentador: Frase final",
        "question_en": "Presenter note: Final line",
        "answer_es": "Cerrar el deck: 'El futuro que construimos necesita un motor que poseemos, no un medidor que alquilamos'.",
        "answer_en": "Close the deck: 'The future we are building needs an engine we own — not a meter we rent'.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "Nota del presentador: Frase final",
        "answer": "Cerrar el deck: 'El futuro que construimos necesita un motor que poseemos, no un medidor que alquilamos'."
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
        "answer_es": "EBITDA sólido gracias a la reducción de mano de obra en cocina y desperdicio de insumos minimizado.",
        "answer_en": "Strong EBITDA driven by reduced kitchen labor and minimized ingredient waste.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es el margen operativo unitario proyectado del local automatizado?",
        "answer": "EBITDA sólido gracias a la reducción de mano de obra en cocina y desperdicio de insumos minimizado."
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
        "answer_es": "Menor CAPEX de apertura, menos personal en cocina y punto de equilibrio alcanzable con volumen diario moderado.",
        "answer_en": "Lower opening CAPEX, fewer kitchen staff, and breakeven reachable with moderate daily order volume.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Comparativa directa con franquicias tradicionales?",
        "answer": "Menor CAPEX de apertura, menos personal en cocina y punto de equilibrio alcanzable con volumen diario moderado."
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
        "answer_es": "Costo de materia prima estandarizado gracias a cero sobreporciones y compras centralizadas de insumos.",
        "answer_en": "Standardized ingredient cost through zero over-portioning and centralized sourcing.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Cuál es el costo unitario de producto (Food Cost)?",
        "answer": "Costo de materia prima estandarizado gracias a cero sobreporciones y compras centralizadas de insumos."
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
        "answer_es": "Mercado QSR regional de pizza y comida rápida amplio en ciudades intermedias de Colombia.",
        "answer_en": "Large regional pizza and fast-food QSR market across intermediate cities in Colombia.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Tamaño del mercado objetivo accesible (TAM/SAM)?",
        "answer": "Mercado QSR regional de pizza y comida rápida amplio en ciudades intermedias de Colombia."
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
        "answer_es": "Ronda piloto destinada a equipamiento de cocina automatizada, adecuación del local y capital de trabajo.",
        "answer_en": "Pilot round allocated to kitchen automation, store fit-out, and working capital.",
        "pinned": true,
        "timestamp": "Preset 3i",
        "question": "¿Monto de la ronda de inversión y asignación de fondos?",
        "answer": "Ronda piloto destinada a equipamiento de cocina automatizada, adecuación del local y capital de trabajo."
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

/* --------------------------------------------------------------------------
   Comment translation
   Client-submitted Q&A is often stored in only one language. When the UI
   switches, we fetch the missing locale via MyMemory (free, no API key) and
   persist question_en/es + answer_en/es in localStorage so it only translates
   once per note.
   -------------------------------------------------------------------------- */
const QA_TRANSLATE_DELAY_MS = 350;
let qaTranslateQueue = Promise.resolve();
const qaTranslateInFlight = new Set();

function queueCommentTranslation(task) {
  qaTranslateQueue = qaTranslateQueue.then(task).catch(() => {});
  return qaTranslateQueue;
}

function detectTextLang(text) {
  if (!text || !String(text).trim()) return null;
  const sample = String(text).trim();
  if (/[áéíóúñ¿¡]/i.test(sample)) return 'es';
  const lower = sample.toLowerCase();
  const esHits = (lower.match(/\b(el|la|los|las|de|del|qué|cuál|por|entre|gracias|nota|pregunta|respuesta|diapositiva|inversor|objeción|operativa|margen|proyectado|gracias a|reducción)\b/g) || []).length;
  const enHits = (lower.match(/\b(the|what|why|how|which|between|thanks|note|question|answer|slide|investor|objection|projected|margin|reduction|operational)\b/g) || []).length;
  if (esHits > enHits) return 'es';
  if (enHits > esHits) return 'en';
  return null;
}

function getCommentFieldSourceLang(item, part) {
  const esKey = `${part}_es`;
  const enKey = `${part}_en`;
  const esText = item[esKey]?.trim();
  const enText = item[enKey]?.trim();
  if (esText && !enText) return 'es';
  if (enText && !esText) return 'en';
  if (esText && enText) return null;
  const generic = item[part]?.trim();
  return generic ? detectTextLang(generic) : null;
}

function commentNeedsTranslation(item, targetLang = getActiveLang()) {
  if (!item) return false;
  const sourceLang = targetLang === 'en' ? 'es' : 'en';

  for (const part of ['question', 'answer']) {
    const targetKey = `${part}_${targetLang}`;
    if (item[targetKey]?.trim()) continue;

    const sourceKey = `${part}_${sourceLang}`;
    const sourceText = item[sourceKey]?.trim() || item[part]?.trim();
    if (!sourceText) continue;

    const fromLang = item[sourceKey]?.trim()
      ? sourceLang
      : (detectTextLang(sourceText) || sourceLang);

    if (fromLang !== targetLang) return true;
  }
  return false;
}

async function translateText(text, fromLang, toLang) {
  const clean = String(text || '').trim();
  if (!clean || fromLang === toLang) return clean;

  const host = typeof location !== 'undefined' ? location.hostname : '';
  const useProxy = host === 'localhost' || host === '127.0.0.1';
  const baseOverride = (typeof window !== 'undefined' && window.__TRANSLATE_API_BASE__)
    ? String(window.__TRANSLATE_API_BASE__).replace(/\/$/, '')
    : '';
  const paidUrl = `${baseOverride || ''}/translate-api?q=${encodeURIComponent(clean)}&from=${fromLang}&to=${toLang}`;

  const tryFetch = async (url, ms) => {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), ms) : null;
    try {
      const response = await fetch(url, controller ? { signal: controller.signal } : undefined);
      if (timeoutId) clearTimeout(timeoutId);
      if (!response.ok) return null;
      return await response.json();
    } catch (err) {
      if (timeoutId) clearTimeout(timeoutId);
      return null;
    }
  };

  // 1) Paid / same-origin API (DeepL or Google via proxy)
  const paid = await tryFetch(paidUrl, 2500);
  if (paid?.translatedText && !paid.error) {
    return String(paid.translatedText).trim();
  }

  // 2) MyMemory (proxy on localhost, direct off-host)
  const path = `/get?q=${encodeURIComponent(clean)}&langpair=${fromLang}|${toLang}`;
  const mymUrl = useProxy
    ? `/translate-mymemory${path}`
    : `https://api.mymemory.translated.net${path}`;
  const data = await tryFetch(mymUrl, 4000);
  if (data?.responseStatus === 200 && data.responseData?.translatedText) {
    const translated = String(data.responseData.translatedText).trim();
    if (translated && !translated.includes('MYMEMORY WARNING')) return translated;
  }

  throw new Error('Translation unavailable');
}

async function ensureCommentTranslated(item, targetLang = getActiveLang()) {
  if (!item) return false;
  const sourceLang = targetLang === 'en' ? 'es' : 'en';
  let changed = false;

  for (const part of ['question', 'answer']) {
    const targetKey = `${part}_${targetLang}`;
    const sourceKey = `${part}_${sourceLang}`;
    if (item[targetKey]?.trim()) continue;

    const sourceText = item[sourceKey]?.trim() || item[part]?.trim();
    if (!sourceText) continue;

    const fromLang = item[sourceKey]?.trim()
      ? sourceLang
      : (detectTextLang(sourceText) || sourceLang);

    if (fromLang === targetLang) {
      item[targetKey] = sourceText;
      changed = true;
      continue;
    }

    item[targetKey] = await translateText(sourceText, fromLang, targetLang);
    changed = true;
  }

  delete item._translateError;
  return changed;
}

async function translateAndPersistComment(deck, slide, itemId, targetLang = getActiveLang()) {
  const notes = getSlideNotes(deck, slide);
  const item = notes.find((note) => note.id === itemId);
  if (!item || !commentNeedsTranslation(item, targetLang)) return false;

  item._translating = true;
  if (isCommentsOpen && activeDeck === deck && currentSlide === slide) renderCommentsList();

  try {
    const changed = await ensureCommentTranslated(item, targetLang);
    delete item._translating;
    if (changed) {
      saveSlideNotes(deck, slide, notes);
      if (isCommentsOpen && activeDeck === deck && currentSlide === slide) renderCommentsList();
      return true;
    }
  } catch (err) {
    delete item._translating;
    item._translateError = true;
    if (isCommentsOpen && activeDeck === deck && currentSlide === slide) renderCommentsList();
  }
  return false;
}

function scheduleCommentsTranslation(deck, slide, targetLang = getActiveLang()) {
  const notes = getSlideNotes(deck, slide);
  const pending = notes.filter((item) =>
    commentNeedsTranslation(item, targetLang) && !item._translating && !qaTranslateInFlight.has(item.id)
  );
  if (pending.length === 0) return;

  pending.forEach((item) => qaTranslateInFlight.add(item.id));

  queueCommentTranslation(async () => {
    for (const item of pending) {
      try {
        await translateAndPersistComment(deck, slide, item.id, targetLang);
      } finally {
        qaTranslateInFlight.delete(item.id);
      }
      await new Promise((resolve) => setTimeout(resolve, QA_TRANSLATE_DELAY_MS));
    }
  });
}

async function translateCommentById(id) {
  const lang = getActiveLang();
  showCommentsToast(lang === 'es' ? 'Traduciendo…' : 'Translating…');
  const ok = await translateAndPersistComment(activeDeck, currentSlide, id, lang);
  showCommentsToast(ok
    ? (lang === 'es' ? 'Traducción lista' : 'Translation ready')
    : (lang === 'es' ? 'No se pudo traducir. Revisa tu conexión.' : 'Could not translate. Check your connection.'));
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
  if (!deck) return [];
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
          const existingIds = new Set(parsed.map(p => p.id).filter(Boolean));

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

          // Merge brand-new curated presets that older localStorage copies never saw.
          presets.forEach(preset => {
            if (preset.id && !existingIds.has(preset.id)) {
              parsed.push({ ...preset });
              migrated = true;
            }
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
  if (!deck) return;
  const key = getSlideNotesKey(deck, slide);
  localStorage.setItem(key, JSON.stringify(notesArray));
  updateCommentsCounterBadge();
}

// --------------------------------------------------------------------------
// Q&A trigger discoverability
// Clients were missing the panel entirely, so the trigger advertises itself
// (pulsing ring + a coach mark naming the action) until it is opened once.
// The flag is persisted so a returning viewer is not nagged again.
// --------------------------------------------------------------------------
const QA_DISCOVERED_KEY = '3i_qa_trigger_discovered';

function hasDiscoveredQa() {
  try {
    return localStorage.getItem(QA_DISCOVERED_KEY) === '1';
  } catch (err) {
    // Private mode or blocked storage: stay quiet rather than pulse forever.
    return true;
  }
}

function markQaDiscovered() {
  try {
    localStorage.setItem(QA_DISCOVERED_KEY, '1');
  } catch (err) {
    /* storage unavailable — the in-memory class removal below still applies */
  }
  const btn = document.getElementById('floatingCommentsBtn');
  if (btn) btn.classList.remove('is-inviting');
  dismissQaCoachMark();
}

function dismissQaCoachMark() {
  const mark = document.getElementById('qaCoachMark');
  if (mark) mark.remove();
}

function ensureQaCoachMark() {
  if (hasDiscoveredQa() || document.getElementById('qaCoachMark')) return;

  const slot = document.getElementById('bottomQaSlot');
  if (!slot) return;

  const mark = document.createElement('div');
  mark.className = 'qa-coach-mark';
  mark.id = 'qaCoachMark';
  mark.setAttribute('role', 'status');
  mark.innerHTML = `
    <div class="qa-coach-mark__body">
      <span class="lang-es">
        <strong>¿Tienes una pregunta?</strong>
        Deja aquí tus dudas o sugerencias sobre esta diapositiva. También puedes pulsar <b>C</b>.
      </span>
      <span class="lang-en">
        <strong>Have a question?</strong>
        Leave your questions or feedback about this slide here. You can also press <b>C</b>.
      </span>
    </div>
    <button type="button" class="qa-coach-mark__close" aria-label="Cerrar aviso">×</button>
  `;
  mark.querySelector('.qa-coach-mark__close').addEventListener('click', (event) => {
    event.stopPropagation();
    markQaDiscovered();
  });

  slot.appendChild(mark);
  applyLanguageWithin(mark);
}

function updateCommentsCounterBadge() {
  const floatingBtn = document.getElementById('floatingCommentsBtn');
  const countBadge = document.getElementById('floatingCommentsCount');
  const tabBadge = document.getElementById('tabCountBadge');

  if (activeDeck === 'hub') {
    if (floatingBtn) floatingBtn.style.display = 'none';
    dismissQaCoachMark();
    return;
  }

  if (floatingBtn) {
    floatingBtn.style.display = 'inline-flex';
    floatingBtn.classList.toggle('is-inviting', !hasDiscoveredQa());
  }
  ensureQaCoachMark();

  const notes = getSlideNotes(activeDeck, currentSlide);
  const count = notes.length;

  if (countBadge) countBadge.textContent = count;
  if (tabBadge) tabBadge.textContent = count;

  if (floatingBtn) {
    if (count > 0) floatingBtn.classList.add('has-comments');
    else floatingBtn.classList.remove('has-comments');
  }
}

function isCommentsDrawerVisible() {
  const drawer = document.getElementById('commentsDrawer');
  return !!(drawer && drawer.classList.contains('open'));
}

function toggleCommentsDrawer() {
  // Heal stuck state: flag says open but panel is not on screen
  if (isCommentsOpen && !isCommentsDrawerVisible()) {
    isCommentsOpen = false;
  }
  if (isCommentsOpen) closeCommentsDrawer();
  else openCommentsDrawer();
}

function paintCommentsDrawerOpen() {
  const drawer = document.getElementById('commentsDrawer');
  const backdrop = document.getElementById('commentsDrawerBackdrop');
  if (!drawer) return false;

  // Close transcript overlay first — it can sit above the notes panel
  const transcriptMount = document.getElementById('transcriptDrawerMount');
  if (transcriptMount && transcriptMount.style.display !== 'none') {
    if (window.VentureHubBridge && typeof window.VentureHubBridge.closeTranscriptDrawer === 'function') {
      window.VentureHubBridge.closeTranscriptDrawer();
    } else {
      transcriptMount.style.display = 'none';
    }
  }

  isCommentsOpen = true;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  // Let CSS own transform (desktop: X, mobile sheet: Y). Clear any stale inline override.
  drawer.style.removeProperty('transform');
  drawer.style.visibility = 'visible';
  if (backdrop) {
    backdrop.classList.add('open');
    backdrop.style.opacity = '1';
    backdrop.style.pointerEvents = 'auto';
  }
  return true;
}

function openCommentsDrawer() {
  markQaDiscovered();

  if (!paintCommentsDrawerOpen()) {
    showToast(getActiveLang() === 'es'
      ? 'No se encontró el panel de notas'
      : 'Notes panel not found');
    isCommentsOpen = false;
    return;
  }

  try {
    updateCommentsDrawerHeader();
    updateDrawerFormLanguage(currentLang);
    switchCommentsTab(activeCommentTab || 'list');
    renderCommentsList();
    updateCommentsCounterBadge();
    renderQaOutboxStrip();
    flushQaOutbox().catch(() => {});
    if (activeDeck !== 'hub') {
      scheduleCommentsTranslation(activeDeck, currentSlide, getActiveLang());
    }
  } catch (err) {
    console.error('[comments] openCommentsDrawer failed:', err);
    // Panel already painted — keep it open so the user is never stuck with a dead click
  }
}

function updateCommentsDrawerHeader() {
  const lang = getActiveLang();
  const kickerEl = document.getElementById('commentsDeckKicker');
  const titleEl = document.getElementById('commentsSlideTitle');
  const subEl = document.getElementById('commentsSlideSubtitle');

  if (activeDeck === 'hub') {
    if (kickerEl) kickerEl.textContent = '3i BAIRD LAB · HUB';
    if (titleEl) {
      titleEl.textContent = lang === 'es'
        ? 'Preguntas & Sugerencias'
        : 'Questions & Feedback';
    }
    if (subEl) {
      subEl.textContent = lang === 'es'
        ? 'Abre un deck para ver notas por diapositiva, o deja una sugerencia general en Inyectar'
        : 'Open a deck for per-slide notes, or leave general feedback in Inject';
    }
    return;
  }

  const meta = DECK_CONFIG[activeDeck] || DECK_CONFIG.hub;
  const deckName = lang === 'es' ? (meta.title_es || activeDeck) : (meta.title_en || activeDeck);
  if (kickerEl) kickerEl.textContent = `3i BAIRD LAB · ${deckName.toUpperCase()}`;

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

function closeCommentsDrawer() {
  isCommentsOpen = false;
  const drawer = document.getElementById('commentsDrawer');
  const backdrop = document.getElementById('commentsDrawerBackdrop');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.style.removeProperty('transform');
    drawer.style.visibility = '';
  }
  if (backdrop) {
    backdrop.classList.remove('open');
    backdrop.style.opacity = '';
    backdrop.style.pointerEvents = '';
  }
}

function bindCommentsDrawerTriggers() {
  const openers = [
    document.getElementById('commentsToggleBtn'),
    document.getElementById('floatingCommentsBtn')
  ].filter(Boolean);

  openers.forEach((btn) => {
    btn.removeAttribute('onclick');
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleCommentsDrawer();
    });
  });

  const closers = [
    document.getElementById('commentsDrawerBackdrop'),
    document.querySelector('.comments-close-btn')
  ].filter(Boolean);

  closers.forEach((el) => {
    el.removeAttribute('onclick');
    el.addEventListener('click', (event) => {
      event.preventDefault();
      closeCommentsDrawer();
    });
  });
}

function switchCommentsTab(tabName) {
  activeCommentTab = tabName;
  ['list', 'ask', 'inject', 'bulk'].forEach(t => {
    const btn = document.getElementById(`tabBtn${t.charAt(0).toUpperCase() + t.slice(1)}`);
    const panel = document.getElementById(`panel${t.charAt(0).toUpperCase() + t.slice(1)}`);
    if (btn) btn.classList.toggle('active', t === tabName);
    if (panel) panel.classList.toggle('active', t === tabName);
  });

  if (tabName === 'list') {
    renderCommentsList();
  }
  if (tabName === 'ask') {
    loadPresentationLlmConfigIntoForm();
    if (!isPresentationLlmConfigured()) {
      openAskLlmConfigPanel();
    }
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
    const hubHint = activeDeck === 'hub';
    container.innerHTML = `
      <div class="comments-empty-state">
        <div class="comments-empty-icon">💬</div>
        <div class="comments-empty-title">${hubHint
          ? (lang === 'es' ? 'Elige un deck para ver Q&A por slide' : 'Pick a deck to see per-slide Q&A')
          : (lang === 'es' ? 'Sin preguntas en esta diapositiva' : 'No questions for this slide')}</div>
        <div class="comments-empty-desc">${hubHint
          ? (lang === 'es'
            ? 'Desde el hub puedes dejar una sugerencia general en la pestaña Inyectar, o abre un venture para notas por diapositiva.'
            : 'From the hub you can leave general feedback in Inject, or open a venture for per-slide notes.')
          : (lang === 'es'
            ? 'Usa la pestaña "Inyectar" o "Ingesta Rápida" para agregar preguntas clave, objeciones o notas.'
            : 'Use the "Inject" or "Bulk" tab to add key questions, objections, or talking points.')}</div>
        <button class="btn-inject-secondary" style="margin-top: 6px;" onclick="switchCommentsTab('inject')">
          ➕ ${lang === 'es' ? (hubHint ? 'Dejar sugerencia' : 'Inyectar Primera Pregunta') : (hubHint ? 'Leave feedback' : 'Inject First Question')}
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
    const needsTranslate = commentNeedsTranslation(item, lang);
    const isTranslating = !!item._translating;
    const translateFailed = !!item._translateError;
    const sourceLang = getCommentFieldSourceLang(item, 'question') || getCommentFieldSourceLang(item, 'answer');
    const showLangHint = sourceLang && sourceLang !== lang && (needsTranslate || translateFailed);

    return `
      <div class="comment-card ${item.pinned ? 'is-pinned' : ''} ${isTranslating ? 'is-translating' : ''}" data-id="${item.id}">
        <div class="comment-card-top">
          <span class="comment-type-tag ${catClass}">${catLabel}</span>
          <div class="comment-card-actions">
            ${needsTranslate || translateFailed ? `
            <button class="comment-action-btn btn-translate" onclick="translateCommentById('${item.id}')" title="${lang === 'es' ? 'Traducir al idioma actual' : 'Translate to current language'}">
              <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
            </button>` : ''}
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
          ${isTranslating ? `<span class="comment-translate-status">${lang === 'es' ? 'Traduciendo…' : 'Translating…'}</span>` : ''}
          ${showLangHint && !isTranslating ? `<span class="comment-lang-hint">${lang === 'es' ? 'Original en inglés' : 'Original in Spanish'}</span>` : ''}
          ${translateFailed && !isTranslating ? `<span class="comment-lang-hint comment-lang-hint--warn">${lang === 'es' ? 'Traducción pendiente' : 'Translation pending'}</span>` : ''}
          <span>${item.timestamp || (lang === 'es' ? 'Inyectada' : 'Injected')}</span>
          <span>${activeDeck.toUpperCase()} · #${currentSlide}</span>
        </div>
      </div>
    `;
  }).join('');

  scheduleCommentsTranslation(activeDeck, currentSlide, lang);
}

/* ==========================================================================
   CLIENT SUGGESTION DELIVERY
   Notes are stored in the viewer's own localStorage, which means a suggestion
   left by a client on their device never reaches us. This layer forwards each
   submission to a real destination, queueing it locally whenever the network
   or the endpoint is unavailable so nothing is ever silently lost.

   >>> TO ACTIVATE: fill in `endpoint` below. <<<
   Until then submissions are queued and the client is offered the email
   fallback, so the flow still works with zero configuration.

   provider options:
     'formspree'    endpoint: https://formspree.io/f/XXXXXXX
                    Easiest to set up and confirms delivery. Free tier covers
                    50 submissions/month.
     'googleScript' endpoint: https://script.google.com/macros/s/XXXX/exec
                    Writes to a Google Sheet. Deploy the Apps Script as a web
                    app with access set to "Anyone".
     'webhook'      endpoint: any URL accepting a JSON POST (Make, Zapier,
                    n8n, your own API).
   ========================================================================== */
const QA_DELIVERY = {
  endpoint: '',
  provider: 'formspree',
  // Used by the "send by email" fallback. Set this to the address that should
  // receive client suggestions.
  fallbackEmail: ''
};

const QA_OUTBOX_KEY = '3i_qa_outbox';
const QA_MAX_ATTEMPTS = 5;

function isQaDeliveryConfigured() {
  return typeof QA_DELIVERY.endpoint === 'string' && QA_DELIVERY.endpoint.trim().length > 0;
}

function readQaOutbox() {
  try {
    const raw = localStorage.getItem(QA_OUTBOX_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function writeQaOutbox(queue) {
  try {
    localStorage.setItem(QA_OUTBOX_KEY, JSON.stringify(queue));
  } catch (err) {
    /* storage full or blocked: the queue simply won't survive a reload */
  }
  renderQaOutboxStrip();
}

function getSlideHeadingText(deck, slide) {
  const container = document.getElementById(`deck-${deck}`);
  if (!container) return '';
  const slideEl = container.querySelector(`.slide[data-slide="${slide}"]`);
  const h2 = slideEl ? slideEl.querySelector('h2') : null;
  if (!h2) return '';
  const langEl = h2.querySelector(`.lang-${getActiveLang()}`);
  return (langEl || h2).textContent.trim().replace(/\s+/g, ' ').slice(0, 200);
}

function buildQaPayload(item) {
  const meta = DECK_CONFIG[activeDeck] || {};
  return {
    id: item.id,
    submittedAt: new Date().toISOString(),
    deck: activeDeck,
    deckTitle: meta.title_es || meta.title_en || activeDeck,
    slide: currentSlide,
    slideTitle: getSlideHeadingText(activeDeck, currentSlide),
    category: item.category || '',
    question: item.question || '',
    answer: item.answer || '',
    language: getActiveLang(),
    audience: typeof currentAudience === 'string' ? currentAudience : '',
    pageUrl: window.location.href
  };
}

function qaPayloadAsText(payload) {
  const lines = [
    `Deck: ${payload.deckTitle} (${payload.deck})`,
    `Diapositiva ${payload.slide}: ${payload.slideTitle}`,
    `Categoría: ${payload.category}`,
    `Idioma: ${payload.language}`,
    `Fecha: ${payload.submittedAt}`,
    '',
    `Pregunta / sugerencia:`,
    payload.question
  ];
  if (payload.answer) lines.push('', 'Detalle adicional:', payload.answer);
  return lines.join('\n');
}

function buildQaRequest(payload) {
  const url = QA_DELIVERY.endpoint.trim();

  if (QA_DELIVERY.provider === 'formspree') {
    return {
      url,
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Sugerencia · ${payload.deckTitle} · slide ${payload.slide}`,
          message: qaPayloadAsText(payload),
          ...payload
        })
      }
    };
  }

  if (QA_DELIVERY.provider === 'googleScript') {
    // No custom Content-Type: keeps this a "simple" request so the browser
    // skips the CORS preflight that Apps Script does not answer.
    return { url, options: { method: 'POST', body: JSON.stringify(payload) } };
  }

  return {
    url,
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }
  };
}

async function postQaPayload(payload) {
  const { url, options } = buildQaRequest(payload);
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return { ok: true, confirmed: true };
  } catch (err) {
    // A CORS-restricted endpoint throws even when it accepted the data. Retry
    // opaquely: if that resolves, the request did leave the browser, but we
    // cannot read the response, so it counts as unconfirmed.
    try {
      await fetch(url, { ...options, mode: 'no-cors' });
      return { ok: true, confirmed: false };
    } catch (err2) {
      return { ok: false, error: err2.message || String(err2) };
    }
  }
}

function enqueueQaSuggestion(item) {
  const queue = readQaOutbox();
  queue.push({ payload: buildQaPayload(item), attempts: 0, status: 'pending' });
  writeQaOutbox(queue);
  return flushQaOutbox();
}

async function flushQaOutbox() {
  if (!isQaDeliveryConfigured()) {
    renderQaOutboxStrip();
    return { sent: 0, pending: readQaOutbox().length };
  }

  const queue = readQaOutbox();
  const pending = queue.filter((entry) => entry.status === 'pending' && entry.attempts < QA_MAX_ATTEMPTS);
  if (pending.length === 0) {
    renderQaOutboxStrip();
    return { sent: 0, pending: 0 };
  }

  let sent = 0;
  for (const entry of pending) {
    entry.attempts += 1;
    const result = await postQaPayload(entry.payload);
    if (result.ok) {
      entry.status = result.confirmed ? 'sent' : 'sent-unconfirmed';
      sent += 1;
    }
  }

  // Keep only what still needs attention, so the queue cannot grow forever.
  const remaining = queue.filter((entry) => entry.status === 'pending');
  writeQaOutbox(remaining);
  return { sent, pending: remaining.length };
}

function qaPendingCount() {
  return readQaOutbox().filter((entry) => entry.status === 'pending').length;
}

function sendQaOutboxByEmail() {
  const queue = readQaOutbox();
  const pending = queue.filter((entry) => entry.status === 'pending');
  if (pending.length === 0) return;

  const isEs = getActiveLang() === 'es';
  const body = pending.map((entry, i) => `--- ${i + 1} ---\n${qaPayloadAsText(entry.payload)}`).join('\n\n');
  const subject = isEs
    ? `Sugerencias sobre la presentación (${pending.length})`
    : `Presentation feedback (${pending.length})`;

  const address = (QA_DELIVERY.fallbackEmail || '').trim();
  window.location.href = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // The mail client takes over from here; we cannot confirm it was actually
  // sent, so the entries are cleared optimistically but the notes themselves
  // remain stored on the slide.
  writeQaOutbox(queue.filter((entry) => entry.status !== 'pending'));
  showCommentsToast(isEs ? 'Abriendo tu cliente de correo…' : 'Opening your email client…');
}

function copyQaOutboxToClipboard() {
  const pending = readQaOutbox().filter((entry) => entry.status === 'pending');
  if (pending.length === 0) return;
  const isEs = getActiveLang() === 'es';
  const text = pending.map((entry, i) => `--- ${i + 1} ---\n${qaPayloadAsText(entry.payload)}`).join('\n\n');
  navigator.clipboard.writeText(text).then(
    () => showCommentsToast(isEs ? 'Sugerencias copiadas al portapapeles' : 'Feedback copied to clipboard'),
    () => showCommentsToast(isEs ? 'No se pudo copiar' : 'Copy failed')
  );
}

function renderQaOutboxStrip() {
  const panel = document.getElementById('panelList');
  if (!panel) return;

  const pending = qaPendingCount();
  let strip = document.getElementById('qaOutboxStrip');

  if (pending === 0) {
    if (strip) strip.remove();
    return;
  }

  if (!strip) {
    strip = document.createElement('div');
    strip.className = 'qa-outbox-strip';
    strip.id = 'qaOutboxStrip';
    panel.insertBefore(strip, panel.firstElementChild);
  }

  const isEs = getActiveLang() === 'es';
  const configured = isQaDeliveryConfigured();
  const headline = configured
    ? (isEs ? `${pending} sugerencia(s) sin enviar` : `${pending} suggestion(s) not sent`)
    : (isEs ? `${pending} sugerencia(s) guardada(s) solo en este dispositivo` : `${pending} suggestion(s) saved on this device only`);
  const detail = configured
    ? (isEs ? 'No se pudo contactar al servidor. Se reintentará automáticamente.' : 'The server could not be reached. We will retry automatically.')
    : (isEs ? 'Envíalas para que lleguen al equipo.' : 'Send them so the team receives them.');

  strip.innerHTML = `
    <div class="qa-outbox-strip__text">
      <strong>${headline}</strong>
      <span>${detail}</span>
    </div>
    <div class="qa-outbox-strip__actions">
      ${configured ? `<button type="button" class="qa-outbox-btn" data-qa-action="retry">${isEs ? 'Reintentar' : 'Retry'}</button>` : ''}
      <button type="button" class="qa-outbox-btn" data-qa-action="email">${isEs ? 'Enviar por correo' : 'Send by email'}</button>
      <button type="button" class="qa-outbox-btn qa-outbox-btn--ghost" data-qa-action="copy">${isEs ? 'Copiar' : 'Copy'}</button>
    </div>
  `;

  strip.querySelectorAll('[data-qa-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-qa-action');
      if (action === 'retry') {
        flushQaOutbox().then(({ sent }) => {
          showCommentsToast(sent > 0
            ? (isEs ? 'Sugerencias enviadas' : 'Suggestions sent')
            : (isEs ? 'Sigue sin conexión con el servidor' : 'Still cannot reach the server'));
        });
      } else if (action === 'email') {
        sendQaOutboxByEmail();
      } else if (action === 'copy') {
        copyQaOutboxToClipboard();
      }
    });
  });
}

// Retry as soon as connectivity returns.
window.addEventListener('online', () => {
  flushQaOutbox();
});

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

  const isEs = currentLang === 'es';
  const otherLang = isEs ? 'en' : 'es';
  queueCommentTranslation(async () => {
    await translateAndPersistComment(activeDeck, currentSlide, newItem.id, otherLang);
  });

  if (isQaDeliveryConfigured()) {
    showCommentsToast(isEs ? 'Enviando tu sugerencia…' : 'Sending your feedback…');
    enqueueQaSuggestion(newItem).then(({ sent }) => {
      showCommentsToast(sent > 0
        ? (isEs ? '¡Gracias! Tu sugerencia fue enviada al equipo' : 'Thank you! Your feedback reached the team')
        : (isEs ? 'Guardada. La enviaremos en cuanto haya conexión' : 'Saved. We will send it once you are back online'));
    });
  } else {
    enqueueQaSuggestion(newItem);
    showCommentsToast(isEs ? 'Guardada en este dispositivo' : 'Saved on this device');
  }
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

/* ==========================================================================
   EXECUTIVE BOARDROOM & AUDIENCE SUITE (3i BAIRD LAB)
   ========================================================================== */

// 1. Audience Switcher State & Handlers
let currentAudience = 'investor'; // 'investor', 'b2b', 'tech'
const AUDIENCE_META = {
  investor: {
    label_es: 'Inversionista / VC',
    label_en: 'Investor / VC',
    tag_es: 'ENFOQUE: RETORNO & ASK',
    tag_en: 'FOCUS: RETURNS & ASK',
    toast_es: 'Perfil: Inversor / VC (Métricas financieras, Unit Economics y Salida)',
    toast_en: 'Profile: Investor / VC (Financial returns, Unit Economics & Exit)'
  },
  b2b: {
    label_es: 'Cliente Corporativo / B2B',
    label_en: 'Enterprise / B2B',
    tag_es: 'ENFOQUE: REDUCCIÓN OPEX & SLA',
    tag_en: 'FOCUS: OPEX SAVINGS & SLA',
    toast_es: 'Perfil: Cliente B2B (Seguridad On-Premise, Ahorro de Costos y SLAs)',
    toast_en: 'Profile: Enterprise / B2B (On-Premise Security, Cost Savings & SLAs)'
  },
  tech: {
    label_es: 'CTO / DeepTech',
    label_en: 'CTO / DeepTech',
    tag_es: 'ENFOQUE: HARDWARE & ARQUITECTURA',
    tag_en: 'FOCUS: HARDWARE & ARCHITECTURE',
    toast_es: 'Perfil: CTO / Técnico (Latencia, VRAM, FLOPS y Criptografía)',
    toast_en: 'Profile: CTO / Technical (Latency, VRAM, FLOPS & Cryptography)'
  }
};

function setAudience(audience) {
  if (!AUDIENCE_META[audience]) return;
  currentAudience = audience;
  document.documentElement.setAttribute('data-audience', audience);

  // Update HUD option buttons
  document.querySelectorAll('.audience-opt').forEach((btn) => {
    btn.classList.toggle('is-active', btn.getAttribute('data-audience') === audience);
  });

  updateAudienceBadgeLanguage();

  // Show subtle toast
  const info = AUDIENCE_META[audience];
  showToast(currentLang === 'es' ? info.toast_es : info.toast_en);

  // If comments drawer is open, auto-adjust filter
  if (isCommentsOpen && typeof filterComments === 'function') {
    const filterKey = audience === 'investor' ? 'inversor' : (audience === 'tech' ? 'operativa' : 'objecion');
    const chip = document.querySelector(`.filter-chip[onclick*="${filterKey}"]`);
    if (chip) filterComments(filterKey, chip);
  }
}

function cycleAudience() {
  const order = ['investor', 'b2b', 'tech'];
  const nextIdx = (order.indexOf(currentAudience) + 1) % order.length;
  setAudience(order[nextIdx]);
}

function updateAudienceBadgeLanguage() {
  const info = AUDIENCE_META[currentAudience] || AUDIENCE_META.investor;
  const indText = document.getElementById('audIndicatorText');
  const indTag = document.querySelector('.aud-indicator-tag');
  if (indText) indText.textContent = currentLang === 'es' ? info.label_es : info.label_en;
  if (indTag) indTag.textContent = currentLang === 'es' ? info.tag_es : info.tag_en;
}

// 2. Boardroom Pitch Clock / Timer
let pitchTimer = {
  duration: 600, // seconds
  remaining: 600,
  isRunning: false,
  isCountUp: false,
  intervalId: null,
  presetLabel: 'Investor Pitch (10 min)'
};

function formatTimerSeconds(secs) {
  const m = Math.floor(Math.abs(secs) / 60);
  const s = Math.abs(secs) % 60;
  const mm = m < 10 ? `0${m}` : `${m}`;
  const ss = s < 10 ? `0${s}` : `${s}`;
  return `${mm}:${ss}`;
}

function updatePitchTimerDisplays() {
  const mainDisplay = document.getElementById('pitchTimerMainDisplay');
  const hudDisplay = document.getElementById('pitchTimerHudTime');
  const fill = document.getElementById('pitchTimerProgressFill');
  const hudBtn = document.getElementById('pitchTimerToggleBtn');
  const timeStr = formatTimerSeconds(pitchTimer.remaining);

  if (mainDisplay) mainDisplay.textContent = timeStr;
  if (hudDisplay) hudDisplay.textContent = timeStr;

  if (hudBtn) {
    hudBtn.classList.toggle('is-running', pitchTimer.isRunning);
    hudBtn.classList.toggle('is-warning', !pitchTimer.isCountUp && pitchTimer.remaining <= 120 && pitchTimer.remaining > 0);
    hudBtn.classList.toggle('is-expired', !pitchTimer.isCountUp && pitchTimer.remaining <= 0);
  }

  if (fill) {
    if (pitchTimer.isCountUp) {
      fill.style.width = '100%';
      fill.style.backgroundColor = 'var(--deck-accent)';
    } else {
      const pct = Math.max(0, Math.min(100, (pitchTimer.remaining / pitchTimer.duration) * 100));
      fill.style.width = `${pct}%`;
      if (pct > 35) fill.style.backgroundColor = 'var(--accent-emerald)';
      else if (pct > 15) fill.style.backgroundColor = 'var(--accent-amber)';
      else fill.style.backgroundColor = 'var(--accent-rose)';
    }
  }
}

function setPitchTimerPreset(seconds, label) {
  pitchTimer.duration = seconds;
  pitchTimer.remaining = seconds;
  pitchTimer.isCountUp = (seconds === 0);
  pitchTimer.presetLabel = label;

  if (pitchTimer.isRunning) {
    clearInterval(pitchTimer.intervalId);
    pitchTimer.isRunning = false;
    updatePitchTimerPlayBtn();
  }

  const labelEl = document.getElementById('pitchTimerPresetLabel');
  if (labelEl) labelEl.textContent = label;

  document.querySelectorAll('.preset-pill-btn').forEach(btn => {
    const isThis = (seconds === 180 && btn.textContent.includes('3m')) ||
                   (seconds === 300 && btn.textContent.includes('5m')) ||
                   (seconds === 600 && btn.textContent.includes('10m')) ||
                   (seconds === 1200 && btn.textContent.includes('20m')) ||
                   (seconds === 0 && btn.textContent.includes('∞'));
    btn.classList.toggle('active', isThis);
  });

  updatePitchTimerDisplays();
}

function togglePitchTimerRun() {
  if (pitchTimer.isRunning) {
    clearInterval(pitchTimer.intervalId);
    pitchTimer.isRunning = false;
  } else {
    pitchTimer.isRunning = true;
    pitchTimer.intervalId = setInterval(() => {
      if (pitchTimer.isCountUp) {
        pitchTimer.remaining++;
      } else {
        pitchTimer.remaining--;
        if (pitchTimer.remaining === 120) {
          showToast(currentLang === 'es' ? '⏱️ Quedan 2 minutos de Pitch' : '⏱️ 2 minutes remaining');
        }
        if (pitchTimer.remaining <= 0) {
          pitchTimer.remaining = 0;
          clearInterval(pitchTimer.intervalId);
          pitchTimer.isRunning = false;
          updatePitchTimerPlayBtn();
          showToast(currentLang === 'es' ? '🔔 Tiempo de Pitch concluido' : '🔔 Pitch time elapsed');
        }
      }
      updatePitchTimerDisplays();
    }, 1000);
  }
  updatePitchTimerPlayBtn();
  updatePitchTimerDisplays();
}

function updatePitchTimerPlayBtn() {
  const iconWrap = document.getElementById('pitchTimerPlayIconWrap');
  const textWrap = document.getElementById('pitchTimerPlayText');
  if (iconWrap) {
    iconWrap.innerHTML = pitchTimer.isRunning
      ? '<svg class="ico" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
      : '<svg class="ico" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
  }
  if (textWrap) {
    textWrap.innerHTML = pitchTimer.isRunning
      ? `<span class="lang-es">Pausar</span><span class="lang-en">Pause</span>`
      : `<span class="lang-es">Iniciar</span><span class="lang-en">Start</span>`;
    applyLanguageWithin(textWrap);
  }
}

function resetPitchTimer() {
  if (pitchTimer.isRunning) {
    clearInterval(pitchTimer.intervalId);
    pitchTimer.isRunning = false;
    updatePitchTimerPlayBtn();
  }
  pitchTimer.remaining = pitchTimer.duration;
  updatePitchTimerDisplays();
}

function togglePitchTimerPanel() {
  const popover = document.getElementById('pitchTimerPopover');
  if (!popover) return;
  const isOpen = popover.classList.contains('open');
  if (isOpen) {
    popover.classList.remove('open');
  } else {
    popover.classList.add('open');
    updatePitchTimerDisplays();
  }
}

// 3. Executive Virtual Laser Pointer & Spotlight
let isLaserActive = false;

function initLaserPointer() {
  const dot = document.getElementById('laserPointerDot');
  if (!dot) return;

  window.addEventListener('mousemove', (e) => {
    if (!isLaserActive) return;
    dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  });

  window.addEventListener('mousedown', (e) => {
    if (!isLaserActive) return;
    // Don't trigger on HUD clicks
    if (e.target.closest('.top-hud') || e.target.closest('.pitch-timer-popover') || e.target.closest('.comments-drawer')) return;
    const ripple = document.createElement('div');
    ripple.className = 'laser-click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
}

function toggleLaserPointer() {
  isLaserActive = !isLaserActive;
  document.body.classList.toggle('laser-active', isLaserActive);
  const btn = document.getElementById('laserPointerToggleBtn');
  if (btn) {
    btn.classList.toggle('btn-icon-accent', isLaserActive);
  }
  showToast(isLaserActive
    ? (currentLang === 'es' ? '🔴 Puntero Láser Activado (K)' : '🔴 Laser Pointer Active (K)')
    : (currentLang === 'es' ? 'Puntero Láser Desactivado' : 'Laser Pointer Off')
  );
}

// 4. Live Metric Numbers Animation (CountUp)
function animateLiveCounters(container) {
  if (!container) return;
  const targetElements = container.querySelectorAll(
    '.kpi-value, .kpi-val, .metric-number, .stat-value, .highlight-stat, [data-counter]'
  );

  targetElements.forEach((el) => {
    const raw = el.getAttribute('data-original-val') || el.textContent.trim();
    if (!el.getAttribute('data-original-val')) {
      el.setAttribute('data-original-val', raw);
    }

    // Match numbers like $12.5M, 99.4%, 1,450, 4.8x
    const match = raw.match(/^([^\d.-]*)([\d,.]+)([^\d]*)$/);
    if (!match) return;

    const prefix = match[1] || '';
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const targetVal = parseFloat(numStr);
    if (isNaN(targetVal)) return;

    const hasDecimals = numStr.includes('.');
    const decimals = hasDecimals ? numStr.split('.')[1].length : 0;
    const duration = 750; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out exponential curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = (targetVal * ease).toFixed(decimals);
      el.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = raw; // restore exact original formatted string
      }
    }
    requestAnimationFrame(updateCounter);
  });
}

// 5. Toast Notification Helper
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('commentsToast');
  const toastMsg = document.getElementById('commentsToastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ==========================================================================
// EXECUTIVE BRIEFING ENGINE — Text-to-Speech + Deck Tour + Pitch Timer Sync
// Browser TTS by default. Optional external provider via NARRATION_DELIVERY.
// Keyboard: V = read · Shift+V = deck tour · Esc = stop
// ==========================================================================

const NARRATION_DELIVERY = {
  provider: 'browser',
  elevenlabs: { apiKey: '', voiceId: '' },
  azure: { key: '', region: 'eastus', voice: 'es-ES-ElviraNeural' }
};

const EXECUTIVE_BRIEFING_SCRIPTS = {
  all: {
    es: 'Bienvenido al Centro de Mando Ventures de 3i Baird Lab. Este briefing confidencial reúne cinco tesis invertibles en cuatro verticales: LUMI en EdTech con tutoría multi-agente; FoodTech QSR para franquicias inteligentes; Arcana Web3 e IoT para confianza auditable; Arcana Restaurantes para dueños que recuperan EBITDA; e Infraestructura de IA local — dejar de alquilar inteligencia y poseer capacidad desde cinco mil hasta ciento cincuenta mil dólares. Sesenta y nueve slides ejecutivas, bilingües y listas para preguntas.',
    en: 'Welcome to the 3i Baird Lab Executive Venture Command Center. This confidential briefing unites five investable theses across four verticals: LUMI in EdTech, FoodTech QSR, Arcana Web3 and IoT, Arcana Restaurants, and local AI Infrastructure — stop renting intelligence and own capacity from five thousand to one hundred fifty thousand dollars. Sixty-nine executive slides, bilingual and Q&A ready.'
  },
  growth: {
    es: 'Línea de interés: Crecimiento y EdTech. LUMI es nuestra apuesta en tutoría multi-agente con IA: escala instrucción personalizada de élite, captura datos de aprendizaje defendibles y abre mercado B2C y B2B institucional. Quince slides de pitch inversor con demo en video. Ideal para fondos EdTech y strategics educativos.',
    en: 'Interest lane: Growth and EdTech. LUMI is our multi-agent AI tutoring bet: it scales elite one-to-one instruction, captures defensible learning data, and opens B2C and institutional B2B markets. Fifteen investor slides with video demo. Built for EdTech funds and education strategics.'
  },
  operations: {
    es: 'Línea de interés: Operaciones y QSR. FoodTech QSR digitaliza franquicias con telemetría de cocina, control de margen y visibilidad multi-local. Arcana Restaurantes traduce la misma tesis de confianza operativa para dueños independientes que necesitan recuperar EBITDA sin vivir en el local. Diez a quince slides por deck, orientadas a operadores y capital privado.',
    en: 'Interest lane: Operations and QSR. FoodTech QSR digitizes franchises with kitchen telemetry, margin control, and multi-unit visibility. Arcana Restaurants applies operational trust for independent owners recovering EBITDA without living inside the store. Ten to fifteen slides per deck for operators and private capital.'
  },
  deeptech: {
    es: 'Línea de interés: Deep Tech y Confianza. Arcana Web3 e IoT construye confianza auditable. Infraestructura IA local es la tesis para inversores no técnicos: hoy hacemos webs, plataformas pequeñas y pocos agentes; entrenar modelos cuesta tiempo y peajes en la nube; si invertimos de cinco mil a ciento cincuenta mil en equipos y herramientas, corremos más agentes, mantenemos datos locales y recuperamos horas de un equipo que hoy trabaja doce a quince horas. Ideal para CTOs, family offices y fondos deep tech.',
    en: 'Interest lane: Deep Tech and Trust. Arcana Web3 and IoT builds auditable trust. Local AI Infrastructure is the thesis for non-technical investors: today we ship websites, small paid platforms, and a few agents; training models costs time and cloud tolls; investing five thousand to one hundred fifty thousand in equipment and tools unlocks more agents, local data custody, and reclaimed hours for a team working twelve to fifteen hours a day. Built for CTOs, family offices, and deep-tech funds.'
  }
};

const briefingEngine = {
  mode: null,
  paused: false,
  progressTimer: null,
  startedAt: 0,
  estimatedMs: 0,
  activeLane: 'all',
  autoAdvance: true,
  syncPitchTimer: true,
  deckTourActive: false,
  timerPausedForNarration: false,
  timerStartedByNarration: false,
  pendingAdvanceTimer: null,
  voiceOverrides: { en: '', es: '' }
};

function setBriefingOption(key, value) {
  if (key === 'autoAdvance') briefingEngine.autoAdvance = !!value;
  if (key === 'syncPitchTimer') briefingEngine.syncPitchTimer = !!value;

  const autoEl = document.getElementById('briefingAutoAdvance');
  const syncEl = document.getElementById('briefingSyncTimer');
  const timerSyncEl = document.getElementById('pitchTimerSyncNarration');
  if (autoEl) autoEl.checked = briefingEngine.autoAdvance;
  if (syncEl) syncEl.checked = briefingEngine.syncPitchTimer;
  if (timerSyncEl) timerSyncEl.checked = briefingEngine.syncPitchTimer;
}

function toggleBriefingDetails(force) {
  const narrator = document.getElementById('hubBriefingNarrator');
  const details = document.getElementById('hubBriefingDetails');
  const toggleBtn = document.getElementById('hubBriefingToggleBtn');
  if (!narrator || !details) return;

  const shouldOpen = typeof force === 'boolean'
    ? force
    : narrator.classList.contains('is-collapsed');

  narrator.classList.toggle('is-collapsed', !shouldOpen);
  details.hidden = !shouldOpen;
  if (toggleBtn) toggleBtn.setAttribute('aria-expanded', String(shouldOpen));
}

function getSpeechLang() {
  // Prefer the live document attribute so TTS never lags behind the UI toggle.
  const htmlLang = document.documentElement.getAttribute('data-lang');
  if (htmlLang === 'en' || htmlLang === 'es') return htmlLang;
  return currentLang === 'en' ? 'en' : 'es';
}

function getHubBriefingText() {
  const lane = briefingEngine.activeLane || 'all';
  const script = EXECUTIVE_BRIEFING_SCRIPTS[lane] || EXECUTIVE_BRIEFING_SCRIPTS.all;
  const lang = getSpeechLang();
  return script[lang] || script.en || script.es;
}

const TTS_VOICE_RANK_HINTS = {
  en: [
    'google us english', 'microsoft aria', 'microsoft jenny', 'microsoft guy',
    'microsoft zira', 'samantha', 'alex', 'karen', 'daniel', 'en-us neural',
    'en-us natural', 'english united states', 'english (united states)'
  ],
  es: [
    'google español', 'google espanol', 'microsoft sabina', 'microsoft elvira',
    'microsoft helia', 'paulina', 'monica', 'es-es neural', 'es-mx neural',
    'spanish (spain)', 'spanish (mexico)', 'españa', 'mexico'
  ]
};

const TTS_LOCALE_PRIORITY = {
  en: ['en-us', 'en-gb', 'en-au', 'en'],
  es: ['es-es', 'es-mx', 'es-us', 'es']
};

function loadBriefingVoicePreferences() {
  try {
    const raw = localStorage.getItem('vhos_tts_voices');
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      briefingEngine.voiceOverrides.en = parsed.en || '';
      briefingEngine.voiceOverrides.es = parsed.es || '';
    }
  } catch (_) { /* ignore corrupt storage */ }
}

function saveBriefingVoicePreferences() {
  try {
    localStorage.setItem('vhos_tts_voices', JSON.stringify(briefingEngine.voiceOverrides));
  } catch (_) { /* ignore quota errors */ }
}

function normalizeTtsToken(value) {
  return (value || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function scoreSpeechVoice(voice, lang) {
  const name = normalizeTtsToken(voice.name);
  const vlang = normalizeTtsToken(voice.lang).replace('_', '-');
  let score = 0;

  const localeOrder = TTS_LOCALE_PRIORITY[lang] || [lang];
  const localeIdx = localeOrder.findIndex(prefix => vlang.startsWith(prefix));
  if (localeIdx === -1) return -1000;
  score += 120 - localeIdx * 18;

  if (lang === 'en' && vlang.startsWith('en-us')) score += 40;
  if (lang === 'es' && (vlang.startsWith('es-es') || vlang.startsWith('es-mx'))) score += 30;

  TTS_VOICE_RANK_HINTS[lang].forEach((hint, idx) => {
    if (name.includes(hint)) score += 90 - idx;
  });

  if (name.includes('neural') || name.includes('natural') || name.includes('online')) score += 35;
  if (name.includes('google')) score += 22;
  if (name.includes('microsoft')) score += 18;
  if (!voice.localService) score += 12;

  if (name.includes('espeak') || name.includes('android talk') || name.includes('festival')) score -= 80;
  if (lang === 'en' && (vlang.startsWith('es') || name.includes('spanish'))) score -= 200;
  if (lang === 'es' && (vlang.startsWith('en') || name.includes('english'))) score -= 200;

  return score;
}

function getVoicesForLang(lang) {
  if (!isSpeechSupported()) return [];
  return speechSynthesis.getVoices().filter(v => scoreSpeechVoice(v, lang) > -500);
}

function pickSpeechVoice(lang) {
  if (!isSpeechSupported()) return null;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;

  const overrideUri = briefingEngine.voiceOverrides?.[lang];
  if (overrideUri) {
    const pinned = voices.find(v => v.voiceURI === overrideUri);
    // Never honor a pinned voice that belongs to the other language.
    if (pinned && scoreSpeechVoice(pinned, lang) > -500) return pinned;
  }

  const ranked = voices
    .map(v => ({ v, score: scoreSpeechVoice(v, lang) }))
    .filter(entry => entry.score > -500)
    .sort((a, b) => b.score - a.score);

  const best = ranked[0]?.v || null;
  if (!best) return null;

  // Hard guard: voice locale must match the requested language family.
  const vlang = normalizeTtsToken(best.lang).replace('_', '-');
  if (lang === 'en' && !vlang.startsWith('en')) return null;
  if (lang === 'es' && !vlang.startsWith('es')) return null;
  return best;
}

function ensureSpeechVoicesReady() {
  if (!isSpeechSupported()) return Promise.resolve([]);
  const existing = speechSynthesis.getVoices();
  if (existing.length) return Promise.resolve(existing);

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve(speechSynthesis.getVoices());
    };
    window.addEventListener('voiceschanged', finish, { once: true });
    speechSynthesis.getVoices();
    setTimeout(finish, 700);
  });
}

function populateBriefingVoiceSelectors() {
  if (!isSpeechSupported()) return;

  const enSelect = document.getElementById('briefingVoiceEn');
  const esSelect = document.getElementById('briefingVoiceEs');
  if (!enSelect || !esSelect) return;

  const buildOptions = (selectEl, lang, autoLabel) => {
    const current = briefingEngine.voiceOverrides[lang] || '';
    const voices = getVoicesForLang(lang)
      .sort((a, b) => scoreSpeechVoice(b, lang) - scoreSpeechVoice(a, lang));

    selectEl.innerHTML = '';
    const autoOpt = document.createElement('option');
    autoOpt.value = '';
    autoOpt.textContent = autoLabel;
    selectEl.appendChild(autoOpt);

    voices.forEach(voice => {
      const opt = document.createElement('option');
      opt.value = voice.voiceURI;
      opt.textContent = `${voice.name} (${voice.lang})`;
      selectEl.appendChild(opt);
    });

    selectEl.value = voices.some(v => v.voiceURI === current) ? current : '';
  };

  buildOptions(enSelect, 'en', currentLang === 'es' ? 'Auto (recomendada)' : 'Auto (recommended)');
  buildOptions(esSelect, 'es', currentLang === 'es' ? 'Auto (recomendada)' : 'Auto (recommended)');
}

function setBriefingVoice(lang, voiceURI) {
  if (!briefingEngine.voiceOverrides) briefingEngine.voiceOverrides = { en: '', es: '' };
  briefingEngine.voiceOverrides[lang] = voiceURI || '';
  saveBriefingVoicePreferences();
  populateBriefingVoiceSelectors();

  const voice = pickSpeechVoice(lang);
  const status = document.getElementById('hubBriefingStatus');
  if (status && voice) {
    status.textContent = currentLang === 'es'
      ? `Voz ${lang.toUpperCase()}: ${voice.name}`
      : `${lang.toUpperCase()} voice: ${voice.name}`;
  }
}

function prepareTextForSpeech(text, lang) {
  if (!text) return '';
  let output = text.replace(/\s+/g, ' ').trim();

  const shared = [
    [/\b3i\s+BAIRD\s+LAB\b/gi, lang === 'es' ? 'three eye Baird Lab' : 'Three Eye Baird Lab'],
    [/\b3i\b/g, lang === 'es' ? 'three eye' : 'Three Eye'],
    [/\bLUMI\b/g, 'LOO-mee'],
    [/\bArcana\b/g, lang === 'es' ? 'Arcana' : 'Ar-KAH-nah'],
    [/\bEdTech\b/gi, lang === 'es' ? 'Ed Tec' : 'Ed Tech'],
    [/\bFoodTech\b/gi, lang === 'es' ? 'Food Tec' : 'Food Tech'],
    [/\bWeb3\b/gi, lang === 'es' ? 'Web tres' : 'Web three'],
    [/\bIoT\b/g, lang === 'es' ? 'I o T' : 'I O T'],
    [/\bQSR\b/g, lang === 'es' ? 'Q S R' : 'Q S R'],
    [/\bAI\b/g, lang === 'es' ? 'I A' : 'A I'],
    [/\bB2B\b/g, lang === 'es' ? 'B a B' : 'B to B'],
    [/\bB2C\b/g, lang === 'es' ? 'B a C' : 'B to C'],
    [/\bVC\b/g, lang === 'es' ? 'V C' : 'V C'],
    [/\bCTO\b/g, lang === 'es' ? 'C T O' : 'C T O'],
    [/\bCFO\b/g, lang === 'es' ? 'C F O' : 'C F O'],
    [/\bROI\b/g, lang === 'es' ? 'R O I' : 'R O I'],
    [/\bTAM\b/g, lang === 'es' ? 'T A M' : 'T A M'],
    [/\bEBITDA\b/gi, lang === 'es' ? 'E bit da' : 'EE-bit-dah'],
    [/\bCapEx\b/gi, lang === 'es' ? 'cap ex' : 'CAP-ex'],
    [/\bcapex\b/gi, lang === 'es' ? 'cap ex' : 'CAP-ex'],
    [/\bHACCP\b/g, 'HACCP'],
    [/\bPCI\b/g, 'P C I'],
    [/\bNIST\b/g, 'N I S T'],
    [/\bGPU\b/g, 'G P U'],
    [/\bRAG\b/g, lang === 'es' ? 'R A G' : 'RAG'],
    [/\bPolygon\b/g, lang === 'es' ? 'Polígon' : 'PAH-lee-gon'],
    [/\bUSD\b/g, 'U S D'],
    [/(\d)\s*k\b/gi, '$1 thousand']
  ];

  shared.forEach(([pattern, replacement]) => {
    output = output.replace(pattern, replacement);
  });

  if (lang === 'en') {
    output = output
      .replace(/\bmulti-agent\b/gi, 'multi agent')
      .replace(/\bdeep-dive\b/gi, 'deep dive')
      .replace(/\bquick-service\b/gi, 'quick service')
      .replace(/\bsupply-chain\b/gi, 'supply chain')
      .replace(/\bunit-economics\b/gi, 'unit economics')
      .replace(/\bboard-ready\b/gi, 'board ready');
  }

  return output.replace(/\s{2,}/g, ' ').trim();
}

function refreshSpeechVoiceCatalog() {
  populateBriefingVoiceSelectors();
}

function warmupSpeechVoices() {
  if (!isSpeechSupported()) return;
  loadBriefingVoicePreferences();
  if (speechSynthesis.getVoices().length) {
    refreshSpeechVoiceCatalog();
    return;
  }
  window.addEventListener('voiceschanged', refreshSpeechVoiceCatalog, { once: true });
  speechSynthesis.getVoices();
}

function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function extractReadableSlideText(slideEl) {
  if (!slideEl) return '';
  const clone = slideEl.cloneNode(true);
  clone.querySelectorAll('script, style, .zoom-hint-pill, [aria-hidden="true"]').forEach(n => n.remove());

  const lang = getSpeechLang();
  const dropClass = lang === 'en' ? 'lang-es' : 'lang-en';
  clone.querySelectorAll(`.${dropClass}`).forEach(el => el.remove());

  // Detached clones do not inherit html[data-lang] CSS, so also drop anything
  // still marked display:none from the last applyLanguage() pass.
  clone.querySelectorAll('[hidden]').forEach(el => el.remove());
  clone.querySelectorAll('[style]').forEach(el => {
    const display = (el.style && el.style.display) || '';
    if (display === 'none') el.remove();
  });

  const chunks = [];
  const title = clone.querySelector('.hero-title, .slide-header h2, .hub-hero-headline, .hub-card-title');
  if (title) chunks.push(title.textContent.trim());

  const lead = clone.querySelector('.hero-subtitle, .slide-header .slide-lead, .hub-hero-tagline, .hub-card-hook');
  if (lead) chunks.push(lead.textContent.trim());

  clone.querySelectorAll('.card-title, .step-title, .metric-val, .metric-label, .metric-desc, .card-desc, .step-desc, .punchline-badge, .proof-text, .quote-box p, .feature-bullet, .comparison-table th, .comparison-table td.aspect').forEach(el => {
    const t = el.textContent.replace(/\s+/g, ' ').trim();
    if (t && t.length > 2) chunks.push(t);
  });

  if (!chunks.length) {
    return clone.textContent.replace(/\s+/g, ' ').trim().slice(0, 1200);
  }

  const unique = [];
  const seen = new Set();
  chunks.forEach(c => {
    const key = c.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(c);
    }
  });
  return unique.join('. ').replace(/\.\s*\./g, '.').slice(0, 1400);
}

function getActiveSlideElement() {
  const container = activeDeck === 'hub'
    ? document.getElementById('deck-hub')
    : document.getElementById(`deck-${activeDeck}`);
  if (!container) return null;
  return container.querySelector('.slide.active') || container.querySelector('.slide');
}

function updateAudioTourBar() {
  const bar = document.getElementById('audioTourBar');
  const label = document.getElementById('audioTourLabel');
  const deckTourBtn = document.getElementById('deckAudioTourBtn');
  const showTourChrome = briefingEngine.deckTourActive || (briefingEngine.mode === 'slide' && activeDeck !== 'hub');

  if (bar) bar.hidden = !showTourChrome;
  if (label && activeDeck !== 'hub') {
    label.textContent = currentLang === 'es'
      ? `Slide ${currentSlide} / ${totalSlides()}`
      : `Slide ${currentSlide} / ${totalSlides()}`;
  }
  if (deckTourBtn) deckTourBtn.classList.toggle('is-active', briefingEngine.deckTourActive);
}

function syncPitchTimerWithNarration(action) {
  if (!briefingEngine.syncPitchTimer) return;

  if (action === 'start') {
    if (!pitchTimer.isRunning) {
      togglePitchTimerRun();
      briefingEngine.timerStartedByNarration = true;
    }
    briefingEngine.timerPausedForNarration = false;
    return;
  }

  if (action === 'pause') {
    if (pitchTimer.isRunning) {
      togglePitchTimerRun();
      briefingEngine.timerPausedForNarration = true;
    }
    return;
  }

  if (action === 'resume') {
    if (briefingEngine.timerPausedForNarration && !pitchTimer.isRunning) {
      togglePitchTimerRun();
      briefingEngine.timerPausedForNarration = false;
    }
  }
}

function updateBriefingUI(state, message) {
  const narrator = document.getElementById('hubBriefingNarrator');
  const playBtn = document.getElementById('hubBriefingPlayBtn');
  const pauseBtn = document.getElementById('hubBriefingPauseBtn');
  const stopBtn = document.getElementById('hubBriefingStopBtn');
  const progress = document.getElementById('hubBriefingProgress');
  const status = document.getElementById('hubBriefingStatus');
  const hudBtn = document.getElementById('voiceBriefingBtn');

  const speaking = state === 'speaking';
  const paused = state === 'paused';

  if (narrator) narrator.classList.toggle('is-speaking', speaking || paused);
  if (playBtn) {
    playBtn.hidden = speaking && !paused;
    const label = playBtn.querySelector('.lang-es');
    const labelEn = playBtn.querySelector('.lang-en');
    if (paused) {
      if (label) label.textContent = 'Reanudar';
      if (labelEn) labelEn.textContent = 'Resume';
    } else if (speaking) {
      if (label) label.textContent = briefingEngine.deckTourActive ? 'Tour…' : 'Escuchando…';
      if (labelEn) labelEn.textContent = briefingEngine.deckTourActive ? 'Tour…' : 'Playing…';
    } else {
      if (label) label.textContent = 'Escuchar';
      if (labelEn) labelEn.textContent = 'Listen';
    }
  }
  if (pauseBtn) pauseBtn.hidden = !speaking || paused;
  if (stopBtn) stopBtn.hidden = !speaking && !paused;
  if (progress) progress.hidden = !speaking && !paused;
  if (hudBtn) hudBtn.classList.toggle('is-speaking', speaking || paused);

  if (status && message !== undefined) {
    status.textContent = message;
  }

  updateAudioTourBar();
}

function clearBriefingProgressTimer() {
  if (briefingEngine.progressTimer) {
    clearInterval(briefingEngine.progressTimer);
    briefingEngine.progressTimer = null;
  }
  if (briefingEngine.pendingAdvanceTimer) {
    clearTimeout(briefingEngine.pendingAdvanceTimer);
    briefingEngine.pendingAdvanceTimer = null;
  }
  const fill = document.getElementById('hubBriefingProgressFill');
  if (fill) fill.style.width = '0%';
}

function startBriefingProgressEstimate(text) {
  clearBriefingProgressTimer();
  const fill = document.getElementById('hubBriefingProgressFill');
  if (!fill) return;
  briefingEngine.startedAt = Date.now();
  briefingEngine.estimatedMs = Math.max(8000, Math.min(120000, text.length * 58));
  briefingEngine.progressTimer = setInterval(() => {
    const elapsed = Date.now() - briefingEngine.startedAt;
    const pct = Math.min(98, (elapsed / briefingEngine.estimatedMs) * 100);
    fill.style.width = `${pct}%`;
  }, 120);
}

function finishBriefingPlayback(message) {
  clearBriefingProgressTimer();
  const fill = document.getElementById('hubBriefingProgressFill');
  if (fill) fill.style.width = '100%';

  const wasDeckTour = briefingEngine.deckTourActive;
  briefingEngine.mode = null;
  briefingEngine.deckTourActive = false;
  briefingEngine.paused = false;
  updateBriefingUI('idle', message);
  updateAudioTourBar();
  setTimeout(() => updateBriefingUI('idle', ''), 2600);

  if (wasDeckTour) {
    showToast(currentLang === 'es' ? 'Tour de audio completado.' : 'Audio deck tour complete.');
  }
}

function scheduleDeckTourAdvance() {
  if (!briefingEngine.deckTourActive || !briefingEngine.autoAdvance) {
    finishBriefingPlayback(currentLang === 'es' ? 'Lectura completada.' : 'Reading complete.');
    return;
  }

  if (currentSlide >= totalSlides()) {
    finishBriefingPlayback(currentLang === 'es' ? 'Tour de deck completado.' : 'Deck tour complete.');
    return;
  }

  briefingEngine.pendingAdvanceTimer = setTimeout(() => {
    goToSlide(currentSlide + 1, 'next', { fromBriefingTour: true });
    updateAudioTourBar();
    const slide = getActiveSlideElement();
    const text = extractReadableSlideText(slide);
    speakExecutiveText(text, 'slide', { partOfTour: true });
  }, 520);
}

function speakExecutiveText(text, mode, options = {}) {
  if (!isSpeechSupported()) {
    showToast(getSpeechLang() === 'es' ? 'Tu navegador no soporta lectura en voz alta.' : 'Your browser does not support text-to-speech.');
    return;
  }
  if (!text || !text.trim()) {
    if (briefingEngine.deckTourActive) {
      scheduleDeckTourAdvance();
      return;
    }
    showToast(getSpeechLang() === 'es' ? 'No hay texto para leer en esta vista.' : 'No readable text on this view.');
    return;
  }

  speechSynthesis.cancel();
  clearBriefingProgressTimer();

  const lang = getSpeechLang();
  const preparedText = prepareTextForSpeech(text.trim(), lang);

  const startUtterance = (voice) => {
    if (lang === 'en' && !voice) {
      showToast('No English voice found. Open Audio options and pick an English voice, or install one in Windows.');
      updateBriefingUI('idle', 'No English TTS voice');
      return;
    }
    if (lang === 'es' && !voice) {
      showToast('No se encontró voz en español. Elige una en Opciones de audio o instálala en Windows.');
      updateBriefingUI('idle', 'Sin voz TTS en español');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(preparedText);
    utterance.lang = voice.lang || (lang === 'es' ? 'es-ES' : 'en-US');
    utterance.rate = lang === 'en' ? 0.88 : 0.92;
    utterance.pitch = lang === 'en' ? 0.98 : 1;
    utterance.voice = voice;

    briefingEngine.mode = mode;
    briefingEngine.paused = false;
    if (options.partOfTour) briefingEngine.deckTourActive = true;

    utterance.onstart = () => {
      if (window.VentureHubBridge && typeof window.VentureHubBridge.pauseLiveSpeechForTts === 'function') {
        window.VentureHubBridge.pauseLiveSpeechForTts();
      }
      startBriefingProgressEstimate(text);
      syncPitchTimerWithNarration('start');
      let msg;
      if (mode === 'hub') {
        const laneLabel = briefingEngine.activeLane === 'all'
          ? (lang === 'es' ? 'Briefing completo' : 'Full briefing')
          : (lang === 'es' ? `Briefing · ${briefingEngine.activeLane}` : `Briefing · ${briefingEngine.activeLane}`);
        msg = lang === 'es' ? `${laneLabel} en reproducción…` : `${laneLabel} playing…`;
      } else if (briefingEngine.deckTourActive) {
        msg = lang === 'es'
          ? `Tour audio · slide ${currentSlide} de ${totalSlides()}…`
          : `Audio tour · slide ${currentSlide} of ${totalSlides()}…`;
      } else {
        msg = lang === 'es' ? `Leyendo slide ${currentSlide}…` : `Reading slide ${currentSlide}…`;
      }
      if (voice?.name) {
        msg += lang === 'es' ? ` · ${voice.name}` : ` · ${voice.name}`;
      }
      updateBriefingUI('speaking', msg);
    };

    utterance.onend = () => {
      if (window.VentureHubBridge && typeof window.VentureHubBridge.resumeLiveSpeechAfterTts === 'function') {
        window.VentureHubBridge.resumeLiveSpeechAfterTts();
      }
      if (briefingEngine.deckTourActive && briefingEngine.autoAdvance) {
        scheduleDeckTourAdvance();
        return;
      }
      finishBriefingPlayback(lang === 'es' ? 'Briefing completado.' : 'Briefing complete.');
    };

    utterance.onerror = () => {
      if (window.VentureHubBridge && typeof window.VentureHubBridge.resumeLiveSpeechAfterTts === 'function') {
        window.VentureHubBridge.resumeLiveSpeechAfterTts();
      }
      briefingEngine.deckTourActive = false;
      finishBriefingPlayback(lang === 'es' ? 'No se pudo reproducir el audio.' : 'Could not play audio.');
    };

    // Chrome sometimes ignores the first speak() right after cancel().
    setTimeout(() => speechSynthesis.speak(utterance), 40);
  };

  ensureSpeechVoicesReady().then(() => {
    const voice = pickSpeechVoice(lang);
    startUtterance(voice);
  });
}

function stopExecutiveBriefing() {
  if (!isSpeechSupported()) return;
  speechSynthesis.cancel();
  clearBriefingProgressTimer();
  briefingEngine.mode = null;
  briefingEngine.deckTourActive = false;
  briefingEngine.paused = false;
  briefingEngine.timerPausedForNarration = false;
  if (window.VentureHubBridge && typeof window.VentureHubBridge.resumeLiveSpeechAfterTts === 'function') {
    window.VentureHubBridge.resumeLiveSpeechAfterTts();
  }
  updateBriefingUI('idle', currentLang === 'es' ? 'Audio detenido.' : 'Audio stopped.');
  updateAudioTourBar();
  setTimeout(() => updateBriefingUI('idle', ''), 1800);
}

function pauseExecutiveBriefing() {
  if (!isSpeechSupported()) return;
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    briefingEngine.paused = true;
    syncPitchTimerWithNarration('pause');
    updateBriefingUI('paused', currentLang === 'es' ? 'Pausado.' : 'Paused.');
  }
}

function startDeckAudioTour() {
  if (activeDeck === 'hub') {
    showToast(currentLang === 'es' ? 'Abre un deck para iniciar el tour.' : 'Open a deck to start the tour.');
    return;
  }
  if (!isSpeechSupported()) {
    showToast(currentLang === 'es' ? 'Tu navegador no soporta lectura en voz alta.' : 'Your browser does not support text-to-speech.');
    return;
  }

  stopExecutiveBriefing();
  briefingEngine.deckTourActive = true;
  if (currentSlide !== 1) {
    goToSlide(1, 'next', { fromBriefingTour: true });
  }
  updateAudioTourBar();
  showToast(currentLang === 'es' ? '▶ Tour de audio iniciado' : '▶ Audio tour started');

  const slide = getActiveSlideElement();
  const text = extractReadableSlideText(slide);
  speakExecutiveText(text, 'slide', { partOfTour: true });
}

function toggleExecutiveBriefing() {
  if (!isSpeechSupported()) {
    showToast(currentLang === 'es' ? 'Tu navegador no soporta lectura en voz alta.' : 'Your browser does not support text-to-speech.');
    return;
  }

  if (speechSynthesis.speaking) {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
      briefingEngine.paused = false;
      syncPitchTimerWithNarration('resume');
      updateBriefingUI('speaking', currentLang === 'es' ? 'Reanudando…' : 'Resuming…');
    } else {
      pauseExecutiveBriefing();
    }
    return;
  }

  if (activeDeck === 'hub') {
    speakExecutiveText(getHubBriefingText(), 'hub');
    return;
  }

  briefingEngine.deckTourActive = false;
  const slide = getActiveSlideElement();
  const text = extractReadableSlideText(slide);
  speakExecutiveText(text, 'slide');
}

function filterHubInterestLane(laneId) {
  const lane = laneId || 'all';
  briefingEngine.activeLane = lane;

  document.querySelectorAll('.hub-lane-tab').forEach(tab => {
    const active = tab.getAttribute('data-lane') === lane;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  document.querySelectorAll('.hub-venture-card').forEach(card => {
    const cardLane = card.getAttribute('data-lane');
    const show = lane === 'all' || cardLane === lane;
    card.classList.toggle('is-hidden', !show);
  });

  const status = document.getElementById('hubBriefingStatus');
  if (status && activeDeck === 'hub') {
    const laneNames = {
      all: { es: 'Todas las líneas', en: 'All lanes' },
      growth: { es: 'Crecimiento & EdTech', en: 'Growth & EdTech' },
      operations: { es: 'Operaciones & QSR', en: 'Operations & QSR' },
      deeptech: { es: 'Deep Tech & Confianza', en: 'Deep Tech & Trust' }
    };
    const name = laneNames[lane]?.[currentLang] || lane;
    status.textContent = currentLang === 'es'
      ? `Briefing listo para: ${name}. Pulsa Escuchar.`
      : `Briefing ready for: ${name}. Press Listen.`;
  }
}

if (isSpeechSupported()) {
  speechSynthesis.getVoices();
  window.addEventListener('voiceschanged', refreshSpeechVoiceCatalog);
}

// ==========================================================================
// PRESENTATION-GROUNDED ASK ENGINE
// Answers client questions using curated Q&A + slide text. Optional OpenAI-
// compatible LLM API. The API key is NEVER committed and NEVER persisted to
// localStorage: it lives only in this browser session and is wiped on close.
// ==========================================================================
const PRESENTATION_LLM_PREFS_KEY = 'vhos_presentation_llm_prefs';
const PRESENTATION_LLM_SESSION_KEY = 'vhos_presentation_llm_session';
const PRESENTATION_LLM_DEFAULTS = {
  // Local Vite proxy (dev). On GitHub Pages the user must paste the full URL.
  endpoint: '/llm-proxy/api/v1/chat/completions',
  model: 'llama3'
};
const presentationLlm = {
  endpoint: PRESENTATION_LLM_DEFAULTS.endpoint,
  apiKey: '',
  model: PRESENTATION_LLM_DEFAULTS.model
};

function wipePresentationLlmSecrets() {
  presentationLlm.apiKey = '';
  try { sessionStorage.removeItem(PRESENTATION_LLM_SESSION_KEY); } catch (_) { /* ignore */ }
  try {
    // Purge any legacy key that may have been saved before this policy.
    const raw = localStorage.getItem(PRESENTATION_LLM_PREFS_KEY)
      || localStorage.getItem('vhos_presentation_llm');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        delete parsed.apiKey;
        localStorage.setItem(PRESENTATION_LLM_PREFS_KEY, JSON.stringify({
          endpoint: parsed.endpoint || PRESENTATION_LLM_DEFAULTS.endpoint,
          model: parsed.model || PRESENTATION_LLM_DEFAULTS.model
        }));
      }
    }
    localStorage.removeItem('vhos_presentation_llm');
  } catch (_) { /* ignore */ }
  const keyEl = document.getElementById('askLlmApiKey');
  if (keyEl) keyEl.value = '';
}

function loadPresentationLlmConfig() {
  try {
    const prefsRaw = localStorage.getItem(PRESENTATION_LLM_PREFS_KEY)
      || localStorage.getItem('vhos_presentation_llm');
    if (prefsRaw) {
      const parsed = JSON.parse(prefsRaw);
      if (parsed && typeof parsed === 'object') {
        let endpoint = String(parsed.endpoint || PRESENTATION_LLM_DEFAULTS.endpoint).trim()
          || PRESENTATION_LLM_DEFAULTS.endpoint;
        if (/spark-e020\.tail02df6b\.ts\.net/i.test(endpoint) && /localhost|127\.0\.0\.1/.test(location.host)) {
          const path = endpoint.replace(/^https?:\/\/[^/]+/i, '') || '/api/v1/chat/completions';
          endpoint = `/llm-proxy${path.startsWith('/') ? path : `/${path}`}`;
        }
        presentationLlm.endpoint = endpoint;
        presentationLlm.model = String(parsed.model || PRESENTATION_LLM_DEFAULTS.model).trim()
          || PRESENTATION_LLM_DEFAULTS.model;
      }
    } else {
      presentationLlm.endpoint = PRESENTATION_LLM_DEFAULTS.endpoint;
      presentationLlm.model = PRESENTATION_LLM_DEFAULTS.model;
    }
  } catch (_) {
    presentationLlm.endpoint = PRESENTATION_LLM_DEFAULTS.endpoint;
    presentationLlm.model = PRESENTATION_LLM_DEFAULTS.model;
  }

  // API key: session only.
  try {
    const sessionRaw = sessionStorage.getItem(PRESENTATION_LLM_SESSION_KEY);
    if (sessionRaw) {
      const session = JSON.parse(sessionRaw);
      presentationLlm.apiKey = String(session?.apiKey || '').trim();
    } else {
      presentationLlm.apiKey = '';
    }
  } catch (_) {
    presentationLlm.apiKey = '';
  }
}

function persistPresentationLlmPrefs() {
  try {
    localStorage.setItem(PRESENTATION_LLM_PREFS_KEY, JSON.stringify({
      endpoint: presentationLlm.endpoint,
      model: presentationLlm.model
    }));
    localStorage.removeItem('vhos_presentation_llm');
  } catch (_) { /* ignore */ }
}

function persistPresentationLlmSessionKey() {
  try {
    if (presentationLlm.apiKey) {
      sessionStorage.setItem(PRESENTATION_LLM_SESSION_KEY, JSON.stringify({
        apiKey: presentationLlm.apiKey
      }));
    } else {
      sessionStorage.removeItem(PRESENTATION_LLM_SESSION_KEY);
    }
  } catch (_) { /* ignore */ }
}

function savePresentationLlmConfig() {
  const endpointEl = document.getElementById('askLlmEndpoint');
  const keyEl = document.getElementById('askLlmApiKey');
  const modelEl = document.getElementById('askLlmModel');
  presentationLlm.endpoint = (endpointEl?.value || '').trim() || PRESENTATION_LLM_DEFAULTS.endpoint;
  presentationLlm.apiKey = (keyEl?.value || '').trim();
  presentationLlm.model = (modelEl?.value || PRESENTATION_LLM_DEFAULTS.model).trim()
    || PRESENTATION_LLM_DEFAULTS.model;
  persistPresentationLlmPrefs();
  persistPresentationLlmSessionKey();
  showCommentsToast(getActiveLang() === 'es'
    ? 'API guardada solo para esta sesión'
    : 'API saved for this session only');
}

function loadPresentationLlmConfigIntoForm() {
  loadPresentationLlmConfig();
  const endpointEl = document.getElementById('askLlmEndpoint');
  const keyEl = document.getElementById('askLlmApiKey');
  const modelEl = document.getElementById('askLlmModel');
  if (endpointEl) {
    endpointEl.value = presentationLlm.endpoint || PRESENTATION_LLM_DEFAULTS.endpoint;
    endpointEl.placeholder = PRESENTATION_LLM_DEFAULTS.endpoint;
  }
  if (keyEl) {
    keyEl.value = presentationLlm.apiKey || '';
    keyEl.placeholder = 'sk-... (solo esta sesión)';
  }
  if (modelEl) {
    modelEl.value = presentationLlm.model || PRESENTATION_LLM_DEFAULTS.model;
    modelEl.placeholder = PRESENTATION_LLM_DEFAULTS.model;
  }
}

function isPresentationLlmConfigured() {
  loadPresentationLlmConfig();
  return !!(presentationLlm.endpoint && presentationLlm.apiKey);
}

function openAskLlmConfigPanel(options = {}) {
  const panel = document.getElementById('askLlmConfigPanel');
  if (!panel) return;
  panel.open = true;
  loadPresentationLlmConfigIntoForm();
  if (options.focusKey) {
    setTimeout(() => document.getElementById('askLlmApiKey')?.focus(), 40);
  }
}

function initPresentationLlmSession() {
  wipePresentationLlmSecrets();
  loadPresentationLlmConfig();
  // Endpoint/model prefs may remain; key must be re-entered every open.
  presentationLlm.apiKey = '';
  try { sessionStorage.removeItem(PRESENTATION_LLM_SESSION_KEY); } catch (_) { /* ignore */ }

  const clear = () => wipePresentationLlmSecrets();
  window.addEventListener('pagehide', clear);
  window.addEventListener('beforeunload', clear);
}

function tokenizeAskQuery(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9$\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2);
}

function scoreAskOverlap(queryTokens, haystack) {
  if (!queryTokens.length || !haystack) return 0;
  const hay = haystack.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let hits = 0;
  queryTokens.forEach(t => { if (hay.includes(t)) hits += 1; });
  return hits / queryTokens.length;
}

function buildPresentationCorpus(deck, preferSlide) {
  const lang = getActiveLang();
  const chunks = [];
  const total = DECK_SLIDE_COUNTS[deck] || 0;
  const container = document.getElementById(`deck-${deck}`);

  for (let slide = 1; slide <= total; slide += 1) {
    const slideEl = container ? container.querySelector(`.slide[data-slide="${slide}"]`) : null;
    const body = slideEl ? extractReadableSlideText(slideEl) : '';
    const notes = getSlideNotes(deck, slide);
    const noteText = notes.map(n => {
      const q = lang === 'en' ? (n.question_en || n.question || '') : (n.question_es || n.question || '');
      const a = lang === 'en' ? (n.answer_en || n.answer || '') : (n.answer_es || n.answer || '');
      return `Q: ${q}\nA: ${a}`;
    }).join('\n');

    chunks.push({
      deck,
      slide,
      priority: slide === preferSlide ? 2 : (Math.abs(slide - preferSlide) <= 1 ? 1.25 : 1),
      title: getSlideHeadingText(deck, slide),
      body,
      notes: noteText,
      text: `${body}\n${noteText}`
    });
  }
  return chunks;
}

function findLocalGroundedAnswers(question, deck, slide) {
  const tokens = tokenizeAskQuery(question);
  const corpus = buildPresentationCorpus(deck, slide);
  const scored = corpus.map(chunk => ({
    ...chunk,
    score: scoreAskOverlap(tokens, chunk.text) * chunk.priority
  })).filter(c => c.score >= 0.18)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  // Also score curated Q&A items directly for tight matches.
  const qaHits = [];
  const deckPresets = CURATED_SLIDE_QA[deck] || {};
  Object.keys(deckPresets).forEach(slideKey => {
    (deckPresets[slideKey] || []).forEach(item => {
      const q = `${item.question_es || ''} ${item.question_en || ''} ${item.answer_es || ''} ${item.answer_en || ''}`;
      const score = scoreAskOverlap(tokens, q) * (String(slideKey) === String(slide) ? 1.5 : 1);
      if (score >= 0.28) {
        qaHits.push({
          slide: Number(slideKey),
          score,
          question_es: item.question_es,
          question_en: item.question_en,
          answer_es: item.answer_es,
          answer_en: item.answer_en
        });
      }
    });
  });
  qaHits.sort((a, b) => b.score - a.score);

  return { chunks: scored, qaHits: qaHits.slice(0, 3) };
}

function renderAskEngineResult(payload) {
  const box = document.getElementById('askPresentationResult');
  if (!box) return;
  const lang = getActiveLang();
  const citations = (payload.citations || [])
    .map(c => `<span class="ask-cite">S${c}</span>`)
    .join(' ');

  box.hidden = false;
  box.innerHTML = `
    <div class="ask-engine-status ask-engine-status--${payload.status}">${payload.statusLabel}</div>
    <div class="ask-engine-answer">${payload.answer}</div>
    ${citations ? `<div class="ask-engine-cites"><span class="lang-es">Fuentes</span><span class="lang-en">Sources</span>: ${citations}</div>` : ''}
    ${payload.mode ? `<div class="ask-engine-mode">${payload.mode}</div>` : ''}
  `;
  applyLanguageWithin(box, lang);
}

async function callPresentationLlm(question, contextBlocks) {
  loadPresentationLlmConfig();
  const lang = getActiveLang();
  const system = lang === 'es'
    ? 'Eres el motor de Q&A de la presentación 3i BAIRD LAB. Responde SOLO con base en el contexto de diapositivas y notas. Si no hay evidencia suficiente, di exactamente: INSUFICIENTE. Sé ejecutivo, claro y breve (máx. 120 palabras). Cita slides como S3, S8.'
    : 'You are the 3i BAIRD LAB presentation Q&A engine. Answer ONLY from the provided slide and notes context. If evidence is insufficient, say exactly: INSUFFICIENT. Be executive, clear, and brief (max 120 words). Cite slides as S3, S8.';

  const context = contextBlocks.map(c =>
    `[Slide ${c.slide}] ${c.title || ''}\n${(c.text || '').slice(0, 900)}`
  ).join('\n\n---\n\n');

  const payload = {
    model: presentationLlm.model,
    temperature: 0.2,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: `CONTEXT:\n${context}\n\nQUESTION:\n${question}` }
    ]
  };

  // Spark / OpenWebUI often expose either /api/v1 or /v1. Try the configured
  // endpoint first, then a small set of OpenAI-compatible fallbacks.
  const configured = presentationLlm.endpoint.replace(/\/$/, '');
  const candidates = Array.from(new Set([
    configured,
    '/llm-proxy/api/v1/chat/completions',
    '/llm-proxy/v1/chat/completions',
    '/llm-proxy/openai/v1/chat/completions'
  ]));

  let lastError = null;
  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${presentationLlm.apiKey}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        lastError = new Error(`LLM HTTP ${res.status} @ ${url}: ${errText.slice(0, 160)}`);
        continue;
      }
      const data = await res.json();
      const answer = data?.choices?.[0]?.message?.content
        || data?.output_text
        || data?.answer
        || '';
      const cleaned = String(answer).trim();
      if (cleaned) {
        // Persist only the working endpoint path (never the API key).
        if (url !== presentationLlm.endpoint) {
          presentationLlm.endpoint = url;
          persistPresentationLlmPrefs();
        }
        return cleaned;
      }
      lastError = new Error(`Empty LLM response @ ${url}`);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error('LLM request failed');
}

async function askPresentationEngine() {
  const input = document.getElementById('askPresentationInput');
  const btn = document.getElementById('askPresentationBtn');
  const question = (input?.value || '').trim();
  const lang = getActiveLang();

  if (!question) {
    showCommentsToast(lang === 'es' ? 'Escribe una pregunta' : 'Type a question');
    return;
  }
  if (activeDeck === 'hub') {
    showCommentsToast(lang === 'es' ? 'Abre un deck para preguntar' : 'Open a deck to ask');
    return;
  }

  if (!isPresentationLlmConfigured()) {
    openAskLlmConfigPanel({ focusKey: true });
  }

  if (btn) btn.disabled = true;
  renderAskEngineResult({
    status: 'pending',
    statusLabel: lang === 'es' ? 'Buscando en la presentación…' : 'Searching the presentation…',
    answer: lang === 'es' ? 'Analizando slides y notas curadas…' : 'Analyzing slides and curated notes…',
    citations: [currentSlide]
  });

  try {
    const local = findLocalGroundedAnswers(question, activeDeck, currentSlide);
    const contextBlocks = local.chunks.length
      ? local.chunks
      : buildPresentationCorpus(activeDeck, currentSlide).filter(c => Math.abs(c.slide - currentSlide) <= 1);

    if (isPresentationLlmConfigured()) {
      try {
        const llmAnswer = await callPresentationLlm(question, contextBlocks.slice(0, 5));
        const insufficient = /^(INSUFICIENTE|INSUFFICIENT)\b/i.test(llmAnswer);
        renderAskEngineResult({
          status: insufficient ? 'insufficient' : 'grounded',
          statusLabel: insufficient
            ? (lang === 'es' ? 'Evidencia insuficiente' : 'Insufficient evidence')
            : (lang === 'es' ? 'Respuesta anclada (LLM)' : 'Grounded answer (LLM)'),
          answer: llmAnswer || (lang === 'es' ? 'Sin respuesta del modelo.' : 'No model response.'),
          citations: contextBlocks.slice(0, 4).map(c => c.slide),
          mode: `${presentationLlm.model}`
        });
        return;
      } catch (llmErr) {
        // Fall through to local curated notes instead of showing a dead "S2" error.
        console.warn('LLM ask failed, falling back to local corpus:', llmErr);
      }
    }

    if (local.qaHits.length) {
      const hit = local.qaHits[0];
      const answer = lang === 'en'
        ? (hit.answer_en || hit.answer_es)
        : (hit.answer_es || hit.answer_en);
      renderAskEngineResult({
        status: 'grounded',
        statusLabel: lang === 'es' ? 'Respuesta anclada (notas curadas)' : 'Grounded answer (curated notes)',
        answer,
        citations: local.qaHits.map(h => h.slide),
        mode: lang === 'es'
          ? 'Matcher local (LLM no disponible o falló)'
          : 'Local matcher (LLM unavailable or failed)'
      });
      return;
    }

    if (local.chunks.length) {
      const top = local.chunks[0];
      renderAskEngineResult({
        status: 'grounded',
        statusLabel: lang === 'es' ? 'Contexto de slide encontrado' : 'Slide context found',
        answer: (top.body || top.text || '').slice(0, 420) || (lang === 'es' ? 'Hay contexto, pero sin respuesta curada. Configura tu API LLM.' : 'Context found, but no curated answer. Configure your LLM API.'),
        citations: local.chunks.map(c => c.slide),
        mode: lang === 'es' ? 'Corpus local' : 'Local corpus'
      });
      return;
    }

    renderAskEngineResult({
      status: 'insufficient',
      statusLabel: lang === 'es' ? 'Evidencia insuficiente' : 'Insufficient evidence',
      answer: lang === 'es'
        ? 'No encontré base suficiente en esta presentación para responder con rigor. Reformula o revisa otra slide.'
        : 'Not enough evidence in this presentation to answer rigorously. Reframe or check another slide.',
      citations: [currentSlide]
    });
  } catch (err) {
    renderAskEngineResult({
      status: 'error',
      statusLabel: lang === 'es' ? 'Error del motor' : 'Engine error',
      answer: String(err?.message || err),
      citations: [currentSlide]
    });
  } finally {
    if (btn) btn.disabled = false;
  }
}

function toastSpeech(messageEs, messageEn) {
  const msg = (typeof getActiveLang === 'function' ? getActiveLang() : currentLang) === 'en'
    ? messageEn
    : messageEs;
  if (typeof showToast === 'function') showToast(msg);
}

window.__toggleLiveSpeechHud = function toggleLiveSpeechHud() {
  const bridge = window.VentureHubBridge;
  if (!bridge || typeof bridge.toggleLiveSpeech !== 'function') {
    toastSpeech(
      'Motor de escucha aún cargando. Espera un segundo e intenta de nuevo.',
      'Speech engine still loading. Wait a second and try again.'
    );
    return;
  }
  Promise.resolve(bridge.toggleLiveSpeech()).catch((err) => {
    const raw = String(err?.message || err || '');
    if (/not supported|SpeechRecognition/i.test(raw)) {
      toastSpeech(
        'Escucha solo funciona en Chrome o Edge con micrófono.',
        'Live listen works in Chrome or Edge with a microphone.'
      );
      return;
    }
    if (/NotAllowed|permission|denied/i.test(raw)) {
      toastSpeech(
        'Permiso de micrófono denegado. Actívalo en el navegador.',
        'Microphone permission denied. Enable it in the browser.'
      );
      return;
    }
    toastSpeech('No se pudo iniciar el motor de escucha.', 'Could not start the speech engine.');
  });
};

window.__toggleTranscriptHud = function toggleTranscriptHud() {
  const bridge = window.VentureHubBridge;
  if (!bridge || typeof bridge.toggleTranscriptDrawer !== 'function') {
    toastSpeech(
      'Panel de transcripción aún cargando.',
      'Transcript panel still loading.'
    );
    return;
  }
  bridge.toggleTranscriptDrawer();
};

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
  setNavigatorActFilter,
  openLightbox,
  closeLightbox,
  closeLightboxDirect,
  replayVentureVideo,
  skipVentureVideo,
  closeVentureVideo,
  openCommentsDrawer,
  toggleCommentsDrawer,
  closeCommentsDrawer,
  switchCommentsTab,
  filterComments,
  handleInjectSingle,
  handleBulkInject,
  injectSlidePresets,
  copyCurrentSlideNotes,
  copyCommentText,
  translateCommentById,
  togglePinComment,
  deleteComment,
  exportAllDeckNotes,
  setAudience,
  cycleAudience,
  togglePitchTimerPanel,
  setPitchTimerPreset,
  togglePitchTimerRun,
  resetPitchTimer,
  toggleLaserPointer,
  showToast,
  showCommentsToast,
  toggleExecutiveBriefing,
  pauseExecutiveBriefing,
  stopExecutiveBriefing,
  filterHubInterestLane,
  setBriefingOption,
  startDeckAudioTour,
  setBriefingVoice,
  askPresentationEngine,
  savePresentationLlmConfig,
  toggleBriefingDetails
});

window.addEventListener('DOMContentLoaded', initPlatform);
