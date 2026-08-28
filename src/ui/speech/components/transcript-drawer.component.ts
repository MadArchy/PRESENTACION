import { SpeechSessionEntity } from '../../../modules/speech-intelligence/domain/speech-session.entity';

function escapeHtml(value: string): string {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderTranscriptDrawer(
  session: SpeechSessionEntity | null,
  activeFilterSlide: number | null = null,
  searchQuery: string = ''
): string {
  if (!session) {
    return `
      <div id="transcriptDrawer" class="transcript-drawer">
        <div class="transcript-drawer-header">
          <h3>🎙️ Minutas &amp; Transcripción en Vivo</h3>
          <button type="button" class="btn-close-drawer" onclick="window.VentureHubBridge.closeTranscriptDrawer()">✕</button>
        </div>
        <div class="transcript-drawer-empty">
          <p>No hay ninguna sesión de escucha activa. Activa el micrófono en la barra superior o presiona <strong>Shift+L</strong>.</p>
        </div>
      </div>
    `;
  }

  // Only finalized phrases belong in the minutes — interim text stays in the live subtitles bar.
  let utterances = session.getUtterances().filter(u =>
    u.getIsFinal() && u.getOriginalText().trim().length > 0
  );

  if (activeFilterSlide !== null) {
    utterances = utterances.filter(u => u.getSlideIndex() === activeFilterSlide);
  }

  if (searchQuery.trim().length > 0) {
    const q = searchQuery.toLowerCase();
    utterances = utterances.filter(u =>
      u.getSpanishText().toLowerCase().includes(q) ||
      u.getEnglishText().toLowerCase().includes(q) ||
      u.getOriginalText().toLowerCase().includes(q)
    );
  }

  const wordCounts = session.getTotalWordCount();
  const startedAt = session.getStartedAt();
  const slideMap = new Map<number, typeof utterances>();
  utterances.forEach(u => {
    // Slide numbers are 1-based (same as notes / deck UI)
    const slide = Math.max(1, u.getSlideIndex() || 1);
    if (!slideMap.has(slide)) slideMap.set(slide, []);
    slideMap.get(slide)!.push(u);
  });

  const sortedSlides = Array.from(slideMap.keys()).sort((a, b) => a - b);

  return `
    <div id="transcriptDrawer" class="transcript-drawer" aria-modal="true" role="dialog">
      
      <div class="transcript-drawer-header">
        <div class="transcript-header-info">
          <div class="transcript-title-wrap">
            <span class="transcript-icon">🎙️</span>
            <div>
              <h3>Transcripción &amp; Minutas Bilingües</h3>
              <div class="transcript-meta">
                <span>Deck: <strong>${escapeHtml(session.getDeckId())}</strong></span> · 
                <span>Palabras ES: <strong>${wordCounts.spanish}</strong></span> · 
                <span>Palabras EN: <strong>${wordCounts.english}</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div class="transcript-header-actions">
          <button type="button" class="btn-drawer-action" onclick="window.VentureHubBridge.copyTranscriptToClipboard()" title="Copiar minutas al portapapeles">
            📋 Copiar
          </button>
          <button type="button" class="btn-drawer-action" onclick="window.VentureHubBridge.downloadTranscriptMarkdown()" title="Descargar como archivo Markdown (.md)">
            📥 Markdown
          </button>
          <button type="button" class="btn-drawer-action" onclick="window.VentureHubBridge.downloadTranscriptTxt()" title="Descargar como texto (.txt)">
            📄 TXT
          </button>
          <button type="button" class="btn-drawer-action btn-danger-action" onclick="window.VentureHubBridge.clearTranscriptSession()" title="Borrar historial de transcripción">
            🗑️ Limpiar
          </button>
          <button type="button" class="btn-close-drawer" onclick="window.VentureHubBridge.closeTranscriptDrawer()" title="Cerrar panel">
            ✕
          </button>
        </div>
      </div>

      <div class="transcript-filters-bar">
        <div class="transcript-search-box">
          <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="transcriptSearchInput" placeholder="Buscar en la conversación bilingüe..." value="${escapeHtml(searchQuery)}" oninput="window.VentureHubBridge.filterTranscript(this.value)">
        </div>
      </div>

      <div class="transcript-stream-scroll" id="transcriptStreamScroll">
        ${sortedSlides.length === 0 ? `
          <div class="transcript-empty-state">
            <div class="empty-icon">💬</div>
            <h4>Sin diálogos registrados aún</h4>
            <p>Habla al micrófono durante la presentación. Solo las frases finalizadas aparecen aquí; el texto en vivo se ve en la barra de subtítulos.</p>
          </div>
        ` : sortedSlides.map(slideNum => {
          const items = slideMap.get(slideNum) || [];
          return `
            <div class="transcript-slide-group">
              <div class="slide-group-header">
                <span class="slide-badge">📽️ Diapositiva ${slideNum}</span>
                <span class="slide-count">${items.length} intervenciones</span>
              </div>

              <div class="slide-utterances-list">
                ${items.map(u => {
                  const es = u.getSpanishText();
                  const en = u.getEnglishText();
                  const same = es.trim().toLowerCase() === en.trim().toLowerCase();
                  return `
                  <div class="transcript-card ${u.getSourceLanguage() === 'es' ? 'origin-es' : 'origin-en'}">
                    <div class="card-meta-line">
                      <span class="card-timestamp">⏱️ ${u.getFormattedTime(startedAt)}</span>
                      <span class="card-origin-pill">${u.getSourceLanguage() === 'es' ? 'Voz: Español 🇪🇸' : 'Voice: English 🇬🇧'}</span>
                      <button class="btn-copy-utterance" onclick="window.VentureHubBridge.copySingleUtterance('${escapeHtml(u.getId())}')" title="Copiar este fragmento">📋</button>
                    </div>

                    <div class="card-dual-grid">
                      <div class="dual-box dual-es">
                        <div class="dual-box-label">🇪🇸 Español</div>
                        <div class="dual-box-text">${escapeHtml(es)}</div>
                      </div>
                      <div class="dual-box dual-en">
                        <div class="dual-box-label">🇬🇧 English</div>
                        <div class="dual-box-text">${escapeHtml(en)}${same ? ' <span class="subtitle-pending">· pending network translation</span>' : ''}</div>
                      </div>
                    </div>
                  </div>
                `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;
}
